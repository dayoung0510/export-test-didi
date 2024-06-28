import { useEffect, useState } from 'react';
import { LoginResultType } from 'src/components';

export const useZigap = () => {
  const [result, setResult] = useState<LoginResultType | undefined>(undefined);

  useEffect(() => {
    const data = localStorage.getItem('loginRes');
    if (data) {
      console.log('useEffect');
      setResult(JSON.parse(data));
    }
  }, []);

  return result;
};
