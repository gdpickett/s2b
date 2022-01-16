import Image from "next/image"
import { ChatAltIcon, ShareIcon, ThumbUpIcon } from '@heroicons/react/outline'
import 'firebase/firestore'

function Post({ key, name, message, image, postImage, timestamp }) {
    const d = timestamp && timestamp.toDate()
    let curDate = new Intl.DateTimeFormat('en-US', { weekday:'long', year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(d)
    
    return (
        <>
            <div key={key} >

                <div className="flex flex-col" >
                    <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Image className="rounded-full" src={image} width={40} height={40} alt='' />
                            <div>
                                <p className="font-medium">{name}</p>
                                <p className="text-xs text-gray-400">{curDate}</p>
                            </div>
                        </div>
                        <p className="pt-4">{message}</p>
                    </div>
                    {postImage && (
                        <div className="relative h-56 md:h-96 bg-white">
                            <Image src={postImage} objectFit='cover' layout='fill' alt='' />
                        </div>
                    )}
                    <div className="flex justify-center items-center shadow-md rounded-b-2xl bg-white text-gray-400 border-t">
                        <div className="inputIcon rounded-none rounded-bl-2xl">
                            <ThumbUpIcon className='h-4' />
                            <p className="text-xs sm:text-base">Like</p>
                        </div>
                        <div className="inputIcon rounded-none">
                            <ChatAltIcon className='h-4' />
                            <p className="text-xs sm:text-base">Comment</p>
                        </div>
                        <div className="inputIcon rounded-none rounded-br-2xl">
                            <ShareIcon className='h-4' />
                            <p className="text-xs sm:text-base">Share</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Post
