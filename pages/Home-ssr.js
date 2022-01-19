import React, { useEffect } from "react";
import Head from 'next/head'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import Widgets from '../components/Widgets'
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";
//import fbObject from '../shared/users.js'
import Router from "next/router";
import { connect } from 'react-redux';
import { wrapper, State } from '../redux/store';
import { ADD_USER } from "../redux/ActionTypes";
//import { initialState } from "../redux/reducer";
import { USERS } from '../shared/users';

//const user = fbObject;
export default function Home({ props, posts }) {
    console.log('session home-ssr' + props)
    //console.log(fbObject)
    return (
        <>
            <div className='h-screen bg-gray-100 overflow-hidden'>
                <Head>
                    <title>Salon 2 Bomb</title>
                    <meta name="description" content="A small business resource site" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Header />
                <main className='flex' >
                    {/*<Sidebar session={state} />*/}
                    <Feed session={state} posts={posts} />
                    <Widgets />
                </main>
            </div>

            {//user?.isLoggedIn && (
                <>
                    <div className="card">
                        <div className="card-body">
                            {/*<Image className="rounded" src={picture} alt="Profile" />*/}
                            <p>Home</p>
                            <a href="#" className="btn btn-danger btn-sm" onClick={'fix'}>
                                Logout
                            </a>
                        </div>
                    </div>
                    <pre>{/*JSON.stringify(user, null, 2)*/}</pre>
                </>
            }
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => ({ req, res, ...etc }) => {
    //console.log('2. Page.getServerSideProps uses the store to dispatch things');
    //store.dispatch({ type: 'TICK', payload: 'was set in other page' });
    const initialState = {
        users: USERS,
        //pictures: PICTURES
    };
    const iState = initialState
    store.dispatch({ type: 'ADD_USER', payload: initialState});
	//console.log('2. InitialState'+initialState);

    const user = store.users;
    
    const posts = getDocs(collection(db, 'posts'));
    //const session = store
    //console.dir('dir picture '+user.picture)
    
    const docs = posts.docs.map((post) => ({
        id: post.id,
        ...post.data(),
        timestamp: null,
    }));

    //console.log('session homessr' + session)
    /*
    if (user === undefined) {
        res.setHeader("location", "/index");
        res.statusCode = 302;
        res.end();
        return {
            props: {
                user: { isLoggedIn: false, login: "", picture: "" },
                posts: docs
            },
        };
    }*/

    return {
        props: {
            user: user,
            posts: docs
        },
    }
});