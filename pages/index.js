import Head from 'next/head'
import Header from './Components/Header'
import Login from './Components/Login'
import { getSession, useSession, signIn, signOut } from 'next-auth/react'
import Sidebar from './Components/Sidebar'
import Feed from './Components/Feed'
import Widgets from './Components/Widgets'
import { db } from '../firebase';

export default function Home({posts}) {
	const { data: session } = useSession()
	//console.log(session);
	if(!session) return <Login />;
	return (
		<div className='h-screen bg-gray-100 overflow-hidden'>
			<Head>
				<title>Salon 2 Bomb</title>
				<meta name="description" content="A small business resource site" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header/>
			<main className='flex' >
				<Sidebar session={session}/>
				<Feed session={session} posts={posts} />
				<Widgets />
			</main>
		</div>
	);
}

export async function getServerSideProps(context){
	//Get user
	const session = await getSession(context);
	const posts = await db.collection('posts').orderBy('timestamp', 'desc').get();

	const docs = posts.docs.map((post)=>({
		id: post.id,
		...post.data(),
		timestamp: null,
	}));

	return {
		props: {
			session,
			posts: docs,
		},
	};
}