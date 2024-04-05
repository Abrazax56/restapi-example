import jwt from 'jsonwebtoken';
import { UserDB } from '../.././Database/UserDB';
import 'dotenv/config';
export class Update {
    userToken;
    recentRead;
    constructor(userToken, recentRead) {
        this.userToken = userToken;
        this.recentRead = recentRead;
    }
    async update() {
        try {
            await UserDB.CLIENT.connect();
            const userData = jwt.verify(this.userToken, (process.env.SECRET));
            const user = await UserDB.COLLECTION.findOne({ username: userData.username });
            if (user !== null) {
                await UserDB.COLLECTION.updateOne({
                    username: userData.username
                }, {
                    $set: {
                        recentread: this.recentRead
                    }
                });
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
