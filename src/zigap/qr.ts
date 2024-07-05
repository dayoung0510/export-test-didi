import CryptoJS from 'crypto-js';

import SocketService from 'src/utils/socketService';

import type { QrType } from './types';

class QrService {
  public generateQrCode(type: string, dapp: string, url: string, network: string[], icon: string | undefined): QrType {
    const roomId = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
    // const secretKey = CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Hex);

    let qrCode = '';
    if (type === 'login') {
      qrCode = `https://zigap.io/qrCode/scan?type=login&roomId=${roomId}&dapp=${dapp}&url=${url}&network=${network}&icon=${icon}`;
    } else if (type === 'send') {
      qrCode = `zigap://send?roomId=${roomId}&dapp=${dapp}`;
    } else if (type === 'provide') {
      qrCode = `zigap://provide?roomId=${roomId}&dapp=${dapp}`;
    }

    SocketService.joinRoom(roomId);

    return {
      qrCode,
      roomId,
    };
  }
}

export const Qr = new QrService();
