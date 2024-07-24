import { MongoClient } from "mongodb";
import "dotenv/config";

// Connection URL
const url = process.env.DB_URL;

var dbConnection;
export const connectToDB = (cb) => {
  MongoClient.connect(`${url}`)
    .then((client) => {
      dbConnection = client.db();
      return cb();
    })
    .catch((error) => {
      return cb(error);
    });
};

export const getDB = () => dbConnection;
