import { Request, Response } from 'express';
import { ZodError } from "zod";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

import { allowedOrigins } from '.././Web/Express';
import { UserDB } from '.././Database/UserDB';
import { userSchema } from ".././Validation/UserSchema";
import { AllUser, User, RecentRead } from '.././Types/Users';
import { HandleError } from '.././Error/ErrorHandling';
import 'dotenv/config';

export class Users {
    static async allUser(req: Request, res: Response): Promise<void> {
        try {
            await UserDB.CLIENT.connect();
            const users: AllUser = await UserDB.COLLECTION.find().toArray() as AllUser;
            res.status(200).json(users);
        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({error: error.message});
            }
        } finally {
            await UserDB.CLIENT.close();
        }
    }
    
    static async register(req: Request, res: Response): Promise<void> {
        try {
            await UserDB.CLIENT.connect();
            const userData: User = {
                name: req.body.name,
                username: req.body.username,
                password: req.body.password,
                loggingin: false,
                recentread: false
            }
            const user: User | null = await UserDB.COLLECTION.findOne({username: userData.username});
            const userValidation: User = userSchema.parse(userData);
            if(user !== null) {
                throw new HandleError<string, number>('username is already exist!', 422);
            } else if(user === null && userValidation === userData) {
                await UserDB.COLLECTION.insertOne(userValidation);
                res.status(200).json({message: "Register successfully!"});
            }
        } catch (error) {
            if(error instanceof HandleError) {
                res.status(error.codeStatus).json({error: error.message});
            } else if(error instanceof ZodError) {
                res.status(422).json({error: 'invalid input!'})
            } else {
                res.status(500).json({error: 'something went wrong!'});
            }
        } finally {
            await UserDB.CLIENT.close();
        }
    }
    
    static async login(req: Request, res: Response): Promise<void> {
        try {
            await UserDB.CLIENT.connect();
            const userData: User = {
                username: req.body.username,
                password: req.body.password
            };
            const user: User | null = await UserDB.COLLECTION.findOne({username: userData.username});
            if(user !== null && user.password === userData.password) {
                await UserDB.COLLECTION.updateOne(
                    {
                        username: userData.username
                    },
                    {
                        $set: {
                            loggingin: true
                        }
                    }
                )
                const userTokenData: User = {
                    name: user.name,
                    username: user.username,
                    password: user.password
                };
                const token: string = jwt.sign(userTokenData as object, (process.env.SECRET) as Secret, {expiresIn: '30d'});
                const origins: string = (req.headers.origin) as string;
                if(token && allowedOrigins.indexOf(origins) >= 0) {
                    res.setHeader("Access-Control-Allow-Origin", origins);
                    res.setHeader("Access-Control-Allow-Credentials", "true");
                    res.status(200).json({
                        status: 200,
                        message: "successfully login",
                        token
                    });
                } else {
                    throw new HandleError<string, number>('origin or token is invalid!', 422);
                }
            } else {
                throw new HandleError<string, number>('username or password is incorrect!', 422);
            }
        } catch (error) {
            if(error instanceof HandleError) {
                res.status(error.codeStatus).json({error: error.message});
            } else {
                res.status(500).json({error: 'something went wrong!'});
            }
        } finally {
            await UserDB.CLIENT.close();
        }
    }
    
    static async update(req: Request, res: Response): Promise<void> {
        try {
            await UserDB.CLIENT.connect();
            const userData: User = jwt.verify((req.headers.user_auth) as string, (process.env.SECRET) as Secret) as User;
            const user: User | null = await UserDB.COLLECTION.findOne({username: userData.username});
            if(user !== null && req.headers.user_auth) {
                const recentRead: RecentRead = {
                    nomor: req.body.nomor,
                    nama: req.body.nama,
                    nama_latin: req.body.nama_latin,
                    ayat: req.body.ayat
                };
                await UserDB.COLLECTION.updateOne(
                    {
                        username: userData.username
                    },
                    {
                        $set: {
                            recentread: recentRead
                        }
                    }
                );
                res.status(200).json({
                    status: 200,
                    message: 'update successfully'
                });
            } else {
                throw new HandleError<string, number>('user not found!', 404);
            }
        } catch (error) {
            if(error instanceof HandleError) {
                res.status(error.codeStatus).json({ error: error.message });
            } else {
                res.status(500).json({error: 'something went wrong!'});
            }
        } finally {
            await UserDB.CLIENT.close();
        }
    }
    
    static async logout(req: Request, res: Response): Promise<void> {
        try {
            await UserDB.CLIENT.connect();
            const userData: User = jwt.verify((req.headers.user_auth) as string, (process.env.SECRET) as Secret) as User;
            const user: User | null = await UserDB.COLLECTION.findOne({username: userData.username});
            if(user !== null && req.headers.user_auth) {
                await UserDB.COLLECTION.updateOne(
                    {
                        username: userData.username
                    },
                    {
                        $set: {
                            loggingin: false
                        }
                    }
                )
                res.status(200).json({
                    status: 200,
                    message: 'logout successfully'
                });
            } else {
                throw new HandleError<string, number>('user not found!', 404);
            }
        } catch (error) {
            if(error instanceof HandleError) {
                res.status(error.codeStatus).json({error: error.message});
            } else {
                res.status(500).json({error: 'something went wrong!'});
            }
        } finally {
            await UserDB.CLIENT.close();
        }
    }
    
    static async deletes(req: Request, res: Response): Promise<void> {
        try {
            await UserDB.CLIENT.connect();
            const userData: User = jwt.verify((req.headers.user_auth) as string, (process.env.SECRET) as Secret) as User;
            await UserDB.COLLECTION.deleteOne({username: userData.username});
            res.status(200).json({
                status: 200,
                message: 'user successfully deleted'
            });
        } catch (error) {
            if(error instanceof Error || error instanceof jwt.TokenExpiredError) {
                res.status(500).json({ error: error.message });
            }
        } finally {
            await UserDB.CLIENT.close();
        }
    }
}