import { UserDB } from '../.././Database/UserDB';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
export class Delete {
    req;
    res;
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    async deleteUser() {
        try {
            await UserDB.CLIENT.connect();
            const userData = jwt.verify(this.req.cookies.USER_AUTH, (process.env.SECRET));
            await UserDB.COLLECTION.deleteOne({ username: userData.username });
            this.res.status(200).json({
                status: 200,
                message: 'user successfully deleted'
            });
        }
        catch (error) {
            if (error instanceof Error || error instanceof jwt.TokenExpiredError) {
                this.res.status(500).json({ error: error.message });
            }
        }
        finally {
            await UserDB.CLIENT.close();
        }
    }
}
