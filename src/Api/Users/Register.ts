import { UserDB } from '../.././Database/UserDB';
import { User } from '../.././Types/Users';

export class Register<Type extends User> {
  constructor(
    private userData: Type
  ) {}
  async register(): Promise<void>{
    try {
      await UserDB.CLIENT.connect();
      const user: User | null = await UserDB.COLLECTION.findOne({username: this.userData.username});
      if(user === null) {
        await UserDB.COLLECTION.insertOne(this.userData);
      }
    } catch (error) {
      if(error instanceof Error) {
        throw new Error(error.message);
      }
    } finally {
      await UserDB.CLIENT.close();
    }
  }
}