import { Request, Response } from 'express';
import { UserDB } from '../.././Database/UserDB';
import { AllUser } from '../.././Types/Users';

export class GetAllUsers<Req extends Request, Res extends Response> {
    constructor(
        private req: Req,
        private res: Res
    ) {}
    async getAllUser(): Promise<void> {
        try {
            await UserDB.CLIENT.connect();
            const users: AllUser = await UserDB.COLLECTION.find().toArray() as AllUser;
            this.res.status(200).json(users);
        } catch (error) {
            if(error instanceof Error) {
                this.res.status(504).json({error: error.message});
            }
        } finally {
            await UserDB.CLIENT.close();
        }
    }
}