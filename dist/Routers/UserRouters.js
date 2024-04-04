import express from 'express';
import { GetAllUsers } from '.././Api/Users/GetAllUsers';
import { Register } from '.././Api/Users/Register';
import { Delete } from '.././Api/Users/Delete';
import { Login } from '.././Api/Users/Login';
export const UserRouter = express.Router();
UserRouter.get('/users', async (req, res) => {
    try {
        const data = await GetAllUsers.USERS();
        res.json(data);
    }
    catch (error) {
        res.json(error);
    }
});
UserRouter.route('/user')
    .post(async (req, res) => {
    try {
        const userData = {
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            loggingin: false,
            recentread: false
        };
        const register = new Register(userData);
        await register.register();
        res.json({
            status: 200,
            message: "register successfully"
        });
    }
    catch (error) {
        res.json(error);
    }
})
    .delete(async (req, res) => {
    try {
        const userToken = (req.query.token);
        const deleteUser = new Delete(userToken);
        await deleteUser.deleteUser();
        res.json({
            status: 200,
            message: 'user successfully deleted'
        });
    }
    catch (error) {
        res.json(error);
    }
});
UserRouter.put('/user/:options', async (req, res) => {
    switch (req.params.options) {
        case 'login':
            const loggingin = new Login({
                username: req.body.username,
                password: req.body.password
            });
            const token = await loggingin.login();
            res.json({
                status: 200,
                message: "successfully login",
                token,
            });
            break;
        case 'logout':
            res.json({ status: 404 });
            break;
        case 'update':
            res.json({ status: 404 });
            break;
    }
});
