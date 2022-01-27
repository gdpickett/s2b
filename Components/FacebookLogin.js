import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import FacebookLogin from "react-facebook-login";
import { connect, useStore } from "react-redux";
import glam from '../pages/assets/bomb-glam.png';

function FacebookLoginComponent() {
    const [login, setLogin] = useState(false);
    const [data, setData] = useState({});
    const [picture, setPicture] = useState("");
    const store = useStore()
    const state = store.getState()

    //() => {
    const responseFacebook = useEffect((response) => {
        console.log(response);
        // Login failed
        if (!response) return;
        if (response.status === "unknown") {
            //alert("Login failed!");

            //props.callback = response;
            //console.log('data failed '+data)
            //console.log('response failed '+JSON.stringify(response))
            //return false;
            return setLogin(false);
        }

        if (response.accessToken) {
            console.log('access token ' + response)

            setLogin(true);
            setData(response);
            setPicture(response.picture.data.url);
            store.dispatch({ type: 'ADD_USER', payload: data });
            //this.props.callback = response;

            //return response;
        } else {
            setLogin(false);
            //props.callback = JSON.stringify(response);
            return response;
        }
    }, [store, data, login]
    );

    const logout = () => {
        setLogin(false);
        setData({});
        setPicture("");
        return logoutAuth;

    };

    return (
        <div className="grid place-items-center">
            <Image src={glam} height={400} width={400} objectFit="contain" alt='logo' />
            {/*<h1 className="p-5 bg-blue-500 rounded-full text-white text-center cursor-pointer"
                onClick={signIn}>Login Options</h1>*/}


            {!login && (
                <>
                    <FacebookLogin
                        appId="622758242165850"
                        autoLoad={false}
                        fields="name,email,picture"
                        scope="public_profile,email,user_friends"
                        callback={responseFacebook}
                        icon="fa-facebook"
                    />
                    <br />
                    <div className="flex items-center">
                        <p>
                            You can only login if you have a test account
                        </p>
                        <br />
                        <p className='text-blue-400 flex items-center relative'>
                            <Link href='Home-sr'>View Demo</Link>
                        </p>
                    </div>
                </>
            )}

            {/*login && (
                
                <>
                    <Home />
                    <div>Going Home Yet</div>
                </>
            )*/}
        </div>
    );
}

export default connect(state => state)(FacebookLoginComponent);