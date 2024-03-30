import express from 'express';
import { GetAllUsers } from '.././Api/Users/GetAllUsers';
import { GetUser } from '.././Api/Users/GetUser';
import { AddUser } from '.././Api/Users/AddUser';
import { DeleteUser } from '.././Api/Users/DeleteUser';
import { UpdateUser } from '.././Api/Users/UpdateUser';
import { LogInOutUser } from '.././Api/Users/LogInOutUser';
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
    .get(async (req, res) => {
    try {
        const user = new GetUser(req.query.user_token);
        const getUser = await user.user();
        res.json(getUser);
    }
    catch (error) {
        res.json({ status: 404, message: 'not found' });
    }
})
    .post(async (req, res) => {
    try {
        const addUser = new AddUser({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        });
        await addUser.user();
        res.json({ status: 'success' });
    }
    catch (error) {
        res.json({ status: 500 });
    }
})
    .delete(async (req, res) => {
    try {
        const deleteUser = new DeleteUser(req.query.user_token);
        await deleteUser.user();
        res.json({ status: "success" });
    }
    catch (error) {
        res.json(error);
    }
});
UserRouter.put('/user/:loginout', async (req, res) => {
    try {
        const userData = (req.body.userData);
        switch (req.params.loginout) {
            case 'login':
                const loginUser = new LogInOutUser(userData, true);
                await loginUser.loginout();
                res.json({ status: 'success' });
                break;
            case 'logout':
                const logoutUser = new LogInOutUser(userData, false);
                await logoutUser.loginout();
                res.json({ status: 'success' });
                break;
            case 'update':
                const updatedUser = (req.body.updatedUser);
                const updateUser = new UpdateUser(userData, updatedUser);
                await updateUser.update();
                res.json({ status: 'success' });
                break;
        }
    }
    catch (error) {
        res.json(error);
    }
});
