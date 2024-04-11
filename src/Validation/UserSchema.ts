import {z, RefinementCtx, ZodError} from "zod";

export function mustNotSpace(data: string, ctx: RefinementCtx): string {
    if(data.replace(/\s/g, "") !== data) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "username must no space"
        });
        return z.NEVER;
    } else {
        return data;
    }
}
export function mustNoOnlySpace(data: string, ctx: RefinementCtx): string {
    if(data.replace(/\s/g, "") === "") {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "username must no only space"
        });
        return z.NEVER;
    } else {
        return data;
    }
}

export const userSchema = z.object({
    name: z.string().min(4).max(25).transform(mustNoOnlySpace),
    username: z.string().min(4).max(25).transform(mustNotSpace),
    password: z.string().min(8).max(16).transform(mustNotSpace),
    loggingin: z.boolean(),
    recentread: z.boolean()
});