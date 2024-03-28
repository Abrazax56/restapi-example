import { TiktokDl } from '.././src/downloader/tiktok';

describe('Tiktok Downloader', function () {
  it('should work', async function () {
    try {
      const result = new TiktokDl<string>('https://vt.tiktok.com/ZSFxKVy28/');
      console.info(await result.download());
    } catch (error) {
      if(error instanceof Error) {
        console.info(error.message)
      }
    }
  });
});