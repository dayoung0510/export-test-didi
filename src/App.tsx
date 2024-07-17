import { useState } from 'react';
import styled from 'styled-components';

import { AddressProvideQR, LoginQR } from './components';

const App = () => {
  const [result1, setResult1] = useState<undefined | string>(undefined);
  const [result2, setResult2] = useState<undefined | string>(undefined);
  return (
    <Container>
      <div>
        <LoginQR
          availableNetworks={['xphere', 'saseul']}
          dapp='Mintus'
          url='http://Xphere.mintus.io'
          sigMessage='hello world'
          validSeconds={10000}
          expire={{ type: 'FIX', seconds: 60000 }}
          onReceive={(res) => {
            if (res.status === 'SUCCESS') {
              setResult1('성공');
            } else if (res.status === 'REQUEST' || res.status === 'ACCOUNT') {
              setResult1(`진행중 - ${res.status}`);
            } else {
              setResult1('실패');
            }
          }}
          size={200}
          processingMark={{
            type: 'NONE',
          }}
        />
        <div>{result1 === undefined ? <span>진행 전</span> : <span>{result1}</span>}</div>
      </div>

      {/* <div>
        <AddressProvideQR
          availableNetworks={['xphere']}
          dapp='Mintus'
          url='http://Xphere.mintus.io'
          isShowLogo={false}
          validSeconds={10}
          onReceive={(isSuccess) => console.log(isSuccess)}
        />
        <span>AddressProvide</span>
      </div> */}
    </Container>
  );
};

export default App;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  column-gap: 80px;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 20px;

    > span {
      text-align: center;
    }
  }
`;
