import { Client, Account } from "appwrite";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { email, password } = req.body;

    const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID);

    const account = new Account(client);

    const session = await account.createEmailPasswordSession(email, password);
    const user = await account.get();

    return res.status(200).json({ session, user });
  } catch (err) {
    console.error("🔥 [api/login] Server error:", err);
    return res.status(500).json({
      error: err.message || "Server error",
      details: err.response || null,
    });
  }
}
  