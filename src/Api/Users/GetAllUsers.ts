import { UserDB } from '../.././Database/UserDB';
import { AllUser } from '../.././Types/AllUsers';

export class GetAllUsers {
  static async USERS(): Promise<AllUser> {
    try {
      await UserDB.CLIENT.connect();
      const users: AllUser = await UserDB.COLLECTION.find().toArray() as AllUser;
      return users;
    } catch (error) {
      if(error instanceof Error) {
        throw new Error(error.message);
      }
      return error as AllUser;
    } finally {
      await UserDB.CLIENT.close();
    }
  }
}