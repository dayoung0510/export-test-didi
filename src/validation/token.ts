import CryptoJS from 'crypto-js';
import cryptoUtils from 'src/utils/cryptoUtils';
import { Xphere } from 'src/xphere';

import type { PayloadType } from 'src/components';

// Base64URL 인코딩 함수
function base64url(source: string): string {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(source))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

// token 생성 함수
export function createToken(payload: PayloadType, signature: string): string {
  const header = { type: 'token', alg: 'XPSIG' };
  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(payload));

  const token = `${encodedHeader}.${encodedPayload}.${signature}`;

  return token;
}

// token 검증 함수
export function verifyToken(token: string) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, encodedPayload, signature] = token.split('.');

  const payload = JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(encodedPayload)));

  const verified = cryptoUtils.xphereVerify(payload.message, payload.publicKey, signature);

  if (verified) {
    return payload;
  } else {
    throw new Error('Invalid token');
  }
}

export function getAddress(publicKey: string) {
  const address = Xphere.Sign.address(publicKey);
  return address;
}
