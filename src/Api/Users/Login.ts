import jwt, { Secret } from 'jsonwebtoken';
import { UserDB } from '../.././Database/UserDB';
import { User } from '../.././Types/Users';
import 'dotenv/config';

export class Login<Type extends User> {
  constructor(
    private userData: Type
  ) {}
  
  async login(): Promise<string | undefined>{
    try {
      await UserDB.CLIENT.connect();
      const user: User | null = await UserDB.COLLECTION.findOne({username: this.userData.username});
      if(user !== null) {
        await UserDB.COLLECTION.updateOne(
          {
            username: this.userData.username
          },
          {
            $set: {
              loggingin: true
            }
          }
        )
        const userTokenData: User = {
          name: user.name,
          username: user.username,
          password: user.password
        }
        return jwt.sign(userTokenData as object, (process.env.SECRET) as Secret, {expiresIn: '30d'});
      }
    } catch (error) {
      if(error instanceof Error) {
        throw new Error(error.message);
        return error as string;
      }
    } finally {
      await UserDB.CLIENT.close();
    }
  }
}