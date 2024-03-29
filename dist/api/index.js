import express from "express";
import cors from 'cors';
import { Persons } from '.././src/Person';
import { TiktokDl } from '.././src/downloader/tiktok';
import { Database } from '.././database/mongo';
import 'dotenv/config';
const app = express();
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.set('json spaces', 2);
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
    try {
        const result = new TiktokDl(url);
        res.json(await result.download());
    }
    catch (error) {
        if (error instanceof Error) {
            res.json({ error: error.message });
        }
    }
});
app.get('/quran/:opsi', async (req, res) => {
    const parameters = req.params.opsi || undefined;
    if (!parameters)
        return res.json({ error: "undefined params" });
    try {
        switch (parameters) {
            case 'listsurah':
                await Database.CLIENT.connect();
                const list = await Database.LISTSURAH.find().toArray((error, result) => result);
                res.json(list);
                break;
            default:
                res.json({ error: 'invalid params' });
                break;
        }
    }
    catch (error) {
        res.json({ error });
    }
    finally {
        await Database.CLIENT.close();
    }
});
app.listen(port, '0.0.0.0', () => {
    console.info('app is listening...');
});
