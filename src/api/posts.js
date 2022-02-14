import axios from "axios";

//set base url
export default axios.create({
    baseURL: 'http://localhost:3500'
});

//when you take a project live you would change your base url to whatever url you have from your host