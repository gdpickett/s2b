import Image from "next/image";
import { useEffect, useState } from "react";
import FacebookLogin from "react-facebook-login";
import { connect, useStore } from "react-redux";
import glam from '../pages/assets/bomb-glam.png';

function FacebookLoginComponent({ session }, props) {
    const [login, setLogin] = useState(false);
    const [data, setData] = useState({});
    const [picture, setPicture] = useState("");
    const store = useStore()
    const state = store.getState()

    const responseFacebook = (response) => {
        console.log(response);
        // Login failed
        
        if (response.status === "unknown") {
            //alert("Login failed!");
            
            //props.callback = response;
            //console.log('data failed '+data)
            //console.log('response failed '+JSON.stringify(response))
            //return false;
            return setLogin(false);;

        }
        
        if (response.accessToken) {
            console.log('access token ' + response)
            
            setLogin(true);
            setData(response);
            setPicture(response.picture.data.url);

            //this.props.callback = response;
            
            //return response;
        } else {
            setLogin(false);
            //props.callback = JSON.stringify(response);
            return response;
        }
    };
    
    useEffect(() => {
		if (login === true) {
			//session = JSON.stringify(user.users); 
			store.dispatch({ type: 'ADD_USER', payload: data }); 
			//session= store.getState()
		}
	});

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
                    
                />
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