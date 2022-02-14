/* eslint-disable no-unused-vars */
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import EditPost from './EditPost';
import About from './About';
import Missing from './Missing';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from './api/posts';

function App() {

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const history = useHistory();
  
  useEffect(() => {
    const fetchPosts = async () => {
      try{
        const response = await api.get('/posts'); //posts is endpoint
        setPosts(response.data); //json data is in .data - if unsure of what data wil return you can add if(response && response.data) and then set the posts
      } catch (err) {
        if (err.response) { //if the error response is defined
          //not in 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else { //if response is not defined (possible no response or 404) just log the error message
          console.log(`Error: ${err.message}`);

        }
      }
    }

    fetchPosts();
  },[]) //loadtime data fetching axios function
  //axios is easy to understand bc we use the verbs from CRUD- Get, Post, Put, Delete, Patch
  //axios takes care of converting data to json
  //it will also catch the errors for you when theyre not in the range of 200 http responses

  useEffect(() => {
    const filteredResults = posts.filter(post =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));
    //set both to lowercase so case doesnt matter
    //filter the bodys that match the char in the search state
    //use || or to look either through the body or title
    setSearchResults(filteredResults.reverse());
  },[posts, search])
  //will filter the POSTS we have to match our SEARCH- thats why both dependencies

  const handleSubmit = async (e) => {
    e.preventDefault();
    //define id for new post- need to find id of last post ( posts[posts.length-1] ) then reference id prop of that last post and add 1
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    //define date/time value with date-fns dependency
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    //create new post (this object below)
    const newPost = {id, title: postTitle, datetime, body: postBody};
    //create a new array with all of the posts with spread operator and adding newPost 
    try {
      const response = await api.post('/posts', newPost) //this will add the new post to the json file
      const allPosts = [ ...posts, response.data ]; //this will update the posts to include the post you just added to the json file
      setPosts(allPosts) //adding new post to state
      setPostTitle('');  //resetting post title and body for next post add
      setPostBody('');
      //after submitting new post route user back to home page
      history.push('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = {id, title: editTitle, datetime, body: editBody};
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(posts.map(post => post.id === id ? {...response.data } : post)); //only the id that matches the post we updated will be changed everything else will stay the same
      setEditTitle('');
      setEditBody('');
      history.push('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }
  //can use patch instead of put when updating specific fields
  //with put you replace the entire post

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`) //this is how you delete- want to sent the id through to know which one to delete
      const postsList = posts.filter(post => post.id !== id);
      //returning a list of all posts except the one wil the id passed here as an argument- bc that would have been the id associated with the delete click that calls this function
      setPosts(postsList);
      history.push('/');
      //now as a part of this function when you click the delete button it will serve the home component and route you there
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  return (
    <div className="App">
      <Header title="React Blog"/>
      <Nav search={search} setSearch={setSearch} />
        <Switch>
          <Route exact path="/">
            <Home posts={searchResults} />
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
          <Route path="/edit/:id">
            <EditPost 
              posts={posts}
              handleEdit={handleEdit}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}
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
