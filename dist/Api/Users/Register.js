import { ZodError } from "zod";
import { userSchema } from "../.././Validation/UserSchema";
import { UserDB } from '../.././Database/UserDB';
export class Register {
    req;
    res;
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    async register() {
        try {
            await UserDB.CLIENT.connect();
            const userData = {
                name: this.req.body.name,
                username: this.req.body.username,
                password: this.req.body.password,
                loggingin: false,
                recentread: false
            };
            const user = await UserDB.COLLECTION.findOne({ username: userData.username });
            const userValidation = userSchema.parse(userData);
            if (user !== null) {
                throw new Error('username is already exist!');
            }
            else if (user === null && userValidation === userData) {
                await UserDB.COLLECTION.insertOne(userValidation);
                this.res.status(200).json({ message: "Register successfully!" });
            }
        }
        catch (error) {
            if (error instanceof Error || error instanceof ZodError) {
                this.res.status(504).json({ error: error.message });
            }
        }
        finally {
            await UserDB.CLIENT.close();
        }
    }
}
