import { allowedOrigins } from '../.././Web/Express';
import jwt from 'jsonwebtoken';
import { UserDB } from '../.././Database/UserDB';
import 'dotenv/config';
export class Login {
    req;
    res;
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    async login() {
        try {
            await UserDB.CLIENT.connect();
            const userData = {
                username: this.req.body.username,
                password: this.req.body.password
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
                const origins = (this.req.headers.origin);
                if (token && allowedOrigins.indexOf(origins) >= 0) {
                    this.res.setHeader("Access-Control-Allow-Origin", origins);
                    this.res.setHeader("Access-Control-Allow-Credentials", "true");
                    this.res.status(200).cookie("USER_AUTH", token, {
                        httpOnly: false,
                        secure: true,
                        maxAge: 1000 * 60 * 60 * 24 * 30,
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 20),
                        sameSite: 'none'
                    }).json({
                        status: 200,
                        message: "successfully login",
                        token
                    });
                }
                else {
                    throw new Error('origin or token is invalid!');
                }
            }
            else {
                throw new Error('username or password is incorrect!');
            }
        }
        catch (error) {
            if (error instanceof Error) {
                this.res.status(500).json({ error: error.message });
            }
        }
        finally {
            await UserDB.CLIENT.close();
        }
    }
}
