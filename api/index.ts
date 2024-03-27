import express, { Application, Request, Response, NextFunction } from "express";
import cors from 'cors';
import { Person } from '.././types/person';
import { Persons } from '.././class/Person';

const app: Application = express();
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.json({status: true});
});

app.listen(8080, () => {
  console.info('app is listening...');
})