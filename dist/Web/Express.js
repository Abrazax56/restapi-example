import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { UserRouter } from '.././Routers/UserRouters';
import { QuranRouter } from '.././Routers/QuranRouters';
export const web = express();
export const allowedOrigins = [
    'https://alquranqu.vercel.app',
    'https://alquran-kareem.my.id',
    'https://www.alquran-kareem.my.id'
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
    res.status(200).json({ status: true });
});
web.use(UserRouter);
web.use(QuranRouter);
web.use('/', (req, res) => {
    res.status(404).json({ status: 404, message: 'not found' });
});
