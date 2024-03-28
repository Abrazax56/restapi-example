export class TiktokDl {
    url;
    constructor(url) {
        this.url = url;
    }
    async download() {
        return await fetch('https://tikdldtapi.vercel.app/download/json?url=' + this.url)
            .then(respons => respons.json())
            .then(respons => respons)
            .catch(error => {
            throw new Error(error);
        });
    }
}
