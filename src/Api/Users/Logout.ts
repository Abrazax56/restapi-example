import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { UserDB } from '../.././Database/UserDB';
import { User } from '../.././Types/Users';
import 'dotenv/config';

export class Logout<Type extends string> {
  constructor(
    private userToken: Type
  ) {}
  
  async logout(): Promise<void>{
    try {
      await UserDB.CLIENT.connect();
      const userData: User = jwt.verify(this.userToken, (process.env.SECRET) as Secret) as User;
      const user: User | null = await UserDB.COLLECTION.findOne({username: userData.username});
      if(user !== null) {
        await UserDB.COLLECTION.updateOne(
          {
            username: userData.username
          },
          {
            $set: {
              loggingin: false
            }
          }
        )
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