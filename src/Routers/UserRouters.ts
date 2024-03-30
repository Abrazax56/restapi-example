import express, { Request, Response, NextFunction } from 'express';
import { User, AllUser, UserInfo } from '.././Types/AllUsers';
import { GetAllUsers } from '.././Api/Users/GetAllUsers';
import { GetUser } from '.././Api/Users/GetUser';
import { AddUser } from '.././Api/Users/AddUser';
import { DeleteUser } from '.././Api/Users/DeleteUser';
import { UpdateUser } from '.././Api/Users/UpdateUser';
import { LogInOutUser } from '.././Api/Users/LogInOutUser';

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

UserRouter.put('/user/:loginout', async(req: Request, res: Response) => {
  try {
    const userData: UserInfo = (req.body.userData) as UserInfo;
    switch (req.params.loginout) {
      case 'login':
        const loginUser = new LogInOutUser<UserInfo, boolean>(userData, true);
        await loginUser.loginout();
        res.json({status: 'success'})
        break;
      case 'logout':
        const logoutUser = new LogInOutUser<UserInfo, boolean>(userData, false);
        await logoutUser.loginout();
        res.json({status: 'success'})
        break;
      case 'update':
        const updatedUser: UserInfo = (req.body.updatedUser) as UserInfo;
        const updateUser = new UpdateUser<UserInfo>(userData, updatedUser);
        await updateUser.update();
        res.json({status: 'success'})
        break;
    }
  } catch (error) {
    res.json(error);
  }
});