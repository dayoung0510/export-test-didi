import { useEffect, useState } from 'react';
import { LoginResultType } from 'src/components';

export const LOGIN_RES_KEY = 'userInfo';

const useZigap = () => {
  const [result, setResult] = useState<LoginResultType | undefined>(undefined);

  useEffect(() => {
    console.log('use Effect...');
    const data = localStorage.getItem(LOGIN_RES_KEY);
    if (data) {
      const parsedValue: LoginResultType = JSON.parse(data);
      setResult(parsedValue);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem(LOGIN_RES_KEY);
  };

  return {
    userInfo: {
      address: result?.address ?? undefined,
      network: result?.network ?? undefined,
      nickName: result?.nickName ?? undefined,
      token: result?.token ?? undefined,
      issuedTime: result?.issuedTime ?? undefined,
    },
    logout,
  };
};

export default useZigap;
