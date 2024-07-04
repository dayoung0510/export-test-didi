import { useEffect, useState } from 'react';
import { LoginResultType } from 'src/components';
import dayjs from 'dayjs';

export const LOGIN_RES_KEY = 'userInfo';
export const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const useZigap = () => {
  const [result, setResult] = useState<LoginResultType | undefined>(undefined);
  const [expireDateTime, setExpireDateTime] = useState<string | undefined>(undefined);

  /* userInfo 셋팅 */
  useEffect(() => {
    const data = localStorage.getItem(LOGIN_RES_KEY);
    if (data) {
      const parsedValue: LoginResultType = JSON.parse(data);
      setResult(parsedValue);
    }
  }, []);

  /* 로그인만료 관련 로직 */
  useEffect(() => {
    if (result) {
      if (result.expire.type !== 'NONE') {
        const { type, seconds } = result.expire;

        // case 1. 페이지 새로고침에 따라 연장되는 만료예정시각
        const extendedExpireDateTime = dayjs().add(seconds, 'seconds').format(TIME_FORMAT);

        // case 2. 고정된 만료예정시각
        const fixedExpireDateTime = dayjs(result.issuedDateTime).add(seconds, 'seconds').format(TIME_FORMAT);

        // case 1,2를 고려한 최종 만료예정시각
        const calculatedExpireDateTime = type === 'EXTEND' ? extendedExpireDateTime : fixedExpireDateTime;
        setExpireDateTime(calculatedExpireDateTime);

        if (dayjs().format(TIME_FORMAT) > calculatedExpireDateTime) {
          localStorage.removeItem(LOGIN_RES_KEY);
          window.location.reload();
        }
      }
    }
  }, [result]);

  const logout = () => {
    localStorage.removeItem(LOGIN_RES_KEY);
    setResult(undefined);
  };

  return {
    userInfo: {
      address: result?.address ?? undefined,
      network: result?.network ?? undefined,
      nickName: result?.nickName ?? undefined,
      token: result?.token ?? undefined,
      issuedDateTime: result?.issuedDateTime ?? undefined,
      expireDateTime,
    },
    logout,
  };
};

export default useZigap;
