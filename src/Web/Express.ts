import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRouter } from '.././Routers/UserRouters';
import { QuranRouter } from '.././Routers/QuranRouters';

export const web: Application = express();
web.use(cors());
web.use(express.json());
web.use(express.urlencoded());
web.set('json spaces', 2);

web.get('/', (req: Request, res: Response) => {
  res.json({status: true});
});

web.use(UserRouter);
web.use(QuranRouter);

web.use('/', (req: Request, res: Response) => {
  res.status(404).json({status: 404, message: 'not found'});
});