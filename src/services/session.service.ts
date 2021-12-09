import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { Keys as keys } from '../config/keys';
import { User } from '../models/user.model';

const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class SessionService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Function that generates a Token JWT
   */ 
  GenerateToken(user: User): string{
    let tk = jwt.sign({
      exp: keys.expirationTimeJWT,
      data: {
        email: user.email,
        role: user.role_id
      }
    }, keys.secretKeyJWT);
    return tk
  }

  /*
  * Verify the validity of a token
  */
   VerifyTokenJWT(token: string){
     try {
        // verify a token symmetric - synchronous
          let decoded = jwt.verify(token, keys.secretKeyJWT);
          return decoded;
     } catch {
       return null;
     }
   }

}
