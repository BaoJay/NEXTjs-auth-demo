import { getSession } from "next-auth/client";
import { ConnectToDatabase } from "../../../lib/db";
import { verifyPassword, hashPassword } from "../../../lib/auth";
import { hash } from "bcryptjs";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }
  const session = await getSession({ req: req });

  // Protect the API Route using session check
  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await ConnectToDatabase();

  const userCollection = client.db("Authentication").collection("users");

  const user = userCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const passwordAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordAreEqual) {
    res.status(403).json({ message: "Invalid password" });
    client.close();
    return;
  }

  // hash the new password
  const hashedPassword = hashPassword(newPassword);

  // update the new password in the database
  const result = await userCollection.updateOne(
    {
      email: userEmail,
    },
    {
      $set: {
        password: hashedPassword,
      },
    }
  );

  client.close();
  res.status(200).json({ message: " Password updated successfully!" });
}

export default handler;
