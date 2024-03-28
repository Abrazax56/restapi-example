import express from "express";
import cors from 'cors';
import { Persons } from '.././src/Person';
import { TiktokDl } from '.././src/downloader/tiktok';
import 'dotenv/config';
const app = express();
const port = process.env.PORT || 8080;
app.use(cors());
app.get('/', (req, res) => {
    const persons = new Persons({
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
app.get('/tiktokdl', async (req, res) => {
    const url = req.query.url || '';
    if (!url)
        return res.json({ error: 'invalid url' });
    const result = new TiktokDl(url);
    res.json(await result.download());
});
app.listen(port, '0.0.0.0', () => {
    console.info('app is listening...');
});
