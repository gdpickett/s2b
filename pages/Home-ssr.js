import React, { useEffect } from "react";
import Head from 'next/head'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import Feed from '../Components/Feed'
import Widgets from '../Components/Widgets'
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
export default function Home({ state, posts }) {
    console.log('session home-ssr' + state)
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
                    <Sidebar session={State} />
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
    };
    const iState = initialState
    store.dispatch({ type: ADD_USER, payload: iState });
	console.log('2. InitialState'+initialState);

    const user = store.user;
    //console.log('Home-ssr store ' + JSON.stringify(store))
    const posts = getDocs(collection(db, 'posts'));

    /*
    const docs = posts.docs.map((post) => ({
        id: post.id,
        ...post.data(),
        timestamp: null,
    }));*/

    //console.log('session homessr' + session)

    if (user === undefined) {
        res.setHeader("location", "/index");
        res.statusCode = 302;
        res.end();
        return {
            props: {
                user: { isLoggedIn: false, login: "", picture: "" },
                posts: {}
            },
        };
    }

    return {
        props: {
            user: store.users,
            session: store.users,
            //posts: docs
            //posts: posts
        },
    }
});