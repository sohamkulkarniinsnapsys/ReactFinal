const conf = {
  appwriteUrl:
    import.meta.env?.VITE_APPWRITE_ENDPOINT || process.env.APPWRITE_ENDPOINT,
  appwriteProjectId:
    import.meta.env?.VITE_APPWRITE_PROJECT_ID || process.env.APPWRITE_PROJECT_ID,
  appwriteDatabaseId:
    import.meta.env?.VITE_APPWRITE_DATABASE_ID || process.env.APPWRITE_DATABASE_ID,
  appwriteCollectionId:
    import.meta.env?.VITE_APPWRITE_COLLECTION_ID || process.env.APPWRITE_COLLECTION_ID,
  appwriteBucketId:
    import.meta.env?.VITE_APPWRITE_BUCKET_ID || process.env.APPWRITE_BUCKET_ID,
};
console.log("🧩 conf debug", {
  VITE_APPWRITE_ENDPOINT: import.meta.env.VITE_APPWRITE_ENDPOINT,
  processEnv: process.env.APPWRITE_ENDPOINT,
});


// Optional: log missing vars (only in dev)
if (typeof window !== "undefined") {
  for (const [key, value] of Object.entries(conf)) {
    if (!value) {
      console.warn(`⚠️ Missing environment variable: ${key}`);
    }
  }
}

export default conf;
