import { ObjectId } from 'mongodb';

export interface User {
  _id?: ObjectId;
  user_token?: string;
  loggingin?: boolean;
}
export interface AllUser {
  [index: number]: User;
}
export interface UserInfo {
  name: string;
  username: string;
  password: string;
}