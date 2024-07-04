import { io } from 'socket.io-client';

import type { Socket } from 'socket.io-client';

import cryptoUtils from './cryptoUtils';

const encryptedSocketUrl = import.meta.env.VITE_SOCKET_ENCRYPTED_URL || '';
const key: string = import.meta.env.VITE_SOCKET_KEY || '';
const decryptedSocketUrl = cryptoUtils.decrypt(encryptedSocketUrl, key);

if (!decryptedSocketUrl) {
  throw new Error('VITE_SOCKET_URL 환경 변수가 설정되지 않았습니다.');
}

class SocketInstance {
  private static instance: SocketInstance;
  public socket: Socket;

  private constructor() {
    this.socket = io(decryptedSocketUrl);
  }

  public static getInstance(): SocketInstance {
    if (!SocketInstance.instance) {
      SocketInstance.instance = new SocketInstance();
    }

    return SocketInstance.instance;
  }
}

export default SocketInstance;
