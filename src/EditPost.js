import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const EditPost = ({
    posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle
}) => {
    const { id } = useParams(); //pulling the post detail from a parameter - gets the id attribvute set in the route
    const post = posts.find(post => (post.id).toString() === id); //this will give us the post of the url id number

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditBody, setEditTitle])
    //with this on page load the form will be filled out and ready to edit
  return (
    <main className="NewPost">
        {editTitle &&
           <>
                <h2>Edit Post</h2>
                <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="postTitle">Title:</label>
                    <input
                        id="postTitle"
                        type="text"
                        required
                        value={editTitle}
                        onChange={(e) =>  setEditTitle(e.target.value)}
                    />
                    <label htmlFor="postBody">Post:</label>
                    <textarea
                        id="postBody"
                        required
                        value={editBody}
                        onChange={(e) => setEditBody(e.target.value)}
                    />
                    <button type="submit" onClick={() => handleEdit(post.id)}>Submit</button>
                </form>
           </>
        }
        {!editTitle &&
            <>
                <h2>No Post Found</h2>
                <p>sorry!</p>
                <p>
                    <Link to='/'>Visit Our Homepage</Link>
                </p>
            </>
        }
    </main>
  )
}

export default EditPost;