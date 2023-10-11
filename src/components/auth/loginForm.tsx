'use client'

import { Button } from "@nextui-org/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"
import React, { useState } from "react"
import { useRouter, useSearchParams } from 'next/navigation'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Spinner } from "@nextui-org/react"
export const LoginForm = () => {
    //Hooks
    const router = useRouter()

    //Get current page
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/app'

    //Form States
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loginLoading, setLoginLoading] = useState(false)

    //From submit event
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setLoginLoading(true)
            //Sign in function
            const res: any = await signIn('credentials', { 
                redirect: false,
                email, 
                password, 
                callbackUrl 
            }).then(() => {
                setLoginLoading(false)
            })

            //Check status
            if (!res?.error) {
                router.push('/app')
            } else {
                setError(res?.error || 'WrongCredentials')
            }
        } catch (err: any) {

        }
    }

    //From UI
     return (
        <form onSubmit={onSubmit}>
            <div className="grid w-full items-center gap-6">

                {/** Email input */}
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">E-Mail</Label>
                    <Input 
                        id="email" 
                        placeholder="max.mustermann@beispiel.de" 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/** Password input */}
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Passwort</Label>
                    <Input 
                        id="password" 
                        placeholder="Ihr Passwort" 
                        type="password" 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/** Error rendering */}
                <Alert variant="destructive" className={`${error === '' ? 'hidden' : ''}`}>
                    <AlertCircle className="h-6 w-6" />
                    <AlertTitle>Oh oh! Etwas ist schief gelaufen.</AlertTitle>
                    <AlertDescription>
                        Leider sind Ihre Anmeldedaten nicht korrekt. <br /> Fehlercode: {error}
                    </AlertDescription>
                </Alert>

                {/** Submit button */}
                <Button color="primary" type="submit">
                    { !loginLoading ? (
                        <>
                            Anmelden
                        </>
                    ) : (
                        <Spinner size="md" color="white" />
                    )}
                </Button>
            </div>
        </form>
     )
}