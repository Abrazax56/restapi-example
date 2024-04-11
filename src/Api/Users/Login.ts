import { Request, Response } from 'express';
import { allowedOrigins } from '../.././Web/Express';
import jwt, { Secret } from 'jsonwebtoken';
import { UserDB } from '../.././Database/UserDB';
import { User } from '../.././Types/Users';
import 'dotenv/config';

export class Login<Req extends Request, Res extends Response> {
    constructor(
        private req: Req,
        private res: Res
    ) {}
  
    async login(): Promise<void>{
        try {
            await UserDB.CLIENT.connect();
            const userData: User = {
                username: this.req.body.username,
                password: this.req.body.password
            };
            const user: User | null = await UserDB.COLLECTION.findOne({username: userData.username});
            if(user !== null && user.password === userData.password) {
                await UserDB.COLLECTION.updateOne(
                    {
                        username: userData.username
                    },
                    {
                        $set: {
                            loggingin: true
                        }
                    }
                )
                const userTokenData: User = {
                    name: user.name,
                    username: user.username,
                    password: user.password
                };
                const token: string = jwt.sign(userTokenData as object, (process.env.SECRET) as Secret, {expiresIn: '30d'});
                const origins: string = (this.req.headers.origin) as string;
                if(token && allowedOrigins.indexOf(origins) >= 0) {
                    this.res.setHeader("Access-Control-Allow-Origin", origins);
                    this.res.setHeader("Access-Control-Allow-Credentials", "true");
                    this.res.status(200).cookie("USER_AUTH", token, {
                        httpOnly: false,
                        secure: true,
                        maxAge: 1000*60*60*24*30,
                        expires: new Date(Date.now() + 1000*60*60*24*20),
                        sameSite: 'none'
                    }).json({
                        status: 200,
                        message: "successfully login",
                        token
                    });
                } else {
                    throw new Error('origin or token is invalid!');
                }
            } else {
                throw new Error('username or password is incorrect!');
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