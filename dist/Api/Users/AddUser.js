import sign from 'jwt-encode';
import { UserDB } from '../.././Database/UserDB';
export class AddUser {
    newUser;
    constructor(newUser) {
        this.newUser = newUser;
    }
    async user() {
        try {
            await UserDB.CLIENT.connect();
            const secret = 'secret';
            const user_token = sign(this.newUser, secret);
            const isuser = {
                user_token,
                logingin: false
            };
            await UserDB.COLLECTION.insertOne(isuser);
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
