import express from 'express';
import { ListSurah } from '.././Api/Quran/ListSurah';
import { DetailSurah } from '.././Api/Quran/DetailSurah';
export const QuranRouter = express.Router();
QuranRouter.get('/surah', async (req, res) => {
    try {
        const getList = await ListSurah.getList();
        res.json(getList);
    }
    catch (error) {
        res.json(error);
    }
});
QuranRouter.get('/surah/:id', async (req, res) => {
    try {
        const nomor = Number(req.params.id);
        const getDetail = await DetailSurah.getDetail(nomor);
        res.json(getDetail);
    }
    catch (error) {
        res.json(error);
    }
});
