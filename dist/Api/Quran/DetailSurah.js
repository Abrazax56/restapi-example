import { DetailSurahDB } from '../.././Database/DetailSurahDB';
export class DetailSurah {
    static async getDetail(nomor) {
        try {
            await DetailSurahDB.CLIENT.connect();
            const data = await DetailSurahDB.COLLECTION.findOne({ nomor });
            return data;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            return error;
        }
        finally {
            await DetailSurahDB.CLIENT.close();
        }
    }
}
