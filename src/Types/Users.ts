import { ObjectId } from 'mongodb';

export interface RecentRead {
  nomor?: number;
  nama?: string;
  nama_latin?: string;
  ayat?: number;
}

export interface User {
  _id?: ObjectId;
  name?: string;
  username?: string;
  password?: string;
  recentread?: boolean | RecentRead;
  loggingin?: boolean;
}
export interface AllUser {
  [index: number]: User;
}

export interface UserInfo {
  name: string;
  username: string;
  password: string;
  recentread?: boolean | RecentRead;
}