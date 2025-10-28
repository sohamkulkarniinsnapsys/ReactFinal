// api/login.js
import authService from '../src/appwrite/auth.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    try {
      const session = await authService.login({ email, password });
      const user = await authService.getCurrentUser();
      return res.status(200).json({ session, user });
    } catch (err) {
      console.error('[Serverless] Login error:', err);
      return res.status(400).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
