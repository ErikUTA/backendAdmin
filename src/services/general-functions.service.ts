import {injectable, /* inject, */ BindingScope} from '@loopback/core';
const cryptoJS = require("crypto-js");
@injectable({scope: BindingScope.TRANSIENT})
export class GeneralFunctionsService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Encrypt password
   */
  EncryptPassword(passw: string): string {
    let passwEncrypt= cryptoJS.MD5(passw).toString();
    return passwEncrypt;
  }


}
