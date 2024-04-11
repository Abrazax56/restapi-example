import { Request, Response } from 'express';
import { DetailSurahDB } from '../.././Database/DetailSurahDB';
import { DetailSurahs } from '../.././Types/DetailSurah';

export class DetailSurah {
    static async getDetail(req: Request, res: Response): Promise<void> {
        try {
            await DetailSurahDB.CLIENT.connect();
            const nomor: number = Number(req.params.id);
            if(nomor > 0 && nomor <= 114) {
                const data: DetailSurahs = await DetailSurahDB.COLLECTION.findOne({nomor}) as DetailSurahs;
                res.status(200).json(data);
            } else {
                throw new Error('Data not found!');
            }
        } catch (error) {
            if(error instanceof Error) {
                res.status(404).json(error.message);
            }
        } finally {
            await DetailSurahDB.CLIENT.close();
        }
    }
}