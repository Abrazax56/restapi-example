import sign from 'jwt-encode';
import { UserDB } from '../.././Database/UserDB';
import { User, UserInfo } from '../.././Types/AllUsers';

export class AddUser<Type extends UserInfo> {
  constructor(
    private newUser: Type
  ) {}
  async user(): Promise<void> {
    try {
      await UserDB.CLIENT.connect();
      const secret: string = 'secret';
      const user_token: string = sign(this.newUser, secret);
      const isuser: User = {
        user_token,
        logingin: false
      } as User;
      await UserDB.COLLECTION.insertOne(isuser);
    } catch(error) {
      if(error instanceof Error) {
        throw new Error(error.message);
      }
    } finally {
      await UserDB.CLIENT.close();
    }
  }
}