/* eslint-disable @typescript-eslint/no-explicit-any */
import nacl from 'tweetnacl';

import enc from './enc';
import util from './util';

interface KeyPair {
  private_key: string;
  public_key: string;
  address: string;
}

class Sign {
  private KEY_SIZE;
  private SIGNATURE_SIZE;

  constructor() {
    this.KEY_SIZE = 64;
    this.SIGNATURE_SIZE = 128;
  }

  public keyPair() {
    const pair = nacl.sign.keyPair();

    const result: KeyPair = {
      private_key: util.byteToHex(pair.secretKey).slice(0, this.KEY_SIZE),
      public_key: util.byteToHex(pair.publicKey),
      address: this.address(util.byteToHex(pair.publicKey)),
    };

    return result;
  }

  public privateKey() {
    return util.byteToHex(nacl.sign.keyPair().secretKey).slice(0, this.KEY_SIZE);
  }

  public publicKey(private_key: string) {
    return util.byteToHex(nacl.sign.keyPair.fromSeed(util.hexToByte(private_key)).publicKey);
  }

  public address(public_key: string) {
    return enc.idHash(public_key);
  }

  public signature(obj: any, private_key: string) {
    return util.byteToHex(
      nacl.sign.detached(util.stringToByte(enc.string(obj)), util.hexToByte(private_key + this.publicKey(private_key))),
    );
  }

  public signatureValidity(obj: any, public_key: string, signature: string) {
    return (
      signature.length === this.SIGNATURE_SIZE &&
      enc.isHex(signature) === true &&
      nacl.sign.detached.verify(
        util.stringToByte(enc.string(obj)),
        util.hexToByte(signature),
        util.hexToByte(public_key),
      )
    );
  }
}

export default new Sign();
