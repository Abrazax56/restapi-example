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
            this.res.json(users);
        }
        catch (error) {
            if (error instanceof Error) {
                this.res.json({ error: error.message });
            }
        }
        finally {
            await UserDB.CLIENT.close();
        }
    }
}
