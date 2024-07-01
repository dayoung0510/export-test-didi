import { useEffect, useState } from 'react';

import { QRCodeCanvas } from 'qrcode.react';
import cryptoUtils from 'src/utils/cryptoUtils';
import login from 'src/utils/login';
import { Qr } from 'src/zigap/qr';
import SocketService from 'src/utils/socketService';
import { LOGIN_RES_KEY } from 'src/hooks/useZigap';
import dayjs from 'dayjs';

import ZigapLogo from '../../assets/zigap-icon.svg';

import type {
  AccountType,
  LoginQRProps,
  LoginResultType,
  PayloadType,
  NoneLoginExpire,
  FixedOrExtensionLoginExpire,
} from './LoginQR.types';
import { Xphere } from 'src/xphere';

const LoginQR = ({
  availableNetworks,
  dapp,
  url,
  sigMessage,
  onReceive,
  validSeconds,
  isShowLogo = false,
  logoSize = 30,
  expire,
  ...props
}: LoginQRProps) => {
  const [isValid, setIsValid] = useState(true);
  const nonce = cryptoUtils.generateNonce(16);
  const { qrCode, roomId } = Qr.generateQrCode('login', dapp, url, availableNetworks);

  useEffect(() => {
    const timer = setTimeout(() => {
      SocketService.leaveRoom(roomId);
      setIsValid(false);
    }, validSeconds * 1000);

    return () => clearTimeout(timer);
  }, [roomId, validSeconds]);

  useEffect(() => {
    const getAccount = async () => {
      try {
        console.log('roomId', roomId);
        const expireType = expire.type;
        const expireSeconds = expire.seconds;

        // TODO!! 모달 열기만 하면 나오는 임시 데이터임
        const testData: LoginResultType = {
          address: 'acacac',
          network: 'bbb',
          nickName: 'ccc',
          token: 'ddd',
          issuedDateTime: dayjs().format('YYYY-MM-DD hh:mm:ss'),
          expire:
            expireType === 'NONE'
              ? ({ type: expireType } as NoneLoginExpire)
              : ({ type: expireType, seconds: expireSeconds } as FixedOrExtensionLoginExpire),
        };
        localStorage.setItem(LOGIN_RES_KEY, JSON.stringify(testData));
        // TODO!! 위에꺼 지우기

        const loginAccount = await login.qrLogin(roomId, sigMessage, nonce);
        const message = `${sigMessage}\n\nNonce: ${nonce}`;

        const payload: PayloadType = {
          publicKey: loginAccount.publicKey,
          message: message,
        };

        const result: LoginResultType = {
          address: loginAccount.address,
          network: loginAccount.network,
          nickName: loginAccount.nickName,
          token: Xphere.Validation.createToken(payload, loginAccount.signature),
          issuedDateTime: dayjs().format('YYYY-MM-DD hh:mm:ss'),
          expire:
            expireType === 'NONE'
              ? ({ type: expireType } as NoneLoginExpire)
              : ({ type: expireType, seconds: expireSeconds } as FixedOrExtensionLoginExpire),
        };

        localStorage.setItem(LOGIN_RES_KEY, JSON.stringify(result));
        onReceive({ isSuccess: true });
      } catch (error) {
        onReceive({ isSuccess: false });
      }
    };
    getAccount();
  }, [sigMessage]);

  return isValid ? (
    <QRCodeCanvas
      value={qrCode}
      {...(isShowLogo && { imageSettings: { src: ZigapLogo, width: logoSize, height: logoSize, excavate: false } })}
      {...props}
    />
  ) : (
    <div>QR loading error</div>
  );
};

export default LoginQR;
