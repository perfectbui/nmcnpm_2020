import React from 'react'

import Post from './Post/Post'
import './Posts.css'

const Posts = (props) => {
    console.log(props.posts);
    return (
        <div className="posts">
            {props.posts ? props.posts.map(post => <Post name={post.name} id={post._id} date={post.date} image={post.image} content={post.content}/>):null}
        </div>
    )
}

export default Posts;