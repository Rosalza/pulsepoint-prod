'use client'

//Imports
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function Home() {

  //Fetch next-auth session
  const { data, status } = useSession()

  //Router
  const router = useRouter()

  //Check for auth status and redirect to app
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/app')
    }
  }, [status])

  //Render loading screen
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <h1>Loading...</h1>
    </div>
  )
}
