import express from 'express';
import { Quran } from '.././Api/Quran';
export const QuranRouter = express.Router();
QuranRouter.get('/surah', async (req, res) => {
    await Quran.getList(req, res);
});
QuranRouter.get('/surah/:id', async (req, res) => {
    await Quran.getDetail(req, res);
});
