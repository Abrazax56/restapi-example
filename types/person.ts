export interface Address {
  street: string;
  city: string;
}

export interface DetailEducations {
  name: string;
  level: string;
  address: string;
  year: string;
}

export interface Educations {
  [index: number]: DetailEducations;
}

export interface Hobbies {
  [index: number]: string;
}

export interface Person {
  name: string;
  birth: string;
  address: Address;
  educations: Educations;
  hobbies: Hobbies;
}