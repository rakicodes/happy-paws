import axios from 'axios';

const API_URL = 'http://localhost:8000/api/posts/'

// add post
const addPost = async (post, token) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL+'add', post, config);

    return response.data
}

// get user post
const getUserPosts = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL+"user/"+id, config);

    return response.data
}

// get posts
const getPosts = async () => {
    const response = await axios.get(API_URL+"all");

    return response.data
}

// delete post
const deletePost = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL+id, config);

    return response.data
}


const postService = {
    addPost,
    getPosts,
    getUserPosts,
    deletePost,
}

export default postService