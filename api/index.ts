import express, { Application, Request, Response, NextFunction } from "express";
import cors from 'cors';
import { Person } from '.././types/person';
import { Persons } from '.././class/Person';

const app: Application = express();
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

app.listen(8080, () => {
  console.info('app is listening...');
})