'use client'

import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Pencil, Save } from 'lucide-react'
import { User } from '@/appwrite/datamodels/Users'
import { Button } from '../ui/button'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { FormEvent, useEffect, useState } from 'react'
import { Skeleton } from '@nextui-org/react'

export default function ProfileForm() {

    //Get auth session
    const { data, status } = useSession()
    const user = data?.user as unknown as User
    

    //State
    const [isEmailChangable, setIsEmailChangeable] = useState(true)
    const [emailValue, setEmailValue] = useState('')

    //Fetching
    useEffect(() => {
        if (status === 'loading') {
            return
        }

        setEmailValue(user.email)
    }, [status])

  return (
    <div className='w-full flex justify-center items-center'>
        <div className="grid w-[95%] md:w-[60%] gap-8">
            {/** Email change */}
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className='text-lg font-bold'>E-Mail ändern</Label>
                <form className='w-full flex gap-4'>
                    {status === 'loading' ? (
                        <div className='border-2 w-full h-full p-1 rounded-md'>
                            <Skeleton className='w-full h-full rounded-md' />
                        </div>
                    ) : (
                        <Input
                            id="email"
                            name='email'
                            type="email" 
                            required
                            defaultValue={user?.email}
                        />
                    )}
                    <Button color='primary' type='submit'>
                        <Save width={18} height={18} />
                    </Button>
                </form>
            </div>

            {/** Password change */}
            <div className="flex flex-col space-y-1.5 gap-2">
                <Label htmlFor="name" className='text-lg font-bold'>Passwort ändern</Label>
                <Label htmlFor="name">Altes Passwort:</Label>
                <div className='w-full flex gap-4'>
                <Input
                    id="email" 
                    placeholder="Altes Passwort" 
                    type="password" 
                    required
                />
                </div>
                <Label htmlFor="name">Neues Passwort:</Label>
                <div className='w-full flex gap-4'>
                <Input
                    id="email" 
                    placeholder="Neues Passwort" 
                    type="password" 
                    required
                />
                </div>
                <Label htmlFor="name">Neues Passwort wiederholen:</Label>
                <div className='w-full flex gap-4'>
                <Input
                    id="email" 
                    placeholder="Neues Passwort wiederholen" 
                    type="password" 
                    required
                />
                </div>
                <Button variant='ghost'>Passwort ändern</Button>
            </div>
        </div>
    </div>
  )
}
