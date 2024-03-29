export interface User {
  id?: string;
  user_token?: string;
  loggingin?: boolean;
}
export interface AllUser {
  [index: number]: User;
}