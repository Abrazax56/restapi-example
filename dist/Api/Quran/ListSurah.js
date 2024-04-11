import { ListSurahDB } from '../.././Database/ListSurahDB';
export class ListSurah {
    static async getList(req, res) {
        try {
            await ListSurahDB.CLIENT.connect();
            const data = await ListSurahDB.COLLECTION.find().toArray();
            const list = data.sort((a, b) => a.nomor - b.nomor);
            res.status(200).json(list);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
        finally {
            await ListSurahDB.CLIENT.close();
        }
    }
}
