import axios from "axios";

//set base url
export default axios.create({
    baseURL: 'http://localhost:3500'
})