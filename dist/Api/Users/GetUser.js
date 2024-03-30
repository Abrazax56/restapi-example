import { UserDB } from '../.././Database/UserDB';
export class GetUser {
    user_token;
    constructor(user_token) {
        this.user_token = user_token;
    }
    async user() {
        try {
            await UserDB.CLIENT.connect();
            const isuser = await UserDB.COLLECTION.findOne({
                user_token: this.user_token
            });
            return isuser;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            return error;
        }
        finally {
            await UserDB.CLIENT.close();
        }
    }
}
