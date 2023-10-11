'use client'

//IMPORTS
import { Skeleton } from '@nextui-org/react'
import React from 'react'

interface ProfileAvatarLoadingType {
    initials: string
}

export default function ProfileAvatarLoading({ initials }: ProfileAvatarLoadingType) {
  return (
    <div className='w-full h-full p-1 rounded-full bg-white flex items-center justify-center'>
        <Skeleton className='w-full h-full rounded-full flex items-center justify-center' />
        <p className='absolute font-bold text-xl'>{initials}</p>
    </div>
  )
}
