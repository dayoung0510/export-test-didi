import type { ec as EC } from 'elliptic';

export type SignatureType = EC.Signature;

export interface QrType {
  qrCode: string;
  roomId: string;
}

export interface AccountCryptoType {
  signature: string;
  publicKey: string;
  address: string;
  network: string;
  nickName: string;
  etc: string;
}

export interface AccountProvideType {
  address: string;
  network: string;
  nickName: string;
}

export interface ResponseLoginType {
  address: string;
  network: string;
  nickName: string;
  signature: string;
  publicKey: string;
}
