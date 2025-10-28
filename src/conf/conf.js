// src/conf/conf.js
const conf = {
  getAppwriteUrl: () => import.meta.env.VITE_APPWRITE_ENDPOINT,
  getProjectId: () => import.meta.env.VITE_APPWRITE_PROJECT_ID,
  getDatabaseId: () => import.meta.env.VITE_APPWRITE_DATABASE_ID,
  getCollectionId: () => import.meta.env.VITE_APPWRITE_COLLECTION_ID,
  getBucketId: () => import.meta.env.VITE_APPWRITE_BUCKET_ID,
};

export default conf;
