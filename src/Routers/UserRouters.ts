import express, { Request, Response, NextFunction } from 'express';
import sign from 'jwt-encode';
import { UserDB } from '.././Database/UserDB';
import { User, AllUser, UserInfo } from '.././Types/AllUsers';

export const UserRouter = express.Router();

UserRouter.get('/users', async(req: Request, res: Response) => {
  try {
    await UserDB.CLIENT.connect();
    const data: AllUser = await UserDB.COLLECTION.find().toArray() as AllUser;
    res.json(data);
  } catch (error) {
    res.json(error);
  } finally {
    await UserDB.CLIENT.close();
  }
});

UserRouter.route('/user')
.get(async(req: Request, res: Response) => {
  try {
    await UserDB.CLIENT.connect();
    const user: User = await UserDB.COLLECTION.findOne({
      user_token: req.query.user_token
    }) as User;
    res.json(user);
  } catch (error) {
    res.json({status: 404, message: 'not found'});
  } finally {
    await UserDB.CLIENT.close();
  }
})
.post(async(req: Request, res: Response) => {
  try {
    await UserDB.CLIENT.connect();
    const secret: string = 'secret';
    const userInfo: UserInfo = {
      name: req.body.name,
      username: req.body.username,
      password: req.body.password
    }
    const user_token: string = sign(userInfo, secret);
    const newUser: User = {
      user_token,
      loggingin: false
    } as User;
    await UserDB.COLLECTION.insertOne(newUser);
    res.json({status: 'success'});
  } catch (error) {
    res.json({status: 500});
  } finally {
    await UserDB.CLIENT.close();
  }
})