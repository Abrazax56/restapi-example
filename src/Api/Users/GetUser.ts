import { UserDB } from '../.././Database/UserDB';
import { User } from '../.././Types/AllUsers';

export class GetUser<Type> {
  constructor(
    public user_token: Type
  ) {}
  async user(): Promise<User> {
    try {
      await UserDB.CLIENT.connect();
      const isuser: User = await UserDB.COLLECTION.findOne({
        user_token: this.user_token
      }) as User;
      return isuser;
    } catch (error) {
      if(error instanceof Error) {
        throw new Error(error.message);
      }
      return error as User;
    } finally {
      await UserDB.CLIENT.close();
    }
  }
}