import { DetailSurahDB } from '../.././Database/DetailSurahDB';
export class DetailSurah {
    static async getDetail(req, res) {
        try {
            await DetailSurahDB.CLIENT.connect();
            const nomor = Number(req.params.id);
            if (nomor > 0 && nomor <= 114) {
                const data = await DetailSurahDB.COLLECTION.findOne({ nomor });
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
