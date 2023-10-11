//Imports
import { appwriteDatabase } from "@/appwrite/config";
import config from "@/lib/config/config";
import { ID, Query } from "appwrite";

//Types
export interface User {
    $id: string,
    name: string,
    email: string,
    password: string,
    role: string
}

//Get all users
export const getUsers = async (): Promise<User[]> => {
    //Fetch users
    const { documents } = await appwriteDatabase.listDocuments(config.appwriteDatabaseId, config.appwriteUsersCollectionId);

    //Add typesafety
    const users = documents as unknown as User[]

    //Retun users
    return users
}

//Add user
export const addUser = async (user: User): Promise<User> => {
    //Add user to collection
    const addedUser = (await appwriteDatabase.createDocument(
        config.appwriteDatabaseId, 
        config.appwriteUsersCollectionId, 
        ID.unique(), 
        user
    )) as unknown as User

    //Return promise
    return addedUser
}

//Get user by id
export const getUserById = async (id: string): Promise<User> => {
    //Fetch user by id
    const user = (await appwriteDatabase.getDocument(
        config.appwriteDatabaseId,
        config.appwriteUsersCollectionId,
        id
    )) as unknown as User

    //Error handling
    if (!user) {
        throw new Error('User not found')
    }

    //Return fetched user
    return user
}

//Get user by email
export const getUserByEmail = async (email: string): Promise<User> => {
    //Fetch user document
    const docs = await appwriteDatabase.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteUsersCollectionId,
        [
            Query.equal('email', email),
            Query.limit(1)
        ]
    )

    //Fetch user
    const user = (await appwriteDatabase.getDocument(
        config.appwriteDatabaseId,
        config.appwriteUsersCollectionId,
        docs.documents[0].$id
    )) as unknown as User

    //Error handling
    if (!user) {
        throw new Error('User not found')
    }

    //Return user
    return user
}