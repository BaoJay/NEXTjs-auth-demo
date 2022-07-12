import { ConnectToDatabase } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { email, password } = data;

    //Validate email and password
    if (
      !email ||
      !password ||
      !email.includes("@") ||
      !password.trim().length > 7
    ) {
      res.status(500).json({ message: "Invalid email or password" });
      return;
    }

    const client = await ConnectToDatabase();
    const db = client.db("Authentication");

    const hashedPassword = hashPassword(password);

    const result = await db.collection("users").insertOne({
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Successfully created user!" });
  }
}

export default handler;
