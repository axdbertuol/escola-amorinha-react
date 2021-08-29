import { createServer, Model, Factory } from "miragejs";

import faker from "faker";
faker.locale = "pt_BR";

export function makeServer() {
  return createServer({
    models: {
      student: Model,
    },
    // factories: {
    //   student: Factory.extend({
    //     id: "",
    //     name: "",
    //     surname: "",
    //     birthday: null,
    //     sponsorName: "",
    //     sponsorPhone: "",
    //     sponsorType: "pais",
    //     emergencyPhone: "",
    //     foodRestriction: {
    //       have: false,
    //       description: "",
    //     },
    //     authorizeStudentImage: false,
    //     authorizedPeople: [{ name: "", relation: "" }],
    //     classNumber: "",
    //     additionalInfo: "",
    //   }),
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
          return faker.date.past();
        },
        sponsorName() {
          return faker.name.firstName();
        },
        sponsorPhone() {
          return faker.phone.phoneNumber("(##)#####-####");
        },
        sponsorType() {
          return faker.helpers.randomize(["pais", "avós", "tios", "padrinhos"]);
        },
        emergencyPhone() {
          return faker.phone.phoneNumber("(##)#####-####");
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
              relation: faker.helpers.randomize([
                "pais",
                "avós",
                "tios",
                "padrinhos",
              ]),
            },
            {
              name: faker.name.firstName(),
              relation: faker.helpers.randomize([
                "pais",
                "avós",
                "tios",
                "padrinhos",
              ]),
            },
          ];
        },
        classNumber() {
          return faker.helpers.randomize(["A", "B", "C", "D"]);
        },
        additionalInfo() {
          return faker.lorem.sentence();
        },
      }),
    },
    routes() {
      this.namespace = "api";
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
