import { TiktokDl } from '.././src/downloader/tiktok';

describe('Tiktok Downloader', function () {
  it('should work', async function () {
    const result = new TiktokDl<string>('https://vt.tiktok.com/ZSFxKVy28/');
    console.info(await result.download());
  });
});