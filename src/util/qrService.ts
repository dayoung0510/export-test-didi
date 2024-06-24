import CryptoJS from 'crypto-js';

import SocketService from './socketService';

import type { QrType } from './types';

class QrService {
  public generateQrCode(type: string, dapp: string, url: string, network: string[]): QrType {
    const roomId = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
    // const secretKey = CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Hex);

    let qrCode = '';
    if (type === 'login') {
      qrCode = `http://172.30.1.61:3000/qrCode/scan?type=login&roomId=${roomId}&dapp=${dapp}&url=${url}&network=${network}`;
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

export default new QrService();
