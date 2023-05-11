import React from 'react'
import VideoNews from '@/components/videoNews/videoNewsed'

function index({article}) {
    console.log("article", article);
    return (<>
            <VideoNews data={article}/>
        </>
    )
}
export default index
export async function getServerSideProps(context) {
    const {params} = context
    const {videoNews} = params
    return {
        props: {
            article: videoNews
        }
    }
}
