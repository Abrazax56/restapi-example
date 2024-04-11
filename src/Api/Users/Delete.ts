import { Request, Response } from 'express';
import { UserDB } from '../.././Database/UserDB';
import { User } from '../.././Types/Users';
import jwt, { Secret } from 'jsonwebtoken';
import 'dotenv/config';

export class Delete<Req extends Request, Res extends Response> {
    constructor(
        private req: Request,
        private res: Response
    ) {}
    
    async deleteUser(): Promise<void>{
        try {
            await UserDB.CLIENT.connect();
            const userData: User = jwt.verify(this.req.cookies.USER_AUTH, (process.env.SECRET) as Secret) as User;
            await UserDB.COLLECTION.deleteOne({username: userData.username});
            this.res.status(200).json({
                status: 200,
                message: 'user successfully deleted'
            });
        } catch (error) {
            if(error instanceof Error || error instanceof jwt.TokenExpiredError) {
                this.res.status(500).json({ error: error });
            }
        } finally {
            await UserDB.CLIENT.close();
        }
    }
}