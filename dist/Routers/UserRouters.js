import express from 'express';
import { UserDB } from '.././Database/UserDB';
export const UserRouter = express.Router();
UserRouter.get('/users', async (req, res) => {
    try {
        await UserDB.CLIENT.connect();
        const data = await UserDB.COLLECTION.find().toArray();
        res.json(data);
    }
    catch (error) {
        res.json(error);
    }
    finally {
        await UserDB.CLIENT.close();
    }
});
