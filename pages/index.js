import Head from 'next/head'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import Feed from '../Components/Feed'
import Widgets from '../Components/Widgets'
import { useEffect, useState } from 'react'
import FacebookLoginComponent from '../Components/FacebookLogin'
import Router from "next/router";
import { wrapper } from '../redux/store'
import { initialState } from '../redux/reducer'
import { ADD_USER } from '../redux/ActionTypes'

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

export const getServerSideProps = wrapper.getServerSideProps(store => ({ req, res, ...etc }) => {
	store.dispatch({ type: ADD_USER, payload: initialState });
	console.log('2. InitialState');
	//ironSession(session)

	//if (req?.session.user) {
		//const user = req.session.user;
		const session = req.session;
		const docs = '';
		

		/*/
		if (req.session.get("user") === undefined) {
			if (user.admin !== true) {
				return {
					notFound: true,
				};
			}
			return;
		}*/

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
					//user: user,
					//session: session,
					posts: docs
				}
			}

		);
	},
)