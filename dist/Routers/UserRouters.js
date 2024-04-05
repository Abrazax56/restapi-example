import express from 'express';
import { GetAllUsers } from '.././Api/Users/GetAllUsers';
import { Register } from '.././Api/Users/Register';
import { Delete } from '.././Api/Users/Delete';
import { Login } from '.././Api/Users/Login';
import { Logout } from '.././Api/Users/Logout';
import { Update } from '.././Api/Users/Update';
export const UserRouter = express.Router();
UserRouter.get('/users', async (req, res) => {
    try {
        const data = await GetAllUsers.USERS();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error });
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
        res.status(500).json({ error });
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
        res.status(500).json({ error });
    }
});
UserRouter.put('/user/:options', async (req, res) => {
    try {
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
                const loggingout = new Logout(req.body.token);
                await loggingout.logout();
                res.json({
                    status: 200,
                    message: 'logout successfully'
                });
                break;
            case 'update':
                const update = new Update(req.body.token, {
                    nomor: req.body.nomor,
                    nama: req.body.nama,
                    nama_latin: req.body.nama_latin,
                    ayat: req.body.ayat
                });
                await update.update();
                res.json({
                    status: 200,
                    message: 'update successfully'
                });
                break;
        }
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
