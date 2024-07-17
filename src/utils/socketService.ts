import SocketInstance from './socketInstance';

class SocketService {
  private socketInstance: SocketInstance;

  constructor() {
    this.socketInstance = SocketInstance.getInstance();
  }

  public joinRoom(roomId: string) {
    this.socketInstance.socket.emit('joinRoom', roomId);
  }

  public leaveRoom(roomId: string) {
    this.socketInstance.socket.emit('leaveRoom', roomId);
    // this.socketInstance.socket.disconnect();
  }

  public confirmMessage(roomId: string, message: string) {
    const result = this.socketInstance.socket.emit('confirmMessage', roomId, message);
    return result;
  }

  public checkVerified(roomId: string, verified: boolean) {
    const result = this.socketInstance.socket.emit('checkVerified', roomId, verified);
    return result;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onMessageReceived(type: string, callback: (message: any) => void) {
    if (type === 'accountInfo') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.socketInstance.socket.on('accountInfo', (message: any) => {
        callback(message);
      });
    } else if (type === 'requestMessage') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.socketInstance.socket.on('requestMessage', (message: any) => {
        callback(message);
      });
    } else if (type === 'addressProvide') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.socketInstance.socket.on('addressProvide', (message: any) => {
        callback(message);
      });
    } else if (type === 'checkVerified') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.socketInstance.socket.on('checkVerified', (message: any) => {
        callback(message);
      });
    }
  }

  public offMessageReceived(type: string) {
    if (type === 'accountInfo') {
      this.socketInstance.socket.off('accountInfo');
    } else if (type === 'requestMessage') {
      this.socketInstance.socket.off('requestMessage');
    } else if (type === 'addressProvide') {
      this.socketInstance.socket.off('addressProvide');
    } else if (type === 'checkVerified') {
      // TODO!! 여기 git에 잘못쓴거 맞는지 확인
      this.socketInstance.socket.off('checkVerified');
    }
  }
}

export default new SocketService();
