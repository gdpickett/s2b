import Image from "next/image"
import glam from '../assets/bomb-glam.png';
import { signIn } from 'next-auth/react'
import FacebookLoginComponent from "./FacebookLogin";

function Login({session}) {
    return (
        <div className="grid place-items-center">
            <Image src={glam} height={400} width={400} objectFit="contain" alt='logo'/>
            <h1 className="p-5 bg-blue-500 rounded-full text-white text-center cursor-pointer"
                onClick={signIn}>Login Options</h1>

        </div>
    )
}

export default Login
