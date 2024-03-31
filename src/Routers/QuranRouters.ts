import express, { Request, Response, NextFunction } from 'express';
import { ListSurahs } from '.././Types/ListSurah';
import { DetailSurahs } from '.././Types/DetailSurah';
import { ListSurah } from '.././Api/Quran/ListSurah';
import { DetailSurah } from '.././Api/Quran/DetailSurah';

export const QuranRouter = express.Router();

QuranRouter.get('/surah', async(req: Request, res: Response) => {
  try {
    const getList: ListSurahs = await ListSurah.getList();
    res.json(getList);
  } catch (error) {
    res.json(error);
  }
});

QuranRouter.get('/surah/:id', async(req: Request, res: Response) => {
  try {
    const nomor: number = Number(req.params.id);
    const getDetail: DetailSurahs = await DetailSurah.getDetail(nomor);
    res.json(getDetail);
  } catch (error) {
    res.json(error);
  }
});