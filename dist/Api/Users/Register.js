import { UserDB } from '../.././Database/UserDB';
export class Register {
    userData;
    constructor(userData) {
        this.userData = userData;
    }
    async register() {
        try {
            await UserDB.CLIENT.connect();
            await UserDB.COLLECTION.insertOne(this.userData);
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
