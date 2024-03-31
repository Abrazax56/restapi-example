import { ListSurahDB } from '../.././Database/ListSurahDB';
export class ListSurah {
    static async getList() {
        try {
            await ListSurahDB.CLIENT.connect();
            const data = await ListSurahDB.COLLECTION.find().toArray();
            return data.sort((a, b) => a.nomor - b.nomor);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            return error;
        }
        finally {
            await ListSurahDB.CLIENT.close();
        }
    }
}
