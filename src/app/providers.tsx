'use client'

//Imports
import { NextUIProvider } from "@nextui-org/react"
import { SessionProvider } from "next-auth/react"

//Define types
type Props = {
    children?: React.ReactNode
}
export const Providers = ({ children }: Props) => {
    return (
        <>
            {/** Next-auth provider */}
            <SessionProvider>

                {/** NextUI provider */}
                <NextUIProvider>

                    {/** Render children */}
                    { children }
                </NextUIProvider>
            </SessionProvider>
        </>
    )
}