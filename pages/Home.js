import React from "react";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";
import Head from 'next/head'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import Feed from '../Components/Feed'
import Widgets from '../Components/Widgets'
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";
import logout from "./api/logout";

export default function Home({ user }) {

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
                    <Sidebar session={user} />
                    <Feed session={user} posts={posts} />
                    <Widgets />
                </main>
            </div>

            {user?.isLoggedIn && (
                <>
                    <div className="card">
                        <div className="card-body">
                            {/*<Image className="rounded" src={picture} alt="Profile" />*/}
                            <p>Home</p>
                            <a href="#" className="btn btn-danger btn-sm" onClick={logout}>
                                Logout
                            </a>
                        </div>
                    </div>
                    <pre>{JSON.stringify(user, null, 2)}</pre>
                </>
            )}
        </>
    );
}

export const getServerSideProps = withIronSessionSsr(async function ({
    req,
    res,
}) {
    const user = req.session.user;
    const posts = await getDocs(collection(db, 'posts'));
    const docs = await posts.docs.map((post) => ({
        id: post.id,
        ...post.data(),
        timestamp: null,
    }));

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
            user: req.session.user,
            session: req.session,
            posts: docs
        },
    };
},
    sessionOptions);