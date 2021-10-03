import axios from "axios";
import { HOST } from '@env'

export const GET_ALL_POST = "GET_ALL_POST"
//export const GET_POST = "GET_POST"
export const GET_POST_ERRORS = "GET_POST_ERRORS"
export const ADD_POST = "ADD_POST"

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
            dispatch({type:GET_ALL_POST, payload: res.data})
        }))
    }
}
