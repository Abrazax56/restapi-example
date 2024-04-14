import { ZodError } from "zod";
import jwt from 'jsonwebtoken';
import { allowedOrigins } from '.././Web/Express';
import { UserDB } from '.././Database/UserDB';
import { userSchema } from ".././Validation/UserSchema";
import { HandleError } from '.././Error/ErrorHandling';
import 'dotenv/config';
export class Users {
    static async allUser(req, res) {
        try {
            await UserDB.CLIENT.connect();
            const users = await UserDB.COLLECTION.find().toArray();
            res.status(200).json(users);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
        finally {
            await UserDB.CLIENT.close();
        }
    }
    static async register(req, res) {
        try {
            await UserDB.CLIENT.connect();
            const userData = {
                name: req.body.name,
                username: req.body.username,
                password: req.body.password,
                loggingin: false,
                recentread: false
            };
            const user = await UserDB.COLLECTION.findOne({ username: userData.username });
            const userValidation = userSchema.parse(userData);
            if (user !== null) {
                throw new HandleError('username is already exist!', 422);
            }
            else if (user === null && userValidation === userData) {
                await UserDB.COLLECTION.insertOne(userValidation);
                res.status(200).json({ message: "Register successfully!" });
            }
        }
        catch (error) {
            if (error instanceof HandleError) {
                res.status(error.codeStatus).json({ error: error.message });
            }
            else if (error instanceof ZodError) {
                res.status(422).json({ error: 'invalid input!' });
            }
            else {
                res.status(500).json({ error: 'something went wrong!' });
            }
        }
        finally {
            await UserDB.CLIENT.close();
        }
    }
    static async login(req, res) {
        try {
            await UserDB.CLIENT.connect();
            const userData = {
                username: req.body.username,
                password: req.body.password
            };
            const user = await UserDB.COLLECTION.findOne({ username: userData.username });
            if (user !== null && user.password === userData.password) {
                await UserDB.COLLECTION.updateOne({
                    username: userData.username
                }, {
                    $set: {
                        loggingin: true
                    }
                });
                const userTokenData = {
                    name: user.name,
                    username: user.username,
                    password: user.password
                };
                const token = jwt.sign(userTokenData, (process.env.SECRET), { expiresIn: '30d' });
                const origins = (req.headers.origin);
                if (token && allowedOrigins.indexOf(origins) >= 0) {
                    res.setHeader("Access-Control-Allow-Origin", origins);
                    res.setHeader("Access-Control-Allow-Credentials", "true");
                    res.status(200).json({
                        status: 200,
                        message: "successfully login",
                        token
                    });
                }
                else {
                    throw new HandleError('origin or token is invalid!', 422);
                }
            }
            else {
                throw new HandleError('username or password is incorrect!', 422);
            }
        }
        catch (error) {
            if (error instanceof HandleError) {
                res.status(error.codeStatus).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'something went wrong!' });
            }
        }
        finally {
            await UserDB.CLIENT.close();
        }
    }
    static async update(req, res) {
        try {
            await UserDB.CLIENT.connect();
            const userData = jwt.verify((req.headers.user_auth), (process.env.SECRET));
            const user = await UserDB.COLLECTION.findOne({ username: userData.username });
            if (user !== null && req.headers.user_auth) {
                const recentRead = {
                    nomor: req.body.nomor,
                    nama: req.body.nama,
                    nama_latin: req.body.nama_latin,
                    ayat: req.body.ayat
                };
                await UserDB.COLLECTION.updateOne({
                    username: userData.username
                }, {
                    $set: {
                        recentread: recentRead
                    }
                });
                res.status(200).json({
                    status: 200,
                    message: 'update successfully'
                });
            }
            else {
                throw new HandleError('user not found!', 404);
            }
        }
        catch (error) {
            if (error instanceof HandleError) {
                res.status(error.codeStatus).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'something went wrong!' });
            }
        }
        finally {
            await UserDB.CLIENT.close();
        }
    }
    static async logout(req, res) {
        try {
            await UserDB.CLIENT.connect();
            const userData = jwt.verify((req.headers.user_auth), (process.env.SECRET));
            const user = await UserDB.COLLECTION.findOne({ username: userData.username });
            if (user !== null && req.headers.user_auth) {
                await UserDB.COLLECTION.updateOne({
                    username: userData.username
                }, {
                    $set: {
                        loggingin: false
                    }
                });
                res.status(200).json({
                    status: 200,
                    message: 'logout successfully'
                });
            }
            else {
                throw new HandleError('user not found!', 404);
            }
        }
        catch (error) {
            if (error instanceof HandleError) {
                res.status(error.codeStatus).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'something went wrong!' });
            }
        }
        finally {
            await UserDB.CLIENT.close();
        }
    }
    static async deletes(req, res) {
        try {
            await UserDB.CLIENT.connect();
            const userData = jwt.verify((req.headers.user_auth), (process.env.SECRET));
            await UserDB.COLLECTION.deleteOne({ username: userData.username });
            res.status(200).json({
                status: 200,
                message: 'user successfully deleted'
            });
        }
        catch (error) {
            if (error instanceof Error || error instanceof jwt.TokenExpiredError) {
                res.status(500).json({ error: error.message });
            }
        }
        finally {
            await UserDB.CLIENT.close();
        }
    }
}
