//Imports
import config from "@/lib/config/config";
import { Client, Databases } from "appwrite";

//AppWrite connection
export const appwriteClient = new Client()
    .setEndpoint(config.appwriteEndpoint || '')
    .setProject(config.appwriteProjectId || '')

//Init AppWrite databases
export const appwriteDatabase = new Databases(appwriteClient)