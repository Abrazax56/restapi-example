import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { UserDB } from '../.././Database/UserDB';
import { User, RecentRead } from '../.././Types/Users';
import 'dotenv/config';

export class Update<Type extends string, R> {
  constructor(
    private userToken: Type,
    private recentRead: R
  ) {}
  
  async update(): Promise<void>{
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
              recentread: this.recentRead
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