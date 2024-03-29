import { Database } from '.././database/mongo';

describe('Quran', function () {
  it('Should Work', async function () {
    try {
      await Database.CLIENT.connect();
      const list: any = await Database.LISTSURAH.find();
      const data = list.toArray((error: any, result: any): Array<any> => result);
      console.info(data);
    } catch (error) {
      console.info(error);
    } finally {
      await Database.CLIENT.close();
    }
  });
});