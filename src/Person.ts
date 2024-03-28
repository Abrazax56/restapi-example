import { Person } from '.././types/person';

export class Persons<Type extends Person> {
  constructor(public person: Type) {}
}