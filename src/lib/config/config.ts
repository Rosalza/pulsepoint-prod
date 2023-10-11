//Load environment variables
const config = {

    //Load appwrite env's
    appwriteEndpoint: String(process.env.APPWRITE_ENDPOINT),
    appwriteProjectId: String(process.env.APPWRITE_PROJECT_ID),
    appwriteUsersCollectionId: String(process.env.APPWRITE_USERS_COLLECTION_ID),
    appwriteDatabaseId: String(process.env.APPWRITE_DATABASE_ID),
}

//Export config
export default config