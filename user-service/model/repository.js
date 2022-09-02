import UserModel from './user-model.js';
import 'dotenv/config'

//Set up mongoose connection
import mongoose from 'mongoose';

let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createUser(params) {
  const {
    name,
    username,
    password
  } = params
  const usernameExists = await UserModel.findOne({username})
  console.log('params', params, 'usernameExists', usernameExists)
  if (usernameExists) {
    return {
      error: 'Username already exists'
    }
  }
  return {
    userModel: new UserModel(params)
  }
}

