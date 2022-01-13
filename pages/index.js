import Head from 'next/head'
import Header from './Components/Header'
import Login from './Components/Login'
import { getSession, useSession, signIn, signOut } from 'next-auth/react'
import Sidebar from './Components/Sidebar'
import Feed from './Components/Feed'
import Widgets from './Components/Widgets'
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";

export default function Home({ posts }) {
	const { data: session } = useSession()
	//console.log(session);
	if (!session) return <Login />;
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

export async function getServerSideProps(context) {
	//Get user
	const session = await getSession(context);
	//const posts = await db.collection('posts').orderBy('timestamp', 'desc').get();

	//const colRef = collection(db, "posts");
	//const docRef = doc(db, "posts",
	//const q = query(collection(db, 'posts'), where('name','==','Glenn Don Dadda Pickett'));
	//const snapshot = await colRef.where('name','==','Glenn Don Dadda Pickett').get();


	//const querySnapshot = await getDocs(collection(db, 'posts'));
	//const posts = await collection(db, "posts");
	const posts = await getDocs(collection(db, 'posts'));
	
	const docs = await posts.docs.map((post)=>({
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

	return {
		props: {
			session,
			posts: docs,
		},
	};
}