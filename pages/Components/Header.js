import Image from "next/image"
import s2bLogo from '../assets/bomb2.png';
import { BellIcon, ChatIcon, ChevronDownIcon, HomeIcon, UserGroupIcon, ViewGridIcon } from '@heroicons/react/solid';
import { FlagIcon, PlayIcon, SearchIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import HeaderIcon from "./HeaderIcon";
import { signOut, useSession } from "next-auth/react";

function Header() {
    const { data: session } = useSession()

    if(session){
        return (
            <div className='sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md'>
                <div className='flex items-center'>
                    <Image src={s2bLogo} alt='s2bLogo' width='40' height='40' layout='fixed' />
                    <div className="flex ml-2 items-center rounded-full bg-blue-100 p-2">
                    
                        <SearchIcon className="h-6"/>
                        <input type='text' className="hidden md:inline-flex flex-shrink ml-2 items-center bg-transparent outline-none placeholder-gray-500" placeholder="Search" />
                    </div>
                </div>
                <div className="flex justify-center flex-grow">
                    <div className="flex space-x-6 md:space-x-12">
                        <HeaderIcon active Icon={HomeIcon} />
                        <HeaderIcon Icon={FlagIcon} />
                        <HeaderIcon Icon={PlayIcon} />
                        <HeaderIcon Icon={ShoppingCartIcon} />
                        <HeaderIcon Icon={UserGroupIcon} />
                    </div>
                </div>
                <div className="flex items-center sm:space-x-2 justify-end">
                    <Image onClick={signOut} className="rounded-full cursor-pointer" src={session.user.image}
                        width={40} height={40} layout="fixed" alt='profile_pic'/>
                    <p className="whitespace-nowrap font-semibold pr-3">{session.user.name}</p>
                    <ViewGridIcon className="icon" />
                    <ChatIcon className="icon" />
                    <BellIcon className="icon"/>
                    <ChevronDownIcon className="icon" />
                </div>
            </div>
        )
    }
}

export default Header
