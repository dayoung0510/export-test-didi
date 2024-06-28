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

export type LoginResultType = {
  address: string;
  network: string;
  nickName: string;
  token: string;
  issuedTime: Date;
};

export type LoginQRProps = {
  availableNetworks: string[];
  dapp: string;
  url: string;
  sigMessage: string;
  validTime: number;
  onReceive: (res: OnReceiveType) => void;
} & CommonStyleType;

export type OnReceiveType = {
  isSuccess: boolean;
};
