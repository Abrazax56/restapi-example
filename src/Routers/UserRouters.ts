import express, { Request, Response, NextFunction } from 'express';
import { User, AllUser, UserInfo } from '.././Types/AllUsers';
import { GetAllUsers } from '.././Api/Users/GetAllUsers';
import { GetUser } from '.././Api/Users/GetUser';
import { AddUser } from '.././Api/Users/AddUser';
import { DeleteUser } from '.././Api/Users/DeleteUser';

export const UserRouter = express.Router();

UserRouter.get('/users', async(req: Request, res: Response) => {
  try {
    const data: AllUser = await GetAllUsers.USERS() as AllUser;
    res.json(data);
  } catch (error) {
    res.json(error);
  }
});

UserRouter.route('/user')

.get(async(req: Request, res: Response) => {
  try {
    const user = new GetUser(req.query.user_token);
    const getUser: User = await user.user() as User;
    res.json(getUser);
  } catch (error) {
    res.json({status: 404, message: 'not found'});
  }
})

.post(async(req: Request, res: Response) => {
  try {
    const addUser = new AddUser<UserInfo>({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password
    });
    await addUser.user();
    res.json({status: 'success'});
  } catch (error) {
    res.json({status: 500});
  }
})

.delete(async(req: Request, res: Response) => {
  try {
    const deleteUser = new DeleteUser(req.query.user_token);
    await deleteUser.user();
    res.json({status: "success"});
  } catch (error) {
    res.json(error);
  }
});