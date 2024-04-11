import express, { Request, Response, NextFunction } from 'express';
import { allowedOrigins } from '.././Web/Express';
import { User, AllUser, UserInfo, RecentRead } from '.././Types/Users';
import { GetAllUsers } from '.././Api/Users/GetAllUsers';
import { Register } from '.././Api/Users/Register';
import { Delete } from '.././Api/Users/Delete';
import { Login } from '.././Api/Users/Login';
import { Logout } from '.././Api/Users/Logout';
import { Update } from '.././Api/Users/Update';

export const UserRouter = express.Router();

UserRouter.get('/users', async(req: Request, res: Response) => {
    const allUser = new GetAllUsers<Request, Response>(req, res);
    await allUser.getAllUser();
});

UserRouter.route('/user')
.post(async(req: Request, res: Response) => {
    const register = new Register<Request, Response>(req, res);
    await register.register();
})
.delete(async(req: Request, res: Response) => {
    const deleteUser = new Delete<Request, Response>(req, res);
    await deleteUser.deleteUser();
});

UserRouter.put('/user/:options', async(req: Request, res: Response) => {
    switch (req.params.options) {
        case 'login':
            const loggingin = new Login<Request, Response>(req, res);
            await loggingin.login()
            break;
        case 'logout':
            const loggingout = new Logout<Request, Response>(req, res);
            await loggingout.logout()
            break;
        case 'update':
            const update = new Update<Request, Response>(req, res);
            await update.update()
            break;
        default:
            res.status(500).json({error: 'invalid params!'});
    }
});