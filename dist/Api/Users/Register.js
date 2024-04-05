import { UserDB } from '../.././Database/UserDB';
export class Register {
    userData;
    constructor(userData) {
        this.userData = userData;
    }
    async register() {
        try {
            await UserDB.CLIENT.connect();
            const user = await UserDB.COLLECTION.findOne({ username: this.userData.username });
            if (user === null) {
                await UserDB.COLLECTION.insertOne(this.userData);
            }
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
