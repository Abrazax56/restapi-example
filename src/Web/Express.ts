import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import jwt, { Secret } from 'jsonwebtoken';
import 'dotenv/config';
import { UserRouter } from '.././Routers/UserRouters';
import { QuranRouter } from '.././Routers/QuranRouters';
import { User } from '.././Types/Users';

export const web: Application = express();
const allowedOrigins: Array<string> = [
  'http://localhost:3000',
  'http://localhost:8080',
  'https://alquranqu.vercel.app',
  'https://alquranqu.my.id',
  'https://reqbin.com',
  'http://localhost:8158',
  'http://localhost:5173'
];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};
web.use(cors(options));
web.use(express.json());
web.use(express.urlencoded());

web.use((req: Request, res: Response, next: NextFunction) => {
  if(!req.headers.authorization) return res.json({
    status: 403,
    message: 'authorization required!'
  });
  const authToken: string = req.headers.authorization;
  const verify: User = jwt.verify(authToken, (process.env.SECRET) as Secret) as User;
  if(verify instanceof jwt.TokenExpiredError) {
    return res.json({
      status: 401,
      message: 'unauthorized!'
    })
  }
  next();
});
web.set('json spaces', 2);

web.get('/', (req: Request, res: Response) => {
  res.json({status: true});
});

web.use(UserRouter);
web.use(QuranRouter);

web.use('/', (req: Request, res: Response) => {
  res.status(404).json({status: 404, message: 'not found'});
});