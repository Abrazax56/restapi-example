import { ListSurahDB } from '../.././Database/ListSurahDB';
import { ListSurahs } from '../.././Types/ListSurah';

export class ListSurah {
  static async getList(): Promise<ListSurahs> {
    try {
      await ListSurahDB.CLIENT.connect();
      const data: ListSurahs = await ListSurahDB.COLLECTION.find().toArray() as ListSurahs;
      return data;
    } catch (error) {
      if(error instanceof Error) {
        throw new Error(error.message);
      }
      return error as ListSurahs;
    } finally {
      await ListSurahDB.CLIENT.close();
    }
  }
}