import express, { Request, Response, NextFunction } from 'express';

export const UserRouter = express.Router();

UserRouter.get('/users', (req: Request, res: Response) => {
  res.json({status: true});
});