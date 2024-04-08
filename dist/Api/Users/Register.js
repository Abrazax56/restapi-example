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
                return 200;
            }
            else {
                return 500;
            }
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
                return 500;
            }
        }
        finally {
            await UserDB.CLIENT.close();
        }
    }
}
