// src/appwrite/auth.js
import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

/**
 * AuthService - wrapper around Appwrite Account
 * - createAccount uses account.create({ userId, email, password, name })
 * - login uses account.createEmailPasswordSession({ email, password })
 * - getCurrentUser checks for session cookie before calling account.get()
 */

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.getAppwriteUrl())
      .setProject(conf.getProjectId());


    this.account = new Account(this.client);
  }

  // Create new user (current Appwrite web SDK pattern)
  async createAccount({ email, password, name }) {
    try {
      // Appwrite expects an object for create in modern SDK docs
      const user = await this.account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });

      // auto login after signup (createEmailPasswordSession expects an object)
      await this.login({ email, password });

      return user;
    } catch (error) {
      console.error("Appwrite service :: createAccount :: error", error);
      throw error;
    }
  }

  // Login existing user
  // ✅ Login existing user
    // ✅ Login existing user safely
async login({ email, password }) {
  try {
    // If a session already exists, clear it before logging in again
    try {
      await this.account.deleteSession("current");
    } catch (_) {
      // ignore if not logged in
    }

    // Create new login session
    const session = await this.account.createEmailPasswordSession({
      email,
      password,
    });

    console.log("Login successful:", session);
    return session;
  } catch (error) {
    console.error("Appwrite service :: login :: error", error);
    throw error;
  }
}



  // Helper: check if Appwrite session cookie exists for this project
  _hasSessionCookie() {
    try {
      if (typeof document === "undefined") return false;
      // Appwrite uses cookie name pattern: a_session_<PROJECT_ID> (when using SSR/session cookie)
      // Also the console session cookie used by Appwrite console is a_session_console, so we check both.
      const cookieName = `a_session_${conf.appwriteProjectId}`;
      const cookies = document.cookie || "";
      return cookies.includes(cookieName) || cookies.includes("a_session_console") || cookies.split(";").some(c => c.trim().startsWith("a_session="));
    } catch (e) {
      return false;
    }
  }

  // Get current user (return null if not logged in). Avoids noisy 401 when no session cookie.
  async getCurrentUser() {
    try {
      if (!this._hasSessionCookie()) {
        // no session cookie, return null without calling the API (avoids 401 logs)
        return null;
      }

      // If cookie present, call get(); will succeed if session is valid
      return await this.account.get();
    } catch (error) {
      console.error("Appwrite service :: getCurrentUser :: error", error);
      // return null on failure (e.g., session expired)
      return null;
    }
  }

  // Logout
  async logout() {
    try {
      await this.account.deleteSession("current");
    } catch (error) {
      console.error("Appwrite service :: logout :: error", error);
    }
  }
}

const authService = new AuthService();
export default authService;
