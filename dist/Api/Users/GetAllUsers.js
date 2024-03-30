import { UserDB } from '../.././Database/UserDB';
export class GetAllUsers {
    static async USERS() {
        try {
            await UserDB.CLIENT.connect();
            const users = await UserDB.COLLECTION.find().toArray();
            return users;
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
