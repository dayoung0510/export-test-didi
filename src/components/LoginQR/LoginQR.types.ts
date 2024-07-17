import type { CSSProperties } from 'react';

export type CommonStyleType = {
  /* styles */
  size?: number;
  bgColor?: string;
  fgColor?: string;
  style?: CSSProperties;

  /* center Zigap logo */
  isShowLogo?: boolean;
  logoSize?: number;
};

export type PayloadType = {
  publicKey: string;
  message: string;
};

export type AccountType = {
  address: string;
  network: string;
  nickName: string;
};

export type NoneLoginExpire = {
  type: 'NONE';
  seconds?: never; // 'NONE'일 때는 time을 받지 않음
};
export type FixedOrExtensionLoginExpire = {
  type: 'FIX' | 'EXTEND';
  seconds: number; // 'FIXED' 또는 'EXTENSION'일 때는 time이 필수
};
export type LoginExpireType = FixedOrExtensionLoginExpire | NoneLoginExpire;

export type LoginResultType = {
  address: string;
  network: string;
  nickName: string;
  token: string;
  issuedDateTime: string;
  expire: LoginExpireType;
};

export type ProcessingMarkType =
  | { type: 'DEFAULT' }
  | { type: 'CUSTOM'; component: React.ReactNode }
  | { type: 'NONE' };

export type LoginQRProps = {
  availableNetworks: string[];
  dapp: string;
  url: string;
  sigMessage: string;
  validSeconds: number;
  onReceive?: (res: { status: 'REQUEST' | 'ACCOUNT' | 'SUCCESS' | 'ERROR' }) => void;
  expire: LoginExpireType;
  icon?: string;
  processingMark?: ProcessingMarkType;
} & CommonStyleType;
