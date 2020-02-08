import jwt from 'jsonwebtoken';
import { checkToken, getToken, checkExpiredToken } from './../config';

export function checkMe() {
    if (checkToken()) {
        try
        {
            
            const tokenString = getToken();
            const token = JSON.parse(tokenString);
            const accessToken = token.accessToken;
            const refreshToken = token.refreshToken;
            if(! checkExpiredToken(refreshToken))
            {
                return false;
            }
            const decode = jwt.decode(accessToken);
            if(decode === null || undefined)
            {
                return false;
            }
            return true;
        }
        catch(e)
        {
            return false;
        }
    }
    return false;
}
