import { Database } from '.././database/mongo';
describe('Quran', function () {
    it('Should Work', async function () {
        try {
            await Database.CLIENT.connect();
            const list = await Database.LISTSURAH.find();
            const data = list.toArray((error, result) => result);
            console.info(data);
        }
        catch (error) {
            console.info(error);
        }
        finally {
            await Database.CLIENT.close();
        }
    });
});
