import { Request, Response } from 'express';
import { ListSurahDB } from '.././Database/ListSurahDB';
import { DetailList, ListSurahs } from '.././Types/ListSurah';
import { DetailSurahDB } from '.././Database/DetailSurahDB';
import { DetailSurahs } from '.././Types/DetailSurah';

export class Quran {
    static async getList(req: Request, res: Response): Promise<void> {
        try {
            await ListSurahDB.CLIENT.connect();
            const data: ListSurahs[] = await ListSurahDB.COLLECTION.find().toArray() as ListSurahs[];
            const list: ListSurahs = data.sort((a: any, b: any) => a.nomor - b.nomor);
            res.status(200).json(list);
        } catch (error) {
            if(error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        } finally {
            await ListSurahDB.CLIENT.close();
        }
    }
    
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