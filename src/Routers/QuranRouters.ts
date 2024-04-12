import express, { Request, Response, NextFunction } from 'express';
import { Quran } from '.././Api/Quran';

export const QuranRouter = express.Router();

QuranRouter.get('/surah', async(req: Request, res: Response) => {
    await Quran.getList(req, res);
});

QuranRouter.get('/surah/:id', async(req: Request, res: Response) => {
    await Quran.getDetail(req, res);
});