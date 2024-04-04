import express, { Request, Response, NextFunction } from 'express';
import { User, AllUser, UserInfo } from '.././Types/Users';
import { GetAllUsers } from '.././Api/Users/GetAllUsers';
import { Register } from '.././Api/Users/Register';
import { Delete } from '.././Api/Users/Delete';
import { Login } from '.././Api/Users/Login';

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

.post(async(req: Request, res: Response) => {
  try {
    const userData: User = {
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      loggingin: false,
      recentread: false
    };
    const register = new Register<User>(userData);
    await register.register();
    res.json({
      status: 200,
      message: "register successfully"
    });
  } catch (error) {
    res.json(error);
  }
})

.delete(async(req: Request, res: Response) => {
  try {
    const userToken: string = (req.query.token) as string;
    const deleteUser = new Delete<string>(userToken);
    await deleteUser.deleteUser();
    res.json({
      status: 200,
      message: 'user successfully deleted'
    });
  } catch (error) {
    res.json(error);
  }
});

UserRouter.put('/user/:options', async(req: Request, res: Response) => {
  switch (req.params.options) {
    case 'login':
      const loggingin = new Login<User>({
        username: req.body.username,
        password: req.body.password
      });
      const token = await loggingin.login();
      res.json({
        status: 200,
        message: "successfully login",
        token,
      })
      break;
    case 'logout':
      res.json({status: 404})
      break;
    case 'update':
      res.json({status: 404})
      break;
  }
});