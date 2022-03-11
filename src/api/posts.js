import axios from "axios";

//set base url
export default axios.create({
    baseURL: 'https://my-json-server.typicode.com/ktllama/blogdata'
});

//when you take a project live you would change your base url to whatever url you have from your host