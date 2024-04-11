import express from 'express';
import { GetAllUsers } from '.././Api/Users/GetAllUsers';
import { Register } from '.././Api/Users/Register';
import { Delete } from '.././Api/Users/Delete';
import { Login } from '.././Api/Users/Login';
import { Logout } from '.././Api/Users/Logout';
import { Update } from '.././Api/Users/Update';
export const UserRouter = express.Router();
UserRouter.get('/users', async (req, res) => {
    const allUser = new GetAllUsers(req, res);
    await allUser.getAllUser();
});
UserRouter.route('/user')
    .post(async (req, res) => {
    const register = new Register(req, res);
    await register.register();
})
    .delete(async (req, res) => {
    const deleteUser = new Delete(req, res);
    await deleteUser.deleteUser();
});
UserRouter.put('/user/:options', async (req, res) => {
    switch (req.params.options) {
        case 'login':
            const loggingin = new Login(req, res);
            await loggingin.login();
            break;
        case 'logout':
            const loggingout = new Logout(req, res);
            await loggingout.logout();
            break;
        case 'update':
            const update = new Update(req, res);
            await update.update();
            break;
        default:
            res.status(500).json({ error: 'invalid params!' });
    }
});
