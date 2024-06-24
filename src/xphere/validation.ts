import CryptoJS from 'crypto-js';
import cryptoUtils from 'src/util/cryptoUtils';
import Xphere from 'src/xphere';

import type { PayloadType } from 'src/components';

class Validation {
  // Base64URL 인코딩 함수
  private base64url(source: string): string {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(source))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  // token 생성 함수
  public createToken(payload: PayloadType, signature: string): string {
    const header = { type: 'token', alg: 'XPSIG' };
    const encodedHeader = this.base64url(JSON.stringify(header));
    const encodedPayload = this.base64url(JSON.stringify(payload));

    const token = `${encodedHeader}.${encodedPayload}.${signature}`;

    return token;
  }

  // token 검증 함수
  public verifyToken(token: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, encodedPayload, signature] = token.split('.');

    const payload = JSON.parse(
      CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(encodedPayload)),
    );

    const verified = cryptoUtils.xphereVerify(
      payload.message,
      payload.publicKey,
      signature,
    );

    if (verified) {
      return payload;
    } else {
      throw new Error('Invalid token');
    }
  }

  public getAddress(publicKey: string) {
    const address = Xphere.Sign.address(publicKey);
    return address;
  }
}

export default new Validation();
