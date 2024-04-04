import { UserDB } from '../.././Database/UserDB';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
export class Delete {
    userToken;
    constructor(userToken) {
        this.userToken = userToken;
    }
    async deleteUser() {
        try {
            await UserDB.CLIENT.connect();
            const userData = jwt.verify(this.userToken, (process.env.SECRET));
            await UserDB.COLLECTION.deleteOne({ username: userData.username });
        }
        catch (error) {
            if (error instanceof Error || error instanceof jwt.TokenExpiredError) {
                throw new Error(error.message);
            }
        }
        finally {
            await UserDB.CLIENT.close();
        }
    }
}
