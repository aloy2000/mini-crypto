import axios from 'axios'
import { HOST } from '@env'


export const LIKE = 'LIKE' 
export const DISLIKE = 'DISLIKE'

export const likeAction = (postId, userId) => {
    try {
        return async dispatch => {
            const res = await axios.patch(`http://${HOST}/api/user/likepost/${postId}`, {id: userId})
            if(res.data) {
                console.log("res.data.res: " ,res.data)
                dispatch({
                    type:LIKE,
                    payload: res.data
                })
            } else {
                console.log('unable to fetch data user')
            }
        }
    } catch (err) {
        console.log('error: ', err)
    }
}

export const disLikeAction = (postId, userId) => {
    try {
        return async dispatch => {
            const res = await axios.patch(`http://${HOST}/api/user/dislikepost/${postId}`, {id: userId})
            if(res.data) {
                console.log("res.data.res: " ,res.data)
                dispatch({
                    type:DISLIKE,
                    payload: res.data
                })
            } else {
                console.log('unable to fetch data user')
            }
        }
    } catch (err) {
        console.log('error: ', err)
    }
}

