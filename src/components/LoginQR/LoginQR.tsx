import { useEffect, useState } from 'react';

import { QRCodeCanvas } from 'qrcode.react';
import cryptoUtils from 'src/utils/cryptoUtils';
import login from 'src/utils/login';
import { Qr } from 'src/zigap/qr';
import SocketService from 'src/utils/socketService';
import { LOGIN_RES_KEY } from 'src/hooks/useZigap';

import ZigapLogo from '../../assets/zigap-icon.svg';

import type { AccountType, LoginQRProps, LoginResultType, PayloadType, OnReceiveType } from './LoginQR.types';
import { Xphere } from 'src/xphere';

const LoginQR = ({
  availableNetworks,
  dapp,
  url,
  sigMessage,
  onReceive,
  validTime,
  isShowLogo = false,
  logoSize = 30,
  ...props
}: LoginQRProps) => {
  const [isValid, setIsValid] = useState(true);
  const nonce = cryptoUtils.generateNonce(16);
  const { qrCode, roomId } = Qr.generateQrCode('login', dapp, url, availableNetworks);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        SocketService.leaveRoom(roomId);
        setIsValid(false);
      },
      validTime * 60 * 1000,
    );

    return () => clearTimeout(timer);
  }, [roomId, validTime]);

  useEffect(() => {
    const getAccount = async () => {
      try {
        console.log('roomId', roomId);

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
          issuedTime: new Date(),
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
