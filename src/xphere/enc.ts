/* eslint-disable @typescript-eslint/no-explicit-any */
import CryptoJS from 'crypto-js';

import util from './util';

type CryptoJSAlgo = 'SHA256' | 'RIPEMD160';

class Enc {
  public string(obj: any) {
    return util.string(obj);
  }

  public crypto(algo: CryptoJSAlgo, string: string) {
    return CryptoJS[algo](string).toString(CryptoJS.enc.Hex);
  }

  public hash(obj: any) {
    return this.crypto('SHA256', this.string(obj));
  }

  public shortHash(obj: any) {
    return this.crypto('RIPEMD160', this.hash(obj));
  }

  public checksum(hash: string) {
    return this.hash(this.hash(hash)).slice(0, 4);
  }

  public idHash(obj: any) {
    const short_hash = this.shortHash(obj);

    return short_hash + this.checksum(short_hash);
  }

  public isHex(str: string) {
    return util.isHex(str);
  }
}

export default new Enc();
