import { createServer, Model, Factory, Response } from "miragejs";
import faker from "faker";
import jwt from "jsonwebtoken";

faker.locale = "pt_BR";

const TURMAS = ["A", "B", "C", "D"];
const AUTH_PEOPLE_RELATION = ["pais", "avós", "tios", "padrinhos"];
const JOBS = ["Professor", "Coordenador", "Diretor"];

export function makeServer() {
  return createServer({
    models: {
      student: Model,
      user: Model,
    },

    factories: {
      user: Factory.extend({
        name() {
          return faker.name.firstName();
        },
        email() {
          return faker.internet.email();
        },
        job() {
          return faker.helpers.randomize(JOBS);
        },
        classNumbers() {
          return this.job === "Coordenador" || this.job === "Professor"
            ? [faker.helpers.randomize(TURMAS), faker.helpers.randomize(TURMAS)]
            : null;
        },
        password() {
          return faker.internet.password();
        },
        id() {
          return faker.datatype.uuid();
        },
      }),
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
        grade() {
          return faker.helpers.randomize([...Array(11).keys()]);
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
      this.get("/auth-token/:id", (schema, request) => {
        let userId = request.params.id;
        const token = jwt.sign({ id: userId }, "my_secret_key");
        return JSON.stringify(token);
      });
      this.get("/auth-token-verify/:token", (schema, request) => {
        let token = request.params.token;
        let user;
        jwt.verify(token, "my_secret_key", async (err, payload) => {
          console.log("payload", payload);
          const { id } = payload;
          try {
            user = schema.users.findBy({ id });
            if (user) {
              // return true;
            }
          } catch (error) {
            console.log(error);
          }
        });
        return JSON.stringify({ user });
      });
      this.get("/turmas", () => {
        return JSON.stringify(TURMAS);
      });
      this.get("/pessoas-autorizadas", () =>
        JSON.stringify(AUTH_PEOPLE_RELATION)
      );
      this.post("/auth-user", (schema, request) => {
        let user = JSON.parse(request.requestBody);

        return schema.users.findBy({
          password: user.password,
          email: user.email,
        });
      });

      this.post("/check-password", (schema, request) => {
        let { passwordToCheck, id } = JSON.parse(request.requestBody);

        try {
          let user = schema.users.findBy({
            id,
          });

          return user.password === passwordToCheck
            ? new Response(201, {}, { status: 201 })
            : new Response(
                400,
                {},
                { status: 400, errors: ["Wrong password"] }
              );
        } catch (error) {
          console.log("check-password error", error);
        }
      });
      this.post("/change-password", (schema, request) => {
        let { newPassword, id } = JSON.parse(request.requestBody);

        try {
          let user = schema.users.findBy({
            id,
          });
          user.update({ password: newPassword });
          return new Response(201, {}, { status: 201 });
        } catch (error) {
          console.log("change-password error", error);
        }
      });
      this.get("/students");
      this.get("/students/:id");
      this.post("/students");
      this.patch("/students/:id", (schema, request) => {
        let { data } = JSON.parse(request.requestBody);
        let id = request.params.id;
        try {
          let student = schema.students.findBy({
            id,
          });
          student.update({ ...data });
          console.log("student updated", student);
          return new Response(201, {}, { status: 201 });
        } catch (error) {
          console.log("erro ", error);
        }
      });
      this.del("/students/:id");
    },
    seeds(server) {
      server.create("user", {
        name: "Alexandre",
        email: "alexandre@teste.com",
        password: "12345",
        classNumbers: ["A", "B"],
        job: "Professor",
        id: "e01xc234",
      });
      server.create("user", {
        name: "Janio",
        email: "janio@teste.com",
        password: "12345",
        classNumbers: ["A", "B", "C", "D"],
        job: "Coordenador",
        id: "e01xc235",
      });
      server.create("user", {
        name: "Bosco",
        email: "bosco@teste.com",
        password: "12345",
        classNumbers: ["A", "B", "C", "D"],
        job: "Diretor",
        id: "e01xc236",
      });
      server.createList("user", 9);
      server.createList("student", 10);
    },
  });
}

export const apiServer = makeServer();
