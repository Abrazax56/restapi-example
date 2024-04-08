import { ZodError } from "zod";
import { userSchema } from "../.././Validation/UserSchema";
import { UserDB } from '../.././Database/UserDB';
export class Register {
    userData;
    constructor(userData) {
        this.userData = userData;
    }
    async register() {
        try {
            await UserDB.CLIENT.connect();
            const user = await UserDB.COLLECTION.findOne({ username: this.userData.username });
            const userValidation = userSchema.parse(this.userData);
            if (user === null) {
                await UserDB.COLLECTION.insertOne(userValidation);
                return 200;
            }
            else {
                return 500;
            }
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
                return 500;
            }
            else if (error instanceof ZodError) {
                throw new Error(error.message);
            }
        }
        finally {
            await UserDB.CLIENT.close();
        }
    }
}
