import { UserDB } from '../.././Database/UserDB';
import { User } from '../.././Types/Users';
import jwt, { Secret } from 'jsonwebtoken';
import 'dotenv/config';

export class Delete<Type extends string> {
  constructor(
    private userToken: Type
  ) {}
  async deleteUser(): Promise<void>{
    try {
      await UserDB.CLIENT.connect();
      const userData: User = jwt.verify(this.userToken, (process.env.SECRET) as Secret) as User;
      await UserDB.COLLECTION.deleteOne({username: userData.username});
    } catch (error) {
      if(error instanceof Error || error instanceof jwt.TokenExpiredError) {
        throw new Error(error.message);
      }
    } finally {
      await UserDB.CLIENT.close();
    }
  }
}