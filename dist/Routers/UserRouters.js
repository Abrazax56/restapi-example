import express from 'express';
import sign from 'jwt-encode';
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
UserRouter.route('/user')
    .get(async (req, res) => {
    try {
        await UserDB.CLIENT.connect();
        const user = await UserDB.COLLECTION.findOne({
            user_token: req.query.user_token
        });
        res.json(user);
    }
    catch (error) {
        res.json({ status: 404, message: 'not found' });
    }
    finally {
        await UserDB.CLIENT.close();
    }
})
    .post(async (req, res) => {
    try {
        await UserDB.CLIENT.connect();
        const secret = 'secret';
        const userInfo = {
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        };
        const user_token = sign(userInfo, secret);
        const newUser = {
            user_token,
            loggingin: false
        };
        await UserDB.COLLECTION.insertOne(newUser);
        res.json({ status: 'success' });
    }
    catch (error) {
        res.json({ status: 500 });
    }
    finally {
        await UserDB.CLIENT.close();
    }
});
