import { UserDB } from '../.././Database/UserDB';
export class DeleteUser {
    user_token;
    constructor(user_token) {
        this.user_token = user_token;
    }
    async user() {
        try {
            await UserDB.CLIENT.connect();
            await UserDB.COLLECTION.deleteOne({ user_token: this.user_token });
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
