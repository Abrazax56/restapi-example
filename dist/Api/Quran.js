import { ListSurahDB } from '.././Database/ListSurahDB';
import { DetailSurahDB } from '.././Database/DetailSurahDB';
export class Quran {
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
    static async getDetail(req, res) {
        try {
            await DetailSurahDB.CLIENT.connect();
            const nomor = Number(req.params.id);
            if (nomor > 0 && nomor <= 114) {
                const data = await DetailSurahDB.COLLECTION.findOne({ nomor });
                const data2 = await DetailSurahDB.COLLECTION2.findOne({ id: nomor });
                data2?.ayat?.forEach((item, index) => {
                    data.ayat[index].ar = item?.arabic;
                    data.ayat = data.ayat;
                });
                res.status(200).json(data);
            }
            else {
                throw new Error('Data not found!');
            }
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(404).json(error.message);
            }
        }
        finally {
            await DetailSurahDB.CLIENT.close();
        }
    }
}
