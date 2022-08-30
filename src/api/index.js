import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3600/api' });


export const fetchPosts = (slides) => API.get(`/carousel?slides=${slides}`);
export const createPost = (post) => API.post('/posts', post);