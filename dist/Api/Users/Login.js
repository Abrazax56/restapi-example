import jwt from 'jsonwebtoken';
import { UserDB } from '../.././Database/UserDB';
import 'dotenv/config';
export class Login {
    userData;
    constructor(userData) {
        this.userData = userData;
    }
    async login() {
        try {
            await UserDB.CLIENT.connect();
            const user = await UserDB.COLLECTION.findOne({ username: this.userData.username });
            if (user !== null) {
                await UserDB.COLLECTION.updateOne({
                    username: this.userData.username
                }, {
                    $set: {
                        loggingin: true
                    }
                });
                const userTokenData = {
                    name: user.name,
                    username: user.username,
                    password: user.password
                };
                return jwt.sign(userTokenData, (process.env.SECRET), { expiresIn: '30d' });
            }
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
                return error;
            }
        }
    }
}
