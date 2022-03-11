import * as React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  return (
    <article className='post'>
        <Link to={`/post/${post.id}`}>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
        </Link>
        {/* this link will take us to the individual post */}
        <p className='postBody'>{
            (post.body).length <= 25 
                ? post.body
                : `${(post.body).slice(0,25)}...`
        }</p>
        {/* if the post has less than 25 char it will show all, otherwise just show 25 char snippet.. */}
    </article>
  )
}

export default Post