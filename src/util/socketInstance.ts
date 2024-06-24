import { io } from 'socket.io-client';

import type { Socket } from 'socket.io-client';

const socketUrl: string = import.meta.env.VITE_SOCKET_URL || '';

if (!socketUrl) {
  throw new Error('VITE_SOCKET_URL 환경 변수가 설정되지 않았습니다.');
}

class SocketInstance {
  private static instance: SocketInstance;
  public socket: Socket;

  private constructor() {
    this.socket = io(socketUrl);
  }

  public static getInstance(): SocketInstance {
    if (!SocketInstance.instance) {
      SocketInstance.instance = new SocketInstance();
    }
    return SocketInstance.instance;
  }
}

export default SocketInstance;
