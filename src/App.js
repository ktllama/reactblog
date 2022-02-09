/* eslint-disable no-unused-vars */
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

function App() {

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    }
  ])
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    //define id for new post- need to find id of last post ( posts[posts.length-1] ) then reference id prop of that last post and add 1
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    //define date/time value with date-fns dependency
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    //create new post (this object below)
    const newPost = {id, title: postTitle, datetime, body: postBody};
    //create a new array with all of the posts with spread operator and adding newPost 
    const allPosts = [ ...posts, newPost ];
    setPosts(allPosts) //adding new post to state
    setPostTitle('');  //resetting post title and body for next post add
    setPostBody('');
    //after submitting new post route user back to home page
    history.push('/');
  }

  const handleDelete = (id) => {
    const postsList = posts.filter(post => post.id !== id);
    //returning a list of all posts except the one wil the id passed here as an argument- bc that would have been the id associated with the delete click that calls this function
    setPosts(postsList);
    history.push('/');
    //now as a part of this function when you click the delete button it will serve the home component and route you there
  }

  return (
    <div className="App">
      <Header title="React Blog"/>
      <Nav search={search} setSearch={setSearch} />
        <Switch>
          <Route exact path="/">
            <Home posts={posts} />
          </Route>
          <Route exact path="/post">
            <NewPost 
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
            />
          </Route>
          <Route path="/post/:id">
            <PostPage posts={posts} handleDelete={handleDelete} />
          </Route>
          <Route path="/about" component={About} />
          <Route path="*" component={Missing} />
        </Switch> 
      <Footer />
    </div>
  );
}

export default App;
