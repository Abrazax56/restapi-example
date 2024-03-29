import { MongoClient } from 'mongodb';
import 'dotenv/config';
const uri = process.env.MONGO_CONNECT;
const client = new MongoClient(uri);
export class Database {
    static CLIENT = client;
    static LISTSURAH = client.db('quran').collection('listsurah');
    static USERS = client.db('quran').collection('users');
}
