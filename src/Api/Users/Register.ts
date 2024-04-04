import { UserDB } from '../.././Database/UserDB';
import { User } from '../.././Types/Users';

export class Register<Type extends User> {
  constructor(
    private userData: Type
  ) {}
  async register(): Promise<void>{
    try {
      await UserDB.CLIENT.connect();
      await UserDB.COLLECTION.insertOne(this.userData);
    } catch (error) {
      if(error instanceof Error) {
        throw new Error(error.message);
      }
    } finally {
      await UserDB.CLIENT.close();
    }
  }
}