import express, { Request, Response, NextFunction } from 'express';
import { User, AllUser, UserInfo, RecentRead } from '.././Types/Users';
import { GetAllUsers } from '.././Api/Users/GetAllUsers';
import { Register } from '.././Api/Users/Register';
import { Delete } from '.././Api/Users/Delete';
import { Login } from '.././Api/Users/Login';
import { Logout } from '.././Api/Users/Logout';
import { Update } from '.././Api/Users/Update';

export const UserRouter = express.Router();

UserRouter.get('/users', async(req: Request, res: Response) => {
  try {
    const data: AllUser = await GetAllUsers.USERS() as AllUser;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({error});
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
    res.status(200).json({
      status: 200,
      message: "register successfully"
    });
  } catch (error) {
    res.status(500).json({error});
  }
})

.delete(async(req: Request, res: Response) => {
  try {
    const userToken: string = (req.headers.userauth) as string;
    const deleteUser = new Delete<string>(userToken);
    await deleteUser.deleteUser();
    res.status(200).json({
      status: 200,
      message: 'user successfully deleted'
    });
  } catch (error) {
    res.status(500).json({error});
  }
});

UserRouter.put('/user/:options', async(req: Request, res: Response) => {
  try {
    switch (req.params.options) {
      case 'login':
        const loggingin = new Login<User>({
          username: req.body.username,
          password: req.body.password
        });
        const token = await loggingin.login();
        res.status(200).json({
          status: 200,
          message: "successfully login",
          token,
        })
        break;
      case 'logout':
        const loggingout = new Logout<string>((req.headers.userauth) as string);
        await loggingout.logout();
        res.status(200).json({
          status: 200,
          message: 'logout successfully'
        })
        break;
      case 'update':
        const update = new Update<string, RecentRead>((req.headers.userauth) as string, {
          nomor: req.body.nomor,
          nama: req.body.nama,
          nama_latin: req.body.nama_latin,
          ayat: req.body.ayat
        });
        await update.update();
        res.status(200).json({
          status: 200,
          message: 'update successfully'
        })
        break;
    }
  } catch(error) {
    res.status(500).json({error});
  }
});