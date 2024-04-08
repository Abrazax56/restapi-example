import {ZodError} from "zod";
import { userSchema } from "../.././Validation/UserSchema";
import { UserDB } from '../.././Database/UserDB';
import { User } from '../.././Types/Users';

export class Register<Type extends User> {
  constructor(
    private userData: Type
  ) {}
  async register(): Promise<number | undefined>{
    try {
      await UserDB.CLIENT.connect();
      const user: User | null = await UserDB.COLLECTION.findOne({username: this.userData.username});
      const userValidation: User = userSchema.parse(this.userData);
      if(user === null) {
        await UserDB.COLLECTION.insertOne(userValidation);
        return 200;
      } else {
        return 500;
      }
    } catch (error) {
      if(error instanceof Error) {
        throw new Error(error.message);
        return 500;
      } else if(error instanceof ZodError) {
        throw new Error(error.message);
      }
    } finally {
      await UserDB.CLIENT.close();
    }
  }
}