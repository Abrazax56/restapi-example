import express, { Application, Request, Response, NextFunction } from "express";
import cors from 'cors';
import { Person } from '.././types/person';
import { Persons } from '.././src/Person';
import { TiktokDl } from '.././src/downloader/tiktok';
import 'dotenv/config';

const app: Application = express();
const port: any = process.env.PORT || 8080;

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  const persons = new Persons<Person>({
    name: "Ahmad",
    birth: "23 july 2005",
    address: {
      street: "jln karimun",
      city: "Cilacap"
    },
    educations: [
      {
        name: "SMK Darul Ulum",
        level: "Vacation High school",
        address: "Sidareja",
        year: "2020-2023"
      }
    ],
    hobbies: [
      "coding",
      "drawing"
    ]
  });
  res.json(persons.person);
});

app.get('/tiktokdl', async(req: Request, res: Response) => {
  const url: any = req.query.url || '';
  if (!url) return res.json({error: 'invalid url'});
  
  const result = new TiktokDl<string>(url);
  res.json(await result.download());
})

app.listen(port, '0.0.0.0', (): void => {
  console.info('app is listening...');
})