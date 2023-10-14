'use client'

//Imports
import { User } from '@/appwrite/datamodels/Users';
import { AcmeLogo } from '@/assets/AcmeLogo';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Skeleton, User as UserAvatar } from '@nextui-org/react'
import { ChevronDown, LogOut, User2 } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react'

export default function NavBar() {
  //State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  //Router
  const router = useRouter()

  //Fetch next-auth session
  const { data, status } = useSession()
  const user = data?.user as unknown as User

  //Set menu items
  const menuItems = [
    "Home",
    "Team",
    "Clients",
    "Log Out",
  ];
  
  //Render ui
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBlurred classNames={{
      base: `${!isMenuOpen ? 'shadow-md' : ''}`,
    }} className=''>

      {/** Navbar brand section */}
      <NavbarContent justify='start'>

        {/** Menu switch on mobile */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />

        {/** Actual navbar brand section */}
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">PulsePoint</p>
        </NavbarBrand>
      </NavbarContent>

      {/** Navbar main menu items */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/app" color='primary'>
            Start
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/app/team" color='foreground'>
            Team
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Clients
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/** Navbar profile section */}
      <NavbarContent justify="end">
        <Dropdown onOpenChange={(isOpen) => setIsProfileOpen(isOpen)}>
          <NavbarItem className="hidden lg:flex">
            <DropdownTrigger>

              {/** Navbar dropdown menu button */}
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-base"
                endContent={<ChevronDown className={`${isProfileOpen ? 'rotate-180' : ''} transition-all ease-in-out duration-200`} />}
                radius="sm"
                variant="light"
              >
                {
                  status === 'loading' ? (
                    <>
                      {/** Render skeleton while loading */}
                      <div className='w-40 flex justify-center items-center gap-2 p-1'>
                        <div className='w-12 h-10 flex justify-center items-center rounded-full'>
                          <Skeleton className='w-full h-full rounded-full' />
                        </div>
                        <div className='flex w-[80%] flex-col gap-2 justify-center items-center'>
                          <Skeleton className='w-full h-4 rounded-md' />
                          <Skeleton className='w-[65%] h-2 rounded-md self-start' />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/** Render user avatar */}
                      <UserAvatar  
                        name={user.name}
                        description={`${user.role === 'agency_ceo' ? 'Geschäftsführer' : 'Client'}`}
                        avatarProps={{
                          src: "/mock_profile_img.jpg",
                        }}
                      />
                    </>
                  )
                }
              </Button>
            </DropdownTrigger>
          </NavbarItem>

          {/** Navbar profile dropdown menu */}
          <DropdownMenu>
            <DropdownItem
              key="autoscaling"
              onClick={() => router.push('/app/profile')}
            >
              <>
                  <div className='w-full flex flex-row'>
                    <div className='w-full flex items-center justify-start'>
                      <p>Profil</p>
                    </div>
                    <div className='w-full flex items-center justify-end'>
                      <User2 width={15} height={15} />
                    </div>
                  </div>
              </>
            </DropdownItem>
            <DropdownItem
              key="autoscaling"
              onClick={() => signOut()}
            >
              <>
                  <div className='w-full flex flex-row'>
                    <div className='w-full flex items-center justify-start'>
                      <p>Abmelden</p>
                    </div>
                    <div className='w-full flex items-center justify-end'>
                      <LogOut width={15} height={15} />
                    </div>
                  </div>
              </>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      {/** Navbar menu items on mobile */}
      <NavbarMenu>
        {menuItems.map((item, index) => (

          <>
            {/** Render menu items on mobile */}
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 0 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                }
                className="w-full"
                href="#"
                size="lg"
                onClick={() => {
                  if (item === 'Log Out') {
                    signOut()
                  }
                }}
              >
                {item}
              </Link>
            </NavbarMenuItem>
          </>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
