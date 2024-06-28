import SocketService from './socketService';

import type { AccountProvideType } from './types';

class AddressProvideService {
  // 타입 가드 함수
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private isAccountType(obj: any): obj is AccountProvideType {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      typeof obj.address === 'string' &&
      typeof obj.network === 'string' &&
      typeof obj.nickName === 'string'
    );
  }

  public getAccount(): Promise<AccountProvideType> {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      SocketService.onMessageReceived('addressProvide', (message: any) => {
        if (this.isAccountType(message)) {
          resolve(message);
        } else {
          reject(new Error('Invalid address'));
        }
      });
    });
  }

  public async qrAddressProvide(roomId: string): Promise<AccountProvideType> {
    try {
      const account = await this.getAccount();

      return account;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      SocketService.leaveRoom(roomId);
    }
  }
}

export default new AddressProvideService();
