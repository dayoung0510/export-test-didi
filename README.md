# zigap-utils

It is a library that collects utils that help communicate between dapp and zigap.

## Installation

```
npm i zigap-utils --save -D
```

## Usage

```ts
import { LoginQR } from 'zigap-utils';

const App = () => {
  ...

  return (
    <div>
      <LoginQR
        dapp='Mintus'
        url='http://Xphere.mintus.io'
        availableNetworks={['xphere']}
        isShowLogo={false}
        logoSize={25}
        validTime={10}
        sigMessage="hello world"
        onReceive={({ isSuccess, account, payload, signature }) => {
          if(isSuccess) {
            // something to do after login
          }
        }}
      />
    </div>
  );
}
```

<br />

---

### `LoginQR` props

| prop | required | type | default value | description |
| --- | :-: | --- | --- | --- |
| `dapp` | true | string |  | Name of the dapp to use |
| `url` | true | string |  | The url of dapp to connect |
| `availableNetworks` | true | string[] |  | List of connectable networks in dapp |
| `sigMessage` | true | string |  | Messages signed to verify the identity of the user |
| `validTime` | true | number |  | QR code valid time(minutes) |
| `onReceive` | true | (value) => void |  | Function called after login request |
| `size` | false | number | 128 | canvas width |
| `bgColor` | false | string | #fff | background color |
| `fgColor` | false | string | #000 | foreground color |
| `style` | false | CSSProperties |  | custom css style |
| `isShowLogo` | false | boolean | false | Zigap logo in the middle of the QR code |
| `logoSize` | false | number | 30 | logo width & height |

<br>

### `AddressProvideQR` props

| prop                | required | type            | default value | description                             |
| ------------------- | :------: | --------------- | ------------- | --------------------------------------- |
| `dapp`              |   true   | string          |               | Name of the dapp to use                 |
| `url`               |   true   | string          |               | The url of dapp to connect              |
| `availableNetworks` |   true   | string[]        |               | List of connectable networks in dapp    |
| `validTime`         |   true   | number          |               | QR code valid time(minutes)             |
| `onReceive`         |   true   | (value) => void |               | Function called after login request     |
| `size`              |  false   | number          | 128           | canvas width                            |
| `bgColor`           |  false   | string          | #fff          | background color                        |
| `fgColor`           |  false   | string          | #000          | foreground color                        |
| `style`             |  false   | CSSProperties   |               | custom css style                        |
| `isShowLogo`        |  false   | boolean         | false         | Zigap logo in the middle of the QR code |
| `logoSize`          |  false   | number          | 30            | logo width & height                     |
