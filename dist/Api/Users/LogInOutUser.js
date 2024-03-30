import sign from 'jwt-encode';
import { UserDB } from '../.././Database/UserDB';
export class LogInOutUser {
    userData;
    isLoggingIn;
    constructor(userData, isLoggingIn) {
        this.userData = userData;
        this.isLoggingIn = isLoggingIn;
    }
    async loginout() {
        try {
            await UserDB.CLIENT.connect();
            const secret = 'secret';
            const user_token = sign(this.userData, secret);
            await UserDB.COLLECTION.updateOne({
                user_token
            }, {
                $set: {
                    logingin: this.isLoggingIn
                }
            });
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
        finally {
            await UserDB.CLIENT.close();
        }
    }
}
