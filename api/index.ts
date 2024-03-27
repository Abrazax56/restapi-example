import express, { Application, Request, Response, NextFunction } from "express";
import cors from 'cors';
import { Person } from '.././types/person';
import { Persons } from '.././class/Person';
import 'dotenv/config';

const app: Application = express();
const port: number = process.env.PORT || 8080;

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.json({status: true});
});

app.listen(port, '0.0.0.0', () => {
  console.info('app is listening...');
})