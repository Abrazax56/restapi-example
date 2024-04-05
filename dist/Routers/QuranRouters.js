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
        res.status(500).json(error);
    }
});
QuranRouter.get('/surah/:id', async (req, res) => {
    try {
        const nomor = Number(req.params.id);
        if (nomor > 0 && nomor <= 114) {
            const getDetail = await DetailSurah.getDetail(nomor);
            return res.json(getDetail);
        }
        res.json({ status: null, message: "invalid params" });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
