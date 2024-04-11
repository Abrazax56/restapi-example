import jwt from 'jsonwebtoken';
import { UserDB } from '../.././Database/UserDB';
import 'dotenv/config';
export class Update {
    req;
    res;
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    async update() {
        try {
            await UserDB.CLIENT.connect();
            const userData = jwt.verify(this.req.cookies.USER_AUTH, (process.env.SECRET));
            const user = await UserDB.COLLECTION.findOne({ username: userData.username });
            if (user !== null && this.req.cookies.USER_AUTH) {
                const recentRead = {
                    nomor: this.req.body.nomor,
                    nama: this.req.body.nama,
                    nama_latin: this.req.body.nama_latin,
                    ayat: this.req.body.ayat
                };
                await UserDB.COLLECTION.updateOne({
                    username: userData.username
                }, {
                    $set: {
                        recentread: recentRead
                    }
                });
                this.res.status(200).json({
                    status: 200,
                    message: 'update successfully'
                });
            }
            else {
                throw new Error('user not be found!');
            }
        }
        catch (error) {
            if (error instanceof Error) {
                this.res.status(504).json({ error: error.message });
            }
        }
        finally {
            await UserDB.CLIENT.close();
        }
    }
}
