import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import Actors from "../../../../api/actors/actorsModel";
import api from "../../../../index";
import actors from "../../../../seedData/actors";

const expect = chai.expect;
let db;
const Actor = {
    id: 1245,
    name: "Cate Blanchett",
  };
describe("Actors endpoint", () => {
  before(() => {
    mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;
  });

  after(async () => {
    try {
      await db.dropDatabase();
    } catch (error) {
      console.log(error);
    }
  });

  beforeEach(async () => {
    try {
      await Actors.deleteMany();
      await Actors.collection.insertMany(actors);
    } catch (err) {
      console.error(`failed to Load actor Data: ${err}`);
    }
  });
  afterEach(() => {
    api.close(); // Release PORT 8080
  });
  describe("GET /api/actors/:id", () => {
    describe("when the id is valid", () => {
      it("should return the matching actor", () => {
        request(api)
          .get(`/api/actors/${Actor.id}`)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.have.property("name", Actor.name);
          });
      });
    });
    describe("when the id is invalid", () => {
      it("should return the NOT found this actor", () => {
        request(api)
        .get("/api/actors/999999")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect({
          success: false,
          status_code: 34,
          status_message: "The resource you requested could not be found.",
        });
    });
   });
  });
});