import Image from "next/image";
import { useState } from "react";
import FacebookLogin from "react-facebook-login";
import glam from '../pages/assets/bomb-glam.png';
import useUser from "../lib/useUser";
import fetchJson, { FetchError } from "../lib/fetchJson";

/*
export function Login() {
    // here we just check if user is already logged in and redirect to profile

    return (
        <Layout>
            <div className="login">
                <Form


                    
        
          />
            </div>
            <style jsx>{`
          .login {
            max-width: 21rem;
            margin: 0 auto;
            padding: 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
        `}</style>
        </Layout>
    );
}*/
function FacebookLoginComponent({ session }, props) {
    const [login, setLogin] = useState(false);
    const [data, setData] = useState({});
    const [picture, setPicture] = useState("");

    const { mutateUser } = useUser({
        redirectTo: "../index.js",
        redirectIfFound: true,
    });

    const [errorMsg, setErrorMsg] = useState("");

    const responseFacebook = (response) => {
        //console.log(response);
        // Login failed
        if (response.status === "unknown") {
            //alert("Login failed!");
            setLogin(false);
            //props.callback = response;
            //console.log('data failed '+data)
            //console.log('response failed '+JSON.stringify(response))
            //return false;

        }
        setData(response);
        setPicture(response.picture.data.url);
        if (response.accessToken) {
            console.log('access token ' + response)
            setLogin(true);
            setData(response);

            this.props.callback = response;
            return loginAuth(response);
            //return response;
        } else {
            setLogin(false);
            //props.callback = JSON.stringify(response);
            return response;
        }
    };
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
                <FacebookLogin
                    appId="622758242165850"
                    autoLoad={false}
                    fields="name,email,picture"
                    scope="public_profile,email,user_friends"
                    callback={responseFacebook}
                    icon="fa-facebook"
                    data={setData}
                    errorMessage={errorMsg}
                    onSubmit={async function handleSubmit(event) {
                        event.preventDefault();

                        const body = {
                            username: event.currentTarget.username.value,
                        }

                        try {
                            mutateUser(
                                await fetchJson("/api/login", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(body),
                                }),
                            );
                        } catch (error) {
                            if (error instanceof FetchError) {
                                setErrorMsg(error.data.message);
                            } else {
                                console.error("An unexpected error happened:", error);
                            }
                        }
                    }}
                />
            )}

            {login && (
                <div className="card">
                    <div className="card-body">
                        <Image className="rounded" src={picture} alt="Profile" />
                        <h5 className="card-title">{data.name}</h5>
                        <p className="card-text">Email ID: {data.email}</p>
                        <a href="#" className="btn btn-danger btn-sm" onClick={logout}>
                            Logout
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FacebookLoginComponent;