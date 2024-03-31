import { MongoClient } from 'mongodb';
import 'dotenv/config';
const uri = (process.env.MONGO_CONNECT);
const client = new MongoClient(uri);
export class DetailSurahDB {
    static CLIENT = client;
    static COLLECTION = client.db('quran').collection('detailsurah');
}
