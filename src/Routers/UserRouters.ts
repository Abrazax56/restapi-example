import express, { Request, Response, NextFunction } from 'express';
import { Users } from '.././Api/User';

export const UserRouter = express.Router();

UserRouter.get('/users', async(req: Request, res: Response) => {
    await Users.allUser(req, res);
});

UserRouter.route('/user')
.post(async(req: Request, res: Response) => {
    await Users.register(req, res);
})
.delete(async(req: Request, res: Response) => {
    await Users.deletes(req, res);
});

UserRouter.put('/user/:options', async(req: Request, res: Response) => {
    switch (req.params.options) {
        case 'login':
            await Users.login(req, res)
            break;
        case 'logout':
            await Users.logout(req, res)
            break;
        case 'update':
            await Users.update(req, res)
            break;
        default:
            res.status(500).json({error: 'invalid params!'});
    }
});