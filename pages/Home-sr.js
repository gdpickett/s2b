import Head from 'next/head'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import Feed from '../Components/Feed'
import Widgets from '../Components/Widgets'
import {  useState } from 'react'
import { wrapper } from '../redux/store'
import { initialState } from '../redux/reducer'
import { ADD_USER } from '../redux/ActionTypes'
import { connect, useStore } from 'react-redux'

const Homesr = ({ user, props, users, posts, req, res }) => {
	const [login, setLogin] = useState(false);
	const [data, setData] = useState({});
	const [picture, setPicture] = useState(null);

	const store = useStore()
	const session = store.getState()
	//store.dispatch({ type: ADD_USER, payload: initialState }); 
	
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
export default connect(state => state)(Homesr)

export const getStaticProps = wrapper.getStaticProps(store => () => {
	//console.log('2. Page.getStaticProps uses the store to dispatch things');
	//store.dispatch({type: 'TICK', payload: 'was set in other page ' + preview});
	store.dispatch({ type: ADD_USER, payload: initialState });

	const user = initialState;

	
	return (

		{
			props: {
				user,
			}
		}

	);
});