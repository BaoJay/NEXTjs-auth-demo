import { MongoClient } from "mongodb";
import { CLIENT_RENEG_LIMIT } from "tls";

export async function ConnectToDatabase() {
  const connectMongo = new MongoClient(
    "mongodb+srv://giabaonguyenhoang:Htg3E%40bpP5Eo%40DEc@cluster0.go7ryaj.mongodb.net/?retryWrites=true&w=majority"
  );
  const client = await connectMongo.connect();

  return client;
}
