import { TiktokDl } from '.././src/downloader/tiktok';
describe('Tiktok Downloader', function () {
    it('should work', async function () {
        const result = new TiktokDl('https://vt.tiktok.com/ZSFxKVy28/');
        console.info(await result.download());
    });
});
