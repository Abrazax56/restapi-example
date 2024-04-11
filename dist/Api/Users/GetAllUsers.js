import { UserDB } from '../.././Database/UserDB';
export class GetAllUsers {
    req;
    res;
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    async getAllUser() {
        try {
            await UserDB.CLIENT.connect();
            const users = await UserDB.COLLECTION.find().toArray();
            this.res.status(200).json(users);
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
