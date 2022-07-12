import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { verifyPassword } from "../../../lib/auth";
import { ConnectToDatabase } from "../../../lib/db";

// NextAuth is a provider function, then we execute it
export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await ConnectToDatabase();
        const usersCollection = client.db("Authentication").collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          // If fail, NEXT will redirect to error page
          client.close();
          throw new Error("Couldn't find user!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Couldn't log you in!");
        }
        client.close();

        return { email: user.email };
      },
    }),
  ],
});
