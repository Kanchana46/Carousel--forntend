import * as api from '../api';
import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionType'

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        console.log('Actions')
        const action = { type: FETCH_ALL, payload: data }
        dispatch(action)
    } catch (error) {
        console.log(error)
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        const action = { type: CREATE, payload: data }
        console.log('Actions bef')
        dispatch(action)
        console.log('Actions aft')
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        console.log(data)
        const action = { type: UPDATE, payload: data }
        dispatch(action)
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        const action = { type: DELETE, payload: id }
        dispatch(action)
    } catch (error) {
        console.log(error)
    }
}


export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        const action = { type: UPDATE, payload: data }
        dispatch(action)
    } catch (error) {
        console.log(error)
    }
}