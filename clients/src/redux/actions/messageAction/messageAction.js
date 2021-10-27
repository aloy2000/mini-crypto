import axios from "axios";
import { HOST } from '@env'

export const GET_ALL_MESSAGE = "GET_ALL_MESSAGE"
export const GET_ONE_MESSAGE = "GET_ON_MESSAGE"

export const getAllMessageAction = () => {
    try {
        return async dispatch => {
            const res = await axios.get(`http://${HOST}:7000/api/message/getAllMessage`)

            if (res.data) {
                console.log("res.data.res: ", res.data)
                dispatch({
                    type: GET_ALL_MESSAGE,
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

export const getMessageInExistingConversationAction = (idConversation) => {
    try {
        return async dispatch => {
            const res = await axios.get(`http://${HOST}:7000/api/message/${idConversation}`)

            if (res.data) {
                if (res.data) {
                    console.log("res.data.res: ", res.data)
                    dispatch({
                        type: GET_ONE_MESSAGE,
                        payload: res.data.messages
                    })
                } else {
                    console.log('unable to fetch data user' + res.data)
                }
            }
        }
    } catch (e) {

    }
}
