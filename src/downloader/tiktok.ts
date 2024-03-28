import { Tiktok } from '../.././types/downloader/tiktok';

export class TiktokDl<Type> {
  constructor(public url: Type) {}
  
  async download(): Promise<Tiktok> {
    return await fetch('https://tikdldtapi.vercel.app/download/json?url=' + this.url)
    .then(respons => respons.json())
    .then(respons => respons)
    .catch(error => {
      throw new Error(error);
    });
  }
}