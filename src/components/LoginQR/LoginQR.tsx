import { useEffect, useState } from 'react';

import styled from 'styled-components';
import dayjs from 'dayjs';
import { QRCodeCanvas } from 'qrcode.react';
import { LOGIN_RES_KEY } from 'src/hooks/useZigap';
import { TIME_FORMAT } from 'src/hooks/useZigap';
import cryptoUtils from 'src/utils/cryptoUtils';
import login from 'src/utils/login';
import SocketService from 'src/utils/socketService';
import { Xphere } from 'src/xphere';
import { Qr } from 'src/zigap/qr';

import ZigapLogo from '../../assets/zigap-icon.svg';

import type {
  FixedOrExtensionLoginExpire,
  LoginQRProps,
  LoginResultType,
  NoneLoginExpire,
  PayloadType,
  ProcessingMarkType,
} from './LoginQR.types';

type MarkType = ProcessingMarkType extends { type: infer U } ? U : never;

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
  icon,
  size,
  processingMark = { type: 'DEFAULT' },
  ...props
}: LoginQRProps) => {
  const [isValid, setIsValid] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const nonce = cryptoUtils.generateNonce(16);
  const { qrCode, roomId } = Qr.generateQrCode('login', dapp, url, availableNetworks, icon);

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

        const requestReceived = await login.receiveRequest(roomId);
        setIsProcessing(true);
        onReceive && onReceive({ status: 'REQUEST' });

        if (requestReceived.isSuccess) {
          const loginAccount = await login.qrLogin(roomId, sigMessage, nonce);

          onReceive && onReceive({ status: 'ACCOUNT' });

          const message = `${sigMessage}\n\nNonce: ${nonce}`;

          const expireType = expire.type;
          const expireSeconds = expire.seconds;

          const payload: PayloadType = {
            publicKey: loginAccount.publicKey,
            message: message,
          };

          const result: LoginResultType = {
            address: loginAccount.address,
            network: loginAccount.network,
            nickName: loginAccount.nickName,
            token: Xphere.Validation.createToken(payload, loginAccount.signature),
            issuedDateTime: dayjs().format(TIME_FORMAT),
            expire:
              expireType === 'NONE'
                ? ({ type: expireType } as NoneLoginExpire)
                : ({ type: expireType, seconds: expireSeconds } as FixedOrExtensionLoginExpire),
          };

          // status && status('get result');
          onReceive && onReceive({ status: 'SUCCESS' });
          setIsProcessing(false);
          localStorage.setItem(LOGIN_RES_KEY, JSON.stringify(result));
        }
      } catch (error) {
        onReceive && onReceive({ status: 'ERROR' });
        setIsProcessing(false);
      }
    };
    getAccount();
  }, [onReceive, sigMessage]);

  /* QR인식 진행중일 때 이미지 어떻게 보여줄지 처리  */
  const processing = (param: MarkType) => {
    switch (param) {
      case 'DEFAULT':
        return <Text>processing...</Text>;
      case 'NONE':
        return;
      case 'CUSTOM':
        if (processingMark.type === 'CUSTOM') {
          return processingMark.component;
        }
        return;
      default:
        return;
    }
  };

  return isValid ? (
    <>
      {isProcessing && processingMark.type !== 'NONE' ? (
        <Wrapper $size={size}>{processing(processingMark.type)}</Wrapper>
      ) : (
        <QRCodeCanvas
          value={qrCode}
          size={size}
          {...(isShowLogo && { imageSettings: { src: ZigapLogo, width: logoSize, height: logoSize, excavate: false } })}
          {...props}
        />
      )}
    </>
  ) : (
    <Wrapper>
      <Text>QR timeout</Text>
    </Wrapper>
  );
};

export default LoginQR;

const Wrapper = styled.div<{ $size?: number }>`
  width: ${(props) => (props.$size ? `${props.$size}px` : '128px')};
  height: ${(props) => (props.$size ? `${props.$size}px` : '128px')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  font-size: 12px;
  color: #7a7a7a;
`;
