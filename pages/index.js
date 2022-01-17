import Head from 'next/head'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import Feed from '../Components/Feed'
import Widgets from '../Components/Widgets'
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";
import { useState } from 'react'
import { withIronSessionSsr } from "iron-session/next";
import logout from './api/logout'
import FacebookLoginComponent from '../Components/FacebookLogin'
import userAuth from './api/user'

export default function Home({ session, posts, req, res }) {
	//const [fbCallback, setfbCallback] = useState(null)
	const [login, setLogin] = useState(false);
	const [data, setData] = useState({});
	const [picture, setPicture] = useState(null);

	/*
	const handleCallback = (childData) => {
		this.setfbCallback(childData)
		console.log('childData' + JSON.stringify(childData))
	}*/

	//if (req.session.get("user") === undefined) {

	if (!session) {
		//res.redirect("/restricted");
		console.log('User restricted')
		return <FacebookLoginComponent callback={data} />
	}

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
			{login && (
				<div className="card">
					<div className="card-body">
						{/*<Image className="rounded" src={picture} alt="Profile" />*/}
						<p>Index</p>
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

export const getServerSideProps = withIronSessionSsr(
	async function getServerSideProps({ req }) {
		//ironSession(session)

		//if( req.session.user ){
		const user = req.session.user | userAuth;
		const session = req.session;
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



		//console.log('appState ' + appState);




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
		//console.log('docs ' + docs)


		return (

			{
				props: {
					user: user,
					session: req.session,
					//posts: docs
				}
			}

		);
	},
	{
		cookieName: "salon2bomb",
		password: process.env.SECRET,
		// secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
		cookieOptions: {
			secure: process.env.NODE_ENV === "production" | false,
		},
	},
)