import { UserDB } from '../.././Database/UserDB';

export class DeleteUser<Type> {
  constructor(
    private user_token: Type
  ) {}
  async user(): Promise<void> {
    try {
      await UserDB.CLIENT.connect();
      await UserDB.COLLECTION.deleteOne({user_token: this.user_token});
    } catch (error) {
      if(error instanceof Error) {
        throw new Error(error.message);
      }
    } finally {
      await UserDB.CLIENT.close();
    }
  }
}