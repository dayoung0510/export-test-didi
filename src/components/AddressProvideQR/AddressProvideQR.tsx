import { useEffect, useState } from 'react';

import { QRCodeCanvas } from 'qrcode.react';
import { Qr } from 'src/zigap/qr';

import ZigapLogo from '../../assets/zigap-icon.svg';
import provide from '../../utils/addressProvide';
import SocketService from '../../utils/socketService';

import type { AddressProvideQRProps, AddressProvideResultType } from './AddressProvideQR.types';

const AddressProvideQR = ({
  availableNetworks,
  dapp,
  url,
  validTime,
  onReceive,
  isShowLogo = false,
  logoSize = 30,
  ...props
}: AddressProvideQRProps) => {
  const [isValid, setIsValid] = useState(true);

  const { qrCode, roomId } = Qr.generateQrCode('provide', dapp, url, availableNetworks);

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
        console.log('roomId22', roomId);
        const loginAccount = await provide.qrAddressProvide(roomId);
        const result: AddressProvideResultType = {
          isSuccess: true,
          address: loginAccount.address,
          network: loginAccount.network,
          nickName: loginAccount.nickName,
        };
        onReceive(true);
      } catch (error) {
        onReceive(false);
      }
    };
    getAccount();
  }, []);

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

export default AddressProvideQR;
