import Head from 'next/head'
import Header from './Components/Header'
import Login from './Components/Login'
//import { getSession, useSession, signIn, signOut } from 'next-auth/react'
import Sidebar from './Components/Sidebar'
import Feed from './Components/Feed'
import Widgets from './Components/Widgets'
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";
import { FacebookLogin } from 'react-facebook-login'
//import FacebookLogin from 'react-facebook-login'
import { useState } from 'react'
import Image from 'next/image'
import { withIronSessionSsr } from "iron-session/next";
import { applySession } from 'next-iron-session'
import login from './api/login-auth'
import logout from './api/logout-auth'
import FacebookLoginComponent from './Components/FacebookLogin'
import userAuth from './api/user-auth'
//import { applySession, withIronSession } from 'next-iron-session'
//import { ironSession } from "next-iron-session";

const pWord = process.env.SECRET;

/*
const session = ({
	cookieName: "salon2bomb",
	password: pWord,
	ttl: 2147483647,
	// if your localhost is served on http:// then disable the secure flag
	cookieOptions: {
		secure: process.env.NODE_ENV === "production" | false,
	},
});*/

//ironSession(session)

//const ContextContainer = createContext(null);

//const caller = '';

export default function Home({ session, posts, req, res }) {
	const [fbCallback, setfbCallback] = useState(null)
	const [login, setLogin] = useState(false);
	const [data, setData] = useState({});
	const [picture, setPicture] = useState(null);

	const handleCallback = (childData) => {
		this.setfbCallback(childData)
		console.log('childData' + JSON.stringify(childData))
	}

	//if (req.session.get("user") === undefined) {
	if (!session) {
		//res.redirect("/restricted");
		console.log('User restricted')
		return <FacebookLoginComponent />;
	}

	/*
	const responseFacebook = (response) => {
		console.log(response);

		if (response.accessToken) {
			setLogin(true);
			setData(response);
			setPicture(response.picture.data.url);
			login(response)
			return
			//setfbCallback(response)
			//updateAppState({ ...appState, data: response });;
		} else {
			logout();
			setLogin(false);
			return
		}
	}*/

	//const { data: session } = useSession();

	//console.log(session);
	//if (!responseFacebook) {
		if (!session) {
			//console.log(session.status(context))
			return (
				<>
					{/*<Login />*/}
					{!login && (
						<FacebookLogin
							appId="622758242165850"
							autoLoad={false}
							fields="name,email,picture"
							scope="public_profile,email,user_friends"
							callback={responseFacebook}
							icon="fa-facebook"
							value={setData}
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
				</>
			)
		}
	//} else {
		//console.log('data = ' + JSON.stringify(responseFacebook));
		//console.log('data = ' + responseFacebook);
		//console.log('session = '+session)
		//console.log('caller = ' + JSON.stringify(data))
	/*	return (
			<>
				<Head>
					<title>Salon 2 Bomb</title>
					<meta name="description" content="A small business resource site" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Header />
				<main className='flex' >
					{/*<Sidebar session={session} />
					<Feed session={session} posts={posts} />
					<Widgets />
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
				</main>}*/

				{/*<div className='h-screen bg-gray-100 overflow-hidden'>
				</div>*/}
			//</>
		//)
	//}

	return (
		<div className='h-screen bg-gray-100 overflow-hidden'>
			<Head>
				<title>Salon 2 Bomb</title>
				<meta name="description" content="A small business resource site" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<main className='flex' >
				<Sidebar session={session} />
				<Feed session={session} posts={posts} />
				<Widgets />
			</main>
		</div>
	);
}

//export async function useServerSideProps(context, fbCallback) {
//Get user
//const [appState, setAppState] = useState('');
//const [appState, updateAppState] = useContext(ContextContainer);
//const session = await getSession(context);
//const session = {...context}
//const posts = await db.collection('posts').orderBy('timestamp', 'desc').get();

//const colRef = collection(db, "posts");
//const docRef = doc(db, "posts",
//const q = query(collection(db, 'posts'), where('name','==','Glenn Don Dadda Pickett'));
//const snapshot = await colRef.where('name','==','Glenn Don Dadda Pickett').get();

//console.log(JSON.stringify(context)+' context')
//console.log(JSON.stringify(JSON.parse(context))+' context')
//const querySnapshot = await getDocs(collection(db, 'posts'));
//const posts = await collection(db, "posts");


export const getServerSideProps = withIronSessionSsr(
	async function getServerSideProps({ req, res, session }) {
		//ironSession(session)

		//if( req.session.user ){
			const user = req.session.user| userAuth;
			//const session = await applySession(req, res);
		//}
		//console.log('session' + session)
		//console.log('user ' + user)
		//console.log('req ' + { req })
		//console.log('res ' + res)

		

		/*
		if (req.session.get("user") === undefined) {
			if (user.admin !== true) {
				return {
					notFound: true,
				};
			}
			return;
		}*/


		const posts = await getDocs(collection(db, 'posts'));
		//console.log('appState ' + appState);


		const docs = await posts.docs.map((post) => ({
			id: post.id,
			...post.data(),
			timestamp: null,
		}));

		/*
		const docs = await querySnapshot.forEach((post) =>({
			// doc.data() is never undefined for query doc snapshots
			//console.log(doc.id, " => ", doc.data());
			
				//id: doc.id,
				//doc.map((post)=>({
					id: post.id,
					...post.data(),
					timestamp: null,
				//}))
			}) 
		)*/

		/*
		const docs = onSnapshot(doc(db, "posts"), (doc) => {
			console.log("Current data: ", doc.data());
		});*/

		//let docu = JSON.parse(docs);
		//console.log(docu+' docu');
		//console.log(JSON.stringify(JSON.parse(doc+' docs1')))
		//console.log(JSON.stringify(docs+' docs2'))
		//console.log(JSON.parse(docs+' docs3'))
		//console.log(JSON.parse(JSON.stringify(docs+' docs4')))
		console.log('docs ' + docs)


		return (

			{
				props: {
					user: user,
					session: req.session,
					posts: docs
				}
			}

		);
	},
	{
		cookieName: "salo2bomb",
		password: process.env.SECRET,
		// secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
		cookieOptions: {
			secure: process.env.NODE_ENV === "production" | false,
		},
	},
)