import sign from 'jwt-encode';
import { UserDB } from '../.././Database/UserDB';
import { User, UserInfo } from '../.././Types/AllUsers';

export class LogInOutUser<Type extends UserInfo, L> {
  constructor(
    private userData: Type,
    private isLoggingIn: L
  ) {}
  async loginout(): Promise<void> {
    try {
      await UserDB.CLIENT.connect();
      const secret: string = 'secret';
      const user_token: string = sign(this.userData, secret);
      await UserDB.COLLECTION.updateOne(
        {
          user_token
        },
        {
          $set: {
            logingin: this.isLoggingIn
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