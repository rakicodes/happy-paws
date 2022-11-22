import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import postService from './postService'

const initialState = {
    posts: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
}

// add post
export const addPost = createAsyncThunk("post/add", async (post, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await postService.addPost(post, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString() 
        return thunkAPI.rejectWithValue(message)
    }
})

// get user posts
export const getUserPosts = createAsyncThunk("post/getLoggedInUserPost", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await postService.getUserPosts(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString() 
        return thunkAPI.rejectWithValue(message)
    }
})

// get posts
export const getPosts = createAsyncThunk("post/getAll", async (thunkAPI) => {
    try {
        return await postService.getPosts()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString() 
        return thunkAPI.rejectWithValue(message)
    }
})

// delete post
export const deletePost = createAsyncThunk("post/delete", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await postService.deletePost(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString() 
        return thunkAPI.rejectWithValue(message)
    }
})


export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(addPost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts.push(action.payload)
            })
            .addCase(addPost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getPosts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = action.payload
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getUserPosts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserPosts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = action.payload
            })
            .addCase(getUserPosts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deletePost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = state.posts.filter(post => post._id!==action.payload.id) 
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = postSlice.actions;
export default postSlice.reducer