import sign from 'jwt-encode';
import { UserDB } from '../.././Database/UserDB';
export class UpdateUser {
    latestUser;
    updatedUser;
    constructor(latestUser, updatedUser) {
        this.latestUser = latestUser;
        this.updatedUser = updatedUser;
    }
    async update() {
        try {
            await UserDB.CLIENT.connect();
            const secret = 'secret';
            const userLatest = sign(this.latestUser, secret);
            const userUpdated = sign(this.updatedUser, secret);
            await UserDB.COLLECTION.updateOne({
                user_token: userLatest
            }, {
                $set: {
                    user_token: userUpdated
                }
            });
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
        finally {
            await UserDB.CLIENT.close();
        }
    }
}
