import { useParams, Link } from 'react-router-dom';

const PostPage = ({ posts, handleDelete }) => {
    const { id } = useParams();
    //custom hook from router- an arguement that can be passed to a route- here the param/arg is id (as specified in route in app.js)
    const post = posts.find(post => (post.id).toString() === id)
    //this will find the indv post we want to display- need to make the id from data a string or use == instead of === bc the id from the route is a string
    //SO.. useParams is taking the id (string) that is in the route and setting post var to the post with an id that matches the params id

    return (
        <main className='PostPage'>
            <article className='post'>
                {post && //if post is true THEN we will display this
                    <>
                        <h2>{post.title}</h2>
                        <p className='postDate'>{post.datetime}</p>
                        <p className='postBody'>{post.body}</p>
                        <button onClick={() => handleDelete(post.id)}>
                            Delete Post
                        </button>
                    </>
                }
                {!post && //if post does not exist (is false) this will display
                    <>
                        <h2>Post Not Found</h2>
                        <p>SORRY :/</p>
                        <p><Link to="/">Visit Our Homepage</Link></p>
                    </>
                }
            </article>
        </main>
    )
};

export default PostPage;