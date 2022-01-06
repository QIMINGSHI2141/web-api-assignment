import userModel from '../api/users/userModel';
import genresModel from '../api/genres/genresModel';
import users from './users';
import genres from './genres';
import dotenv from 'dotenv';
import movieModel from '../api/movies/movieModel';
import movies from './movies.js';
import actorsModel from '../api/actors/actorsModel';
dotenv.config();

const {getMovies, getGenres, getActors, getTvs} = require('../api/tmdb-api')
// deletes all user documents in collection and inserts test data
async function loadUsers() {
  console.log('load user Data');
  try {
    await userModel.deleteMany();
    await users.forEach(user => userModel.create(user));
    console.info(`${users.length} users were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load user Data: ${err}`);
  }
}

async function loadGenres() {
    console.log('load genres Data');
    try {
      await genresModel.deleteMany();
      await genresModel.collection.insertMany(genres);
      console.info(`${genres.length} genres were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load genres Data: ${err}`);
    }
  }
  export async function loadMovies() {
    console.log('load seed data');
    console.log(movies.length);
    try {
      await movieModel.deleteMany();
      await movieModel.collection.insertMany(movies);
      console.info(`${movies.length} Movies were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load movie Data: ${err}`);
    }
  }

  export async function loadActors() {
    const actors = await getActors();
    console.log('load actor data');
    console.log(actors.length);
    try {
      await actorsModel.deleteMany();
      await actorsModel.collection.insertMany(actors);
      console.info(`${actors.length} Actors were successfully stored.`);
    } catch (err) {
      console.error(`failed to Load actor Data: ${err}`);
    }
  }
  if (process.env.SEED_DB == 'true') {
    loadUsers();
    loadGenres();//you may not need this line if you skipped the exercises
    loadMovies();//ADD THIS LINE
    loadActors();
  }