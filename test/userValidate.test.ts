import {RefinementCtx, z, ZodError} from "zod";
import {User} from '.././src/Types/Users';

describe('Username Validate', () => {
  it('should validate using zod', async() => {
    function mustNotSpace(data: string, ctx: RefinementCtx): string {
      if(data.replace(/\s/g, "") !== data) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "username must no space"
        })
        return z.NEVER;
      } else {
        return data;
      }
    }
    function mustNoOnlySpace(data: string, ctx: RefinementCtx): string {
     if(data.replace(/\s/g, "") === "") {
       ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "username must no only space"
        })
        return z.NEVER;
     } else {
       return data;
     }
    }
    const userData: User = {
      name: "      ",
      username: "benirusli",
      password: "beni2188",
      loggingin: false,
      recentread: false
    };
    const userSchema = z.object({
      name: z.string().min(4).max(25).transform(mustNoOnlySpace),
      username: z.string().min(4).max(25).transform(mustNotSpace),
      password: z.string().min(8).max(16),
      loggingin: z.boolean(),
      recentread: z.boolean()
    });
    const userValidation: User = userSchema.parse(userData);
    try {
      console.info(userValidation);
    } catch(error) {
      if(error instanceof ZodError) {
        console.info(error);
      }
    }
  });
});