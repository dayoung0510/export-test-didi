import styled from 'styled-components';

import { AddressProvideQR, LoginQR } from './components';

const App = () => {
  // const { generateQrCode } = QrService;

  // generateQrCode('', '', '', []);

  return (
    <Container>
      <div>
        <LoginQR
          availableNetworks={['xphere', 'saseul']}
          dapp="Mintus"
          url="http://Xphere.mintus.io"
          sigMessage="hello world"
          validTime={10}
          onReceive={(res) => console.log('login res!!', res)}
          size={100}
        />
        <span>Login</span>
      </div>

      <div>
        <AddressProvideQR
          availableNetworks={['xphere']}
          dapp="Mintus"
          url="http://Xphere.mintus.io"
          isShowLogo={false}
          validTime={10}
          onReceive={(res) => console.log('provide res!!', res)}
        />
        <span>AddressProvide</span>
      </div>
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
