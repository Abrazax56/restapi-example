import { MongoClient } from 'mongodb';
import { Uri } from '.././Types/Uri';
import 'dotenv/config';

const uri: Uri = (process.env.MONGO_CONNECT) as Uri;
const client: MongoClient = new MongoClient(uri);

export class DetailSurahDB {
    static CLIENT: MongoClient = client;
    static COLLECTION = client.db('quran').collection('detailsurah');
}