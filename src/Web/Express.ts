import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRouter } from '.././Routers/UserRouters';
import { QuranRouter } from '.././Routers/QuranRouters';

export const web: Application = express();
const allowedOrigins: Array<string> = [
  'http://localhost:3000',
  'http://localhost:8080',
  'https://alquranqu.vercel.app',
  'https://alquranqu.my.id',
  'https://reqbin.com',
  'http://localhost:8158'
];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};
web.use(cors(options));
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