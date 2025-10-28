// api/login.js
import authService from '../src/appwrite/auth.js';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  try {
    const session = await authService.login({ email, password });
    const user = await authService.getCurrentUser();
    return res.status(200).json({ session, user });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}
