import Image from "next/image";
import { useState } from "react";
import FacebookLogin from "react-facebook-login";

function FacebookLoginComponent({ session }, props) {
    const [login, setLogin] = useState(false);
    const [data, setData] = useState({});
    const [picture, setPicture] = useState("");

    const responseFacebook = (response) => {
        //console.log(response);
        // Login failed
        if (response.status === "unknown") {
            //alert("Login failed!");
            setLogin(false);
            //props.callback = response;
            //console.log('data failed '+data)
            console.log('response failed '+JSON.stringify(response))
            //return false;
            return response;
        }
        //setData(response);
        //setPicture(response.picture.data.url);
        if (response.accessToken) {
            console.log('access token '+response)
            setLogin(true);
            //this.props.callback = response;
            return response;
        } else {
            setLogin(false);
            props.callback = JSON.stringify(response);
            return response;
        }
    };
    const logout = () => {
        setLogin(false);
        setData({});
        setPicture("");
    };

    return (
        <div className="container">
            {!login && (
                <FacebookLogin
                    appId="622758242165850"
                    autoLoad={false}
                    fields="name,email,picture"
                    scope="public_profile,email,user_friends"
                    callback={responseFacebook}
                    icon="fa-facebook"
                    data={setData}
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
