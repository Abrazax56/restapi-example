import express, { Request, Response, NextFunction } from 'express';
import { ListSurah } from '.././Api/Quran/ListSurah';
import { DetailSurah } from '.././Api/Quran/DetailSurah';

export const QuranRouter = express.Router();

QuranRouter.get('/surah', async(req: Request, res: Response) => {
    await ListSurah.getList(req, res);
});

QuranRouter.get('/surah/:id', async(req: Request, res: Response) => {
    await DetailSurah.getDetail(req, res);
});