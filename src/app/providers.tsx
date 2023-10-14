'use client'

//Imports
import { NextUIProvider } from "@nextui-org/react"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider as NextThemesProvider } from 'next-themes'

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

                    {/** Theme Provider - dark mode */}
                    <NextThemesProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >

                        {/** Render children */}
                        { children }
                    </NextThemesProvider>
                </NextUIProvider>
            </SessionProvider>
        </>
    )
}