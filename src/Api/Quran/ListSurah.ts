import { Request, Response } from 'express';
import { ListSurahDB } from '../.././Database/ListSurahDB';
import { DetailList, ListSurahs } from '../.././Types/ListSurah';

export class ListSurah {
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
}