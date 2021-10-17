import axios from "axios";
import { HOST } from '@env'

export const GET_ALL_POST = "GET_ALL_POST"
export const GET_POST_COMMENT = "GET_POST"
export const GET_POST_ERRORS = "GET_POST_ERRORS"
export const ADD_POST = "ADD_POST"
export const GET_COMMENT_SCREEN = "GET_COMMENT_SCREEN"
export const GET_POST_ID = "GET_POST_ID"

//eto za fa go matory lo fa valaka 

export const addPost = (data) => {
    return async (dispatch) => {
        await axios.post(`http://${HOST}:7000/api/post/createPost`).then(res => {
            if (res.data.errors) {
                dispatch({ type: GET_POST_ERRORS, payload: res.data.errors });
            } else {
                dispatch({ type: ADD_POST, payload: "" });
            }
        })
    }
}

export const getPost = () => {
    return (dispatch) => {
        axios.get(`http://${HOST}:7000/api/post/getAllPosts`)
            .then(((res) => {
                dispatch({ type: GET_ALL_POST, payload: res.data })
            }))
    }
}

export const getComment = (idPost) => {
    return async (dispatch) => {
        await axios.get(`http://${HOST}:7000/api/post/${idPost}`)
            .then((res) => {
                dispatch({ type: GET_POST_COMMENT, payload: res.data.comments })
                console.warn(res.data)
            }).catch(e => console.log("error", e))
    }
}

export const getPostId = (idPost) => {
    return dispatch => {
        dispatch({ type: GET_POST_ID, payload: idPost })
    }
}

export const getCommentScreen = (val) => {
    return dispatch => {
        dispatch({ type: GET_COMMENT_SCREEN, payload: val })
    }
}
