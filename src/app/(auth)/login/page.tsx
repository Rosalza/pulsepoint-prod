//Import
import { LoginForm } from "@/components/auth/loginForm";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
    return (
        <div className="w-screen h-screen flex flex-col gap-14 justify-center items-center">

            {/**Login screen headline */}
            <h1 className="font-black text-5xl">PulsePoint</h1>

            {/** Login screen card */}
            <Card className="shadow-xl max-w-[90%]">

                {/** Login screen card header */}
                <CardHeader>
                    <CardTitle>Anmeldung</CardTitle>
                    <CardDescription>Melden Sie sich mit ihrer E-Mail und ihrem Passwort an.</CardDescription>
                </CardHeader>

                {/** Login screen content / body */}
                <CardContent>

                    {/** Render login form */}
                    <LoginForm />
                </CardContent>

                {/** Login screen footer */}
                <CardFooter>
                    <p className="text-xs text-center w-full">Mit der Anmeldung stimmen sie unseren AGB und Datenschutzrichtlinien zu.</p>
                </CardFooter>
            </Card>
        </div>
    )
}