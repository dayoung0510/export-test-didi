import styled from 'styled-components';

import { AddressProvideQR, LoginQR } from './components';

const App = () => {
  return (
    <Container>
      <div>
        <LoginQR
          availableNetworks={['xphere', 'saseul']}
          dapp='Mintus'
          url='http://Xphere.mintus.io'
          sigMessage='hello world'
          validSeconds={100}
          expire={{ type: 'FIX', seconds: 60000 }}
          onReceive={(isSuccess) => console.log(isSuccess)}
          size={200}
        />
        <span>Login</span>
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
    row-gap: 20px;

    > span {
      text-align: center;
    }
  }
`;
