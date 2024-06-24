/* eslint-disable @typescript-eslint/no-explicit-any */
class Util {
  public string(input: any) {
    let s: string;

    if (typeof input === 'object' && input !== null) {
      s = JSON.stringify(input);
    } else {
      s = String(input);
    }

    return this.stringToUnicode(s.replace(/\//g, '\\/'));
  }

  public stringToByte(str: string) {
    const byte_array = new Uint8Array(str.length);

    for (let i = 0; i < str.length; i++) {
      byte_array[i] = str.charCodeAt(i);
    }

    return byte_array;
  }

  public stringToUnicode(str: string) {
    if (!str) {
      return '';
    }

    return Array.prototype.map
      .call(str, (char: string) => {
        const c = char.charCodeAt(0).toString(16);

        if (c.length > 2) {
          return '\\u' + c;
        }

        return char;
      })
      .join('');
  }

  public byteToHex(byte_array: Uint8Array) {
    if (!byte_array) {
      return '';
    }

    return Array.prototype.map
      .call(byte_array, (byte: number) => {
        return ('0' + (byte & 0xff).toString(16)).slice(-2);
      })
      .join('')
      .toLowerCase();
  }

  public hexToByte(hex: string) {
    if (!hex) {
      return new Uint8Array();
    }

    const bytes: number[] = [];

    for (let i = 0, length = hex.length; i < length; i += 2) {
      bytes.push(parseInt(hex.slice(i, i + 2), 16));
    }

    return new Uint8Array(bytes);
  }

  public isHex(input: any) {
    if (typeof input !== 'string') {
      return false;
    }

    const hexPattern = /^[0-9a-fA-F]+$/;
    return hexPattern.test(input) && input.length % 2 === 0;
  }
}

export default new Util();
