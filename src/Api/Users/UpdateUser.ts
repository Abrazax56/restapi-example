import sign from 'jwt-encode';
import { UserDB } from '../.././Database/UserDB';
import { User, UserInfo } from '../.././Types/AllUsers';

export class UpdateUser<Type extends UserInfo> {
  constructor(
    private latestUser: Type,
    private updatedUser: Type
  ) {}
  async update(): Promise<void> {
    try {
      await UserDB.CLIENT.connect();
      const secret: string = 'secret';
      const userLatest: string = sign(this.latestUser, secret);
      const userUpdated: string = sign(this.updatedUser, secret);
      await UserDB.COLLECTION.updateOne(
        {
          user_token: userLatest
        },
        {
          $set: {
            user_token: userUpdated
          }
        }
      );
    } catch(error) {
      if(error instanceof Error) {
        throw new Error(error.message);
      }
    } finally {
      await UserDB.CLIENT.close();
    }
  }
}