import { Request, Response } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { UserDB } from '../.././Database/UserDB';
import { User } from '../.././Types/Users';
import 'dotenv/config';

export class Logout<Req extends Request, Res extends Response> {
    constructor(
        private req: Req,
        private res: Res
    ) {}
  
    async logout(): Promise<void>{
        try {
            await UserDB.CLIENT.connect();
            const userData: User = jwt.verify(this.req.cookies.USER_AUTH, (process.env.SECRET) as Secret) as User;
            const user: User | null = await UserDB.COLLECTION.findOne({username: userData.username});
            if(user !== null && this.req.cookies.USER_AUTH) {
                await UserDB.COLLECTION.updateOne(
                    {
                        username: userData.username
                    },
                    {
                        $set: {
                            loggingin: false
                        }
                    }
                )
                this.res.status(200).cookie("USER_AUTH", this.req.cookies.USER_AUTH, {
                    httpOnly: false,
                    secure: true,
                    maxAge: 100,
                    expires: new Date(Date.now() + 10)
                }).json({
                    status: 200,
                    message: 'logout successfully'
                });
            } else {
                throw new Error('user not be found!');
            }
        } catch (error) {
            if(error instanceof Error) {
                this.res.status(504).json({error: error.message});
            }
        } finally {
            await UserDB.CLIENT.close();
        }
    }
}