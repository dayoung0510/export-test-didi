import Enc from './enc';
import Sign from './sign';
import Util from './util';
import Validation from './validation';

type XphereType = {
  Enc: typeof Enc;
  Sign: typeof Sign;
  Util: typeof Util;
  Validation: typeof Validation;
};

const Xphere: XphereType = {
  Enc,
  Sign,
  Util,
  Validation,
};

export default Xphere;
