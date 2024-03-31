import { DetailSurahDB } from '../.././Database/DetailSurahDB';
import { DetailSurahs } from '../.././Types/DetailSurah';

export class DetailSurah {
  static async getDetail(nomor: number): Promise<DetailSurahs> {
    try {
      await DetailSurahDB.CLIENT.connect();
      const data: DetailSurahs = await DetailSurahDB.COLLECTION.findOne({nomor}) as DetailSurahs;
      return data;
    } catch (error) {
      if(error instanceof Error) {
        throw new Error(error.message);
      }
      return error as DetailSurahs;
    } finally {
      await DetailSurahDB.CLIENT.close();
    }
  }
}