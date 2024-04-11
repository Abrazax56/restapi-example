import { Request, Response } from 'express';
import {ZodError} from "zod";
import { userSchema } from "../.././Validation/UserSchema";
import { UserDB } from '../.././Database/UserDB';
import { User } from '../.././Types/Users';

export class Register<Req extends Request, Res extends Response> {
    constructor(
        private req: Req,
        private res: Res,
    ) {}
    async register(): Promise<void>{
        try {
            await UserDB.CLIENT.connect();
            const userData: User = {
                name: this.req.body.name,
                username: this.req.body.username,
                password: this.req.body.password,
                loggingin: false,
                recentread: false
            }
            const user: User | null = await UserDB.COLLECTION.findOne({username: userData.username});
            if(user === null) {
                const userValidation: User = userSchema.parse(userData);
                await UserDB.COLLECTION.insertOne(userValidation);
                this.res.status(200).json({message: "Register successfully!"});
            }
        } catch (error) {
            if(error instanceof Error || error instanceof ZodError) {
                this.res.status(500).json({error: error});
            }
        } finally {
            await UserDB.CLIENT.close();
        }
    }
}