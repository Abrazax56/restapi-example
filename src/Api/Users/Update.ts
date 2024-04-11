import { Request, Response } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { UserDB } from '../.././Database/UserDB';
import { User, RecentRead } from '../.././Types/Users';
import 'dotenv/config';

export class Update<Req extends Request, Res extends Response> {
    constructor(
        private req: Req,
        private res: Res
    ) {}
  
    async update(): Promise<void>{
        try {
            await UserDB.CLIENT.connect();
            const userData: User = jwt.verify(this.req.cookies.USER_AUTH, (process.env.SECRET) as Secret) as User;
            const user: User | null = await UserDB.COLLECTION.findOne({username: userData.username});
            if(user !== null && this.req.cookies.USER_AUTH) {
                const recentRead: RecentRead = {
                    nomor: this.req.body.nomor,
                    nama: this.req.body.nama,
                    nama_latin: this.req.body.nama_latin,
                    ayat: this.req.body.ayat
                };
                await UserDB.COLLECTION.updateOne(
                    {
                        username: userData.username
                    },
                    {
                        $set: {
                            recentread: recentRead
                        }
                    }
                );
                this.res.status(200).json({
                    status: 200,
                    message: 'update successfully'
                });
            } else {
                throw new Error('user not be found!');
            }
        } catch (error) {
            if(error instanceof Error) {
                this.res.status(500).json({ error: error.message });
            }
        } finally {
            await UserDB.CLIENT.close();
        }
    }
}