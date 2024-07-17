import type { CommonStyleType } from 'src/components/LoginQR/LoginQR.types';

export type AddressProvideResultType = {
  isSuccess: boolean;
  address?: string;
  network?: string;
  nickName?: string;
};

export type AddressProvideQRProps = {
  availableNetworks: string[];
  dapp: string;
  url: string;
  validSeconds: number;
  icon?: string;
  onReceive: (res: { isSuccess: boolean }) => void;
} & CommonStyleType;
