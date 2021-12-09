import { AuthenticationStrategy } from '@loopback/authentication';
import { HttpErrors, Request} from '@loopback/rest';
import { UserProfile } from '@loopback/security';
import parseBearerToken from 'parse-bearer-token'
import { SessionService } from '../services/session.service';
import { service } from '@loopback/core';

export class CoordinatorStrategy implements AuthenticationStrategy {
    name: string = 'user'; // Strategy's name

    constructor(
        @service(SessionService)
        public serviceService: SessionService
      ) {}

    async authenticate(request: Request): Promise<UserProfile | undefined>{
        const token = parseBearerToken(request)
        if (!token) {
            throw new HttpErrors[401]("Haven't provided a token");
        }
        let info = this.serviceService.VerifyTokenJWT(token);
        if(info){
            if(info.data.role == 'admin01' || info.data.role=='empl01'){ 
            let profile: UserProfile = Object.assign({
                email: info.data.email,
                role: info.data.role
            });
            return profile;
        } else {
            throw new HttpErrors[401]("Has no role to execute this action")
        }
        } else {
            throw new HttpErrors[401]("Invalid Token");
        }
    }

}
