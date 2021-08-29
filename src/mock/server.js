import { createServer, Model, Factory } from "miragejs";

import faker from "faker";
faker.locale = "pt_BR";

const TURMAS = ["A", "B", "C", "D"];
const AUTH_PEOPLE = ["pais", "avós", "tios", "padrinhos"];

export function makeServer() {
  return createServer({
    models: {
      student: Model,
      authorizedPeople: AUTH_PEOPLE,
      classNumber: TURMAS,
    },

    factories: {
      student: Factory.extend({
        id() {
          return faker.datatype.uuid();
        },
        name() {
          return faker.name.firstName();
        },
        surname() {
          return faker.name.lastName();
        },
        birthday() {
          const date = faker.date.past(10, new Date(2015, 1, 1));
          return (
            date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear()
          );
        },
        sponsorName() {
          return faker.name.firstName();
        },
        sponsorPhone() {
          return faker.phone.phoneNumber("(##) 9####-####");
        },
        sponsorType() {
          return faker.helpers.randomize(AUTH_PEOPLE);
        },
        emergencyPhone() {
          return faker.phone.phoneNumber("(##) 9####-####");
        },
        foodRestriction() {
          return { have: () => faker.datatype.boolean(), description: "" };
        },
        authorizeStudentImage() {
          return faker.datatype.boolean();
        },
        authorizedPeople() {
          return [
            {
              name: faker.name.firstName(),
              relation: faker.helpers.randomize(AUTH_PEOPLE),
            },
            {
              name: faker.name.firstName(),
              relation: faker.helpers.randomize(AUTH_PEOPLE),
            },
          ];
        },
        classNumber() {
          return faker.helpers.randomize(TURMAS);
        },
        additionalInfo() {
          return faker.lorem.sentence();
        },
      }),
    },
    routes() {
      this.namespace = "api";
      this.get("/turmas");
      this.get("/auth-people");
      this.get("/students");
      this.get("/students/:id");
      this.post("/students");
      this.patch("/students/:id");
      this.del("/students/:id");
    },
    seeds(server) {
      server.createList("student", 10);
    },
  });
}
