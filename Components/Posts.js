import { useCollection } from 'react-firebase-hooks/firestore'
import { collection } from 'firebase/firestore';
import { db } from '../firebase'
import Post from './Post';

const Posts = ({ posts }) => {
    const [realtimePosts, loading, error] = useCollection(
        //collection(db, 'posts').orderBy('timestamp', 'desc')
        collection(db, 'posts')
    );

    return (
        <div key='posts'>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Posts: Loading...</span>}
            {realtimePosts ?
                realtimePosts.docs.map((post) => (
                    <>
                        <Post key={post.key} name={post.data().name} message={post.data().message} email={post.data().email}
                            image={post.data().image} postImage={post.data().postImage} timestamp={post.data().timestamp} />
                    </>
                ))
                :
                posts ?
                    posts.map((post) => {
                        <>
                            <Post key={post.key} name={post.data().name} message={post.data().message} email={post.data().email}
                                image={post.data().image} postImage={post.data().postImage} timestamp={post.data().timestamp} />
                        </>
                    })
                    :
                    <br />
            }
        </div>
    )
}

export default Posts
