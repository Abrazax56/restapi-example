import { Persons } from '.././src/Person';
import { Person } from '.././types/person';

describe('Class test', function () {
  it('should work', function () {
    const persons = new Persons<Person>({
      name: "Ahmad",
      birth: "23 july 2005",
      address: {
        street: "jln karimun",
        city: "Cilacap"
      },
      educations: [
        {
          name: "SMK Darul Ulum",
          level: "Vacation High school",
          address: "Sidareja",
          year: "2020-2023"
        }
      ],
      hobbies: [
        "coding",
        "drawing"
      ]
    });
    console.info(persons.person);
  });
});