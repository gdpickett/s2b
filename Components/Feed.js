import Stories from "./Stories"
import InputBox from "./InputBox"
import Posts from './Posts'

function Feed({session, posts}) {
    //if(!session) return <div></div>;
    console.log('session Feed'+session)
    return (
        <div className="flex-grow h-screen pb-44 pt-6 mr-4 xl:mr-40 overflow-y-auto scrollbar-hide">
            <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
                <Stories />
                <InputBox session={session} />
				<Posts posts={posts} />
            </div>
        </div>
    )
}

export default Feed
