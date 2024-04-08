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
        res.status(200).json(data);
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
        const statuss = await register.register();
        if (statuss === 200) {
            res.status(200).json({
                message: "register successfully"
            });
        }
        else {
            res.status(statuss).json({ message: 'username is already exist' });
        }
    }
    catch (error) {
        res.status(500).json({ error });
    }
})
    .delete(async (req, res) => {
    try {
        if (req.cookies.USER_AUTH) {
            const userToken = (req.cookies.USER_AUTH);
            const deleteUser = new Delete(userToken);
            await deleteUser.deleteUser();
            return res.status(200).json({
                status: 200,
                message: 'user successfully deleted'
            });
        }
        res.status(401).json({ message: 'invalid token' });
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
                if (token) {
                    return res.status(200).cookie("USER_AUTH", token, {
                        httpOnly: false,
                        secure: true,
                        maxAge: 1000 * 60 * 60 * 24 * 30,
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 20)
                    }).json({
                        status: 200,
                        message: "successfully login",
                        token
                    });
                }
                res.status(401).json({ message: "invalid token" });
                break;
            case 'logout':
                if (req.cookies.USER_AUTH) {
                    const loggingout = new Logout((req.cookies.USER_AUTH));
                    await loggingout.logout();
                    return res.status(200).cookie("USER_AUTH", req.cookies.USER_AUTH, {
                        httpOnly: false,
                        secure: true,
                        maxAge: 100,
                        expires: new Date(Date.now() + 10)
                    }).json({
                        status: 200,
                        message: 'logout successfully'
                    });
                }
                res.status(401).json({ message: "invalid token" });
                break;
            case 'update':
                if (req.cookies.USER_AUTH) {
                    const update = new Update((req.cookies.USER_AUTH), {
                        nomor: req.body.nomor,
                        nama: req.body.nama,
                        nama_latin: req.body.nama_latin,
                        ayat: req.body.ayat
                    });
                    await update.update();
                    return res.status(200).json({
                        status: 200,
                        message: 'update successfully'
                    });
                }
                res.status(401).json({ message: "invalid token" });
                break;
        }
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
