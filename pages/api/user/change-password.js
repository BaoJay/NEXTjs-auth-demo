import { getSession } from "next-auth/client";

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
}

export default handler;
