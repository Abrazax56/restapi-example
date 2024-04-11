import express from 'express';
import { ListSurah } from '.././Api/Quran/ListSurah';
import { DetailSurah } from '.././Api/Quran/DetailSurah';
export const QuranRouter = express.Router();
QuranRouter.get('/surah', async (req, res) => {
    await ListSurah.getList(req, res);
});
QuranRouter.get('/surah/:id', async (req, res) => {
    await DetailSurah.getDetail(req, res);
});
