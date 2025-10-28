// src/conf/conf.js

const conf = {
  getAppwriteUrl: () => import.meta.env.VITE_APPWRITE_ENDPOINT,
  getProjectId: () => import.meta.env.VITE_APPWRITE_PROJECT_ID,
  getDatabaseId: () => import.meta.env.VITE_APPWRITE_DATABASE_ID,
  getCollectionId: () => import.meta.env.VITE_APPWRITE_COLLECTION_ID,
  getBucketId: () => import.meta.env.VITE_APPWRITE_BUCKET_ID,
};

// 🧩 Debug (runs in browser only)
if (typeof window !== "undefined") {
  console.log("🧩 conf debug", {
    VITE_APPWRITE_ENDPOINT: import.meta.env.VITE_APPWRITE_ENDPOINT,
  });

  const values = {
    appwriteUrl: conf.getAppwriteUrl(),
    appwriteProjectId: conf.getProjectId(),
    appwriteDatabaseId: conf.getDatabaseId(),
    appwriteCollectionId: conf.getCollectionId(),
    appwriteBucketId: conf.getBucketId(),
  };

  for (const [key, value] of Object.entries(values)) {
    if (!value) {
      console.warn(`⚠️ Missing environment variable: ${key}`);
    }
  }
}

export default conf;
