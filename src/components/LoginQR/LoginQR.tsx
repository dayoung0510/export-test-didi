import { useEffect, useState } from 'react';

import { QRCodeCanvas } from 'qrcode.react';
import cryptoUtils from 'src/util/cryptoUtils';
import login from 'src/util/login';
import qr from 'src/util/qrService';
import SocketService from 'src/util/socketService';

import ZigapLogo from '../../assets/zigap-icon.svg';

import type { AccountType, LoginQRProps, LoginResultType, PayloadType } from './LoginQR.types';

const LoginQR = ({
  availableNetworks,
  dapp,
  url,
  sigMessage,
  validTime,
  onReceive,
  isShowLogo = false,
  logoSize = 30,
  ...props
}: LoginQRProps) => {
  const [isValid, setIsValid] = useState(true);
  const nonce = cryptoUtils.generateNonce(16);
  const { qrCode, roomId } = qr.generateQrCode('login', dapp, url, availableNetworks);

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

        const account: AccountType = {
          address: loginAccount.address,
          network: loginAccount.network,
          nickName: loginAccount.nickName,
        };

        const result: LoginResultType = {
          isSuccess: true,
          account: account,
          payload: payload,
          signature: loginAccount.signature,
        };
        onReceive(result);
      } catch (error) {
        const result: LoginResultType = {
          isSuccess: false,
        };
        onReceive(result);
      }
    };
    getAccount();
  }, [onReceive, sigMessage]);

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
