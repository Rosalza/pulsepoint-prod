//Imports
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from 'next-auth/providers/credentials'
import { getUserByEmail } from "@/appwrite/datamodels/Users";

export const authOptions: NextAuthOptions = {
    //Define auth pages
    pages: {
        signIn: '/login'
    },

    //Use jwt for session
    session: {
        strategy: 'jwt'
    },

    //Set up auth providers
    providers: [
        CredentialsProvider({

            //Auth provider name
            name: 'Sign in',

            //Define auth provider credentials
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'hallo@beispiel.com'
                },
                password: {
                    label: 'Passwort',
                    type: 'password'
                }
            },

            //Authorize method -> authorize user
            async authorize(credentials) {

                //Check if credentials exsist
                if (!credentials?.email || !credentials.password) {
                    return null
                }

                //Fetch user info from database (appwrite)
                const user = await getUserByEmail(credentials.email)

                //Check if user exsist
                if (!user) {
                    return null
                }

                //Check if password is valid (bcrypt compare)
                const isPasswordValid = await compare(credentials.password, user.password)

                //Handle invalid password
                if (!isPasswordValid) {
                    return null
                }

                //Login successfull -> return user
                return {
                    id: user.$id + '',
                    email: user.email,
                    name: user.name,
                    role: user.role,
                }
            }
        })
    ],

    //Auth callbacks
    callbacks: {

        //Define auth session
        session: ({ session, token }) => {
            const new_session = {
                ...session,
                user: {
                    ...session.user,
                    $id: token.id,
                    role: token.role
                }
            }

            return new_session
        },

        //Define auth jwt
        jwt: ({ token, user }) => {
            if (user) {
                const u = user as unknown as any
                return {
                    ...token, 
                    id: u.id,
                    role: u.role
                }
            }

            return token
        }
    },
}

//Initialize auth config
const handler = NextAuth(authOptions)

//Export http handlers
export {
    handler as GET,
    handler as POST
}