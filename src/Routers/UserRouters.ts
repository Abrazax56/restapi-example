import express, { Request, Response, NextFunction } from 'express';
import { UserDB } from '.././Database/UserDB';
import { AllUser } from '.././Types/AllUsers';

export const UserRouter = express.Router();

UserRouter.get('/users', async(req: Request, res: Response) => {
  try {
    await UserDB.CLIENT.connect();
    const data: AllUser = await UserDB.COLLECTION.find().toArray() as AllUser;
    res.json(data);
  } catch (error) {
    res.json(error);
  } finally {
    await UserDB.CLIENT.close();
  }
});