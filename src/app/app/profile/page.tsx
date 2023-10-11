import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { User } from '@/appwrite/datamodels/Users'
import ProfileForm from '@/components/profile/profileForm'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import ProfileAvatarLoading from '@/components/profile/profileAvatarLoading'
import { Mail, ShieldHalf, User2 } from 'lucide-react'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function Profile() {
  const session = await getServerSession(authOptions)
  const user = session?.user as unknown as User

  const user_initials = user.name.split(' ')[0].slice(0, 1) + '' + user.name.split(' ')[1].slice(0, 1)

  return (
    <div className='max-w-[90%] md:max-w-[80%] lg:max-w-[70%] flex flex-col mx-auto my-5 p-2 gap-4'>
      <Card>
        <CardHeader>
          <h1 className='font-extrabold text-2xl'>Profil</h1>
          <Separator />
        </CardHeader>
        <CardContent>
          <div className='w-full flex flex-col lg:flex-col 2xl:flex-row gap-8 2xl:gap-0'>
            <div className='w-full flex flex-col md:flex-row justify-center items-center gap-4'>
              <Avatar className='w-32 h-32 2xl:w-44 2xl:h-44 shadow-xl border-textprimary border-2'>
                <AvatarImage src='/mock_profile_img.jpg' />
                <AvatarFallback>
                  <ProfileAvatarLoading initials={user_initials} />
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col gap-2'>
                <div className='flex flex-row items-center gap-2'>
                  <ShieldHalf width={18} height={18} className='self-center' />
                  <Badge>{user.role === 'agency_ceo' ? 'Geschäftsführer' : 'Client'}</Badge>
                </div>
                <div className='flex flex-row items-center gap-2'>
                  <User2 width={18} height={18} className='self-center' />
                  <Badge variant={'outline'} className='text-textprimary'>{user.name}</Badge>
                </div>
                <div className='flex flex-row items-center gap-2'>
                  <Mail width={18} height={18} className='self-center' />
                  <Badge variant={'outline'} className='text-textprimary'>{user.email}</Badge>
                </div>
              </div>
            </div>
            <div className='w-full flex justify-center items-center'>
              <ProfileForm />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
