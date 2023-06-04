import { MongoClient } from "mongodb";

const connectionString = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongo:27017`;
const client = new MongoClient(connectionString);

let conn;
try
{
  conn = await client.connect();
} catch (e)
{
  console.error(e);
}

let db = conn.db("video_sharing");

export default db;