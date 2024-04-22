import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { consola } from "consola";
import * as bcrypt from "bcrypt";


export type JWTUser = Pick<User, "id" | "username">;

export const createJWT = (user: JWTUser) => jwt.sign(user, process.env.JWT_SECRET as string);

export const verifyJWT = (token: string) => jwt.verify(token, process.env.JWT_SECRET as string) as JWTUser;

export const getUserFromToken = (token: string) : JWTUser | null => {
    try {
        return verifyJWT(token);
    } catch (error) {
        consola.error(error);
        return null;
    }
}
 
export const hashPassword = (password: string): Promise<string> => bcrypt.hash(password, 5);

export const comparePasswords = (password: string, hash: string): Promise<boolean> => bcrypt.compare(password, hash);
