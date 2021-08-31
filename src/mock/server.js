import { createServer, Model, Factory } from "miragejs";

import faker from "faker";
faker.locale = "pt_BR";

const TURMAS = ["A", "B", "C", "D"];
const AUTH_PEOPLE_RELATION = ["pais", "avós", "tios", "padrinhos"];

export function makeServer() {
  return createServer({
    models: {
      student: Model,
      // authorizedPeopleRelation: Model,
      // classNumber: Model,
    },

    factories: {
      // authorizedPeopleRelation: Factory.extend(AUTH_PEOPLE_RELATION),
      // classNumber: Factory.extend(TURMAS),
      student: Factory.extend({
        additionalInfo() {
          return faker.lorem.sentence();
        },
        authorizedPeople() {
          return [
            {
              name: faker.name.firstName(),
              relation: faker.helpers.randomize(AUTH_PEOPLE_RELATION),
            },
            {
              name: faker.name.firstName(),
              relation: faker.helpers.randomize(AUTH_PEOPLE_RELATION),
            },
          ];
        },

        authorizeStudentImage() {
          return faker.datatype.boolean();
        },
        foodRestriction() {
          return { have: () => faker.datatype.boolean(), description: "" };
        },
        emergencyPhone() {
          return faker.phone.phoneNumber("(##) 9####-####");
        },
        sponsorType() {
          return faker.helpers.randomize(AUTH_PEOPLE_RELATION);
        },
        sponsorPhone() {
          return faker.phone.phoneNumber("(##) 9####-####");
        },
        sponsorName() {
          return faker.name.firstName();
        },
        classNumber() {
          return faker.helpers.randomize(TURMAS);
        },
        birthday() {
          const date = faker.date.past(10, new Date(2015, 1, 1));
          return date;
        },
        name() {
          return faker.name.firstName();
        },
        surname() {
          return faker.name.lastName();
        },
        id() {
          return faker.datatype.uuid();
        },
      }),
    },
    routes() {
      this.namespace = "api";
      this.get("/turmas", () => {
        return JSON.stringify(TURMAS);
      });
      this.get("/pessoas-autorizadas", () =>
        JSON.stringify(AUTH_PEOPLE_RELATION)
      );
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

export const apiServer = makeServer();
