import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { UserRouter } from '.././Routers/UserRouters';
import { QuranRouter } from '.././Routers/QuranRouters';
export const web = express();
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:8080',
    'https://alquranqu.vercel.app',
    'https://alquranqu.my.id',
    'https://reqbin.com',
    'http://localhost:8158',
    'http://localhost:5173'
];
const options = {
    origin: allowedOrigins,
    credentials: true
};
web.use(cors(options));
web.use(cookieParser());
web.use(express.json());
web.use(express.urlencoded());
web.use((req, res, next) => {
    if (!req.headers.authorization)
        return res.status(403).json({
            message: 'authorization required!'
        });
    const authToken = req.headers.authorization;
    if (authToken !== process.env.SECRET) {
        return res.status(401).json({
            message: 'unauthorized!'
        });
    }
    next();
});
web.set('json spaces', 2);
web.get('/', (req, res) => {
    res.json({ status: true });
});
web.use(UserRouter);
web.use(QuranRouter);
web.use('/', (req, res) => {
    res.status(404).json({ status: 404, message: 'not found' });
});
