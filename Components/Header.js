import Image from "next/image"
import s2bLogo from '../pages/assets/bomb2.png';
import { BellIcon, ChatIcon, ChevronDownIcon, HomeIcon, UserGroupIcon, ViewGridIcon } from '@heroicons/react/solid';
import { FlagIcon, PlayIcon, SearchIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import HeaderIcon from "./HeaderIcon";
import { useStore } from "react-redux";

function Header() {
    const store = useStore()
    const state = store.getState()

    //console.log('Header '+JSON.stringify(state.nextState.nextState.users[0].accessToken))
    const url = state.addUser.users[0].picture.data.url
    const access = JSON.stringify(state.addUser.users[0].accessToken)
    const session = JSON.stringify(state.addUser.users[0])

    const signOut = () => {
        setLogin(false);
        setData({});
        setPicture("");
        return logoutAuth;

    };

    //if (session) {
    //console.log('header user is' + user)
    return (
        <>
            {//access === true && (
                <div className='sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md'>
                    <div className='flex items-center'>
                        <Image src={s2bLogo} alt='s2bLogo' width='40' height='40' layout='fixed' />
                        <div className="flex ml-2 items-center rounded-full bg-blue-100 p-2">

                            <SearchIcon className="h-6" />
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
                        <Image onClick={signOut} className="rounded-full cursor-pointer" src={url}
                            width={40} height={40} layout="fixed" alt='profile_pic' />
                        <p className="whitespace-nowrap font-semibold pr-3">{session.name}</p>
                        <ViewGridIcon className="icon" />
                        <ChatIcon className="icon" />
                        <BellIcon className="icon" />
                        <ChevronDownIcon className="icon" />
                    </div>
                    {/* In this case, we're fine with linking with a regular a in case of no JavaScript */}
                    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                    <a
                        href="/api/logout"
                        onClick={async (e) => {
                            e.preventDefault();
                            mutateUser(
                                await fetchJson("/api/logout", { method: "POST" }),
                                false,
                            );
                            router.push("/login");
                        }}
                    >
                        Logout
                    </a>
                </div>
                //)}
            }
        </>
    )
}

export default Header

