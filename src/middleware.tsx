//Imports
export { default } from 'next-auth/middleware'

//Define auth route config
export const config = { 

    //Define protected routes
    matcher: [
        '/((?!login|api).*)'
    ]
}