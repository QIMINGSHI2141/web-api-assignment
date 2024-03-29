import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import Movie from "../../../../api/movies/movieModel";
import api from "../../../../index";
import movies from "../../../../seedData/movies";

const expect = chai.expect;
let db;

describe("Movies endpoint", () => {
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
      await Movie.deleteMany();
      await Movie.collection.insertMany(movies);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  });
  afterEach(() => {
    api.close(); // Release PORT 8080
  });
  describe("GET /api/movies ", () => {
    it("should return 20 movies and a status 200", () => {
      request(api)
      .get("/api/movies")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.a("array");
        expect(res.body.length).to.equal(20);
        });
    });
  });

  describe("GET /api/movies/:id", () => {
    describe("when the id is valid", () => {
      it("should return the matching movie", () => {
        request(api)
          .get(`/api/movies/${movies[0].id}`)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.have.property("title", movies[0].title);
          });
      });
    });
    describe("when the id is invalid", () => {
      it("should return the NOT found message", () => {
        request(api)
          .get("/api/movies/9999")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(404)
          .expect({
            status_code: 404,
            message: "The resource you requested could not be found.",
          });
      });
    });

  describe("GET /api/movies/tmdb/upcoming ", () => {
    it("should return 20 movies and a status 200", () => {
      request(api)
      .get("/api/movies/tmdb/upcoming")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.a("array");
        expect(res.body.length).to.equal(20);
        });
    });
  });
  describe("GET /api/movies/tmdb/nowplaying ", () => {
    it("should return 20 movies and a status 200", () => {
      request(api)
      .get("/api/movies/tmdb/nowplaying")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.a("array");
        expect(res.body.length).to.equal(20);
        });
    });
  });
  describe("GET /api/movies/tmdb/popular ", () => {
    it("should return 20 movies and a status 200", () => {
      request(api)
      .get("/api/movies/tmdb/popular")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.a("array");
        expect(res.body.length).to.equal(20);
        });
    });
  });
  describe("GET /api/movies/tmdb/top_rated ", () => {
    it("should return 20 movies and a status 200", () => {
      request(api)
      .get("/api/movies/tmdb/top_rated")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.a("array");
        expect(res.body.length).to.equal(20);
        });
    });
  });
});

});
