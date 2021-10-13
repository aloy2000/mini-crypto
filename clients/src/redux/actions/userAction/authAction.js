import axios from 'axios'
import { HOST } from '@env'


export const USER_CONNECTED = 'USER_CONNECTED'
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";
export const GET_ALL_USER = "GET_ALL_USER"


export const fetchCurrentUserInfo = (userId) => {
    try {
        return async dispatch => {
            const res = await axios.get(`http://${HOST}:7000/api/user/${userId}`)

            if (res.data) {
                console.log("res.data.res: ", res.data)
                dispatch({
                    type: USER_CONNECTED,
                    payload: res.data
                })
            } else {
                console.log('unable to fetch data user' + res.data)
            }
        }
    } catch (err) {
        console.log('error: ', err)
    }
}

export const followUser = (followerid, idToFollow) => {
    try {
        return async dispatch => {
            const res = await axios.patch(`http://${HOST}:7000/api/user/follow/${followerid}`, { idToFollow: idToFollow })
            if (res.data) {
                dispatch({
                    type: FOLLOW_USER,
                    payload: idToFollow
                })
            }
        }
    } catch (e) {
        console.log('error: ', err)
    }
}

export const unFollowUser = (followerid, idToUnfollow) => {
    try {
        return async dispatch => {
            const res = await axios.patch(`http://${HOST}:7000/api/user/unfollow/${followerid}`, { idToUnFollow: idToUnfollow })
            if (res.data) {
                dispatch({
                    type: UNFOLLOW_USER,
                    payload: idToUnfollow
                })
            }
        }
    } catch (e) {
        console.log('error unfollow: ', err)
    }
}

export const getAllUsers = () => {
    try {
        return async dispatch => {
            const res = await axios.get(`http://${HOST}:7000/api/user`)
            if (res.data) {
                dispatch({
                    type: GET_ALL_USER,
                    payload: res.data.users
                })
            }
        }
    } catch (e) {
        console.log('error unfollow: ', err)
    }
}