import { FOLLOW_USER, GET_ALL_MESSAGE, GET_ALL_USER, UNFOLLOW_USER, USER_CONNECTED } from "../../actions/userAction/authAction"

const initialState = {
    currentUser: [],
    following: [],
    users: [],
    allMessages: []

}

function getCurrentUserInfoReducer(state = initialState, action) {
    switch (action.type) {
        case USER_CONNECTED:
            return {
                ...state,
                currentUser: action.payload
            }
        case FOLLOW_USER: {
            state.following.map(function (f) {
                if (action.payload === f) {
                    return
                }
            })
            return {
                ...state,
                following: [action.payload, ...state.following],
            }
        }
        case UNFOLLOW_USER: {
            return {
                ...state,
                following: state.following.filter(
                    (id) => id !== action.payload
                )
            }
        }
        case GET_ALL_USER: {
            return {
                ...state,
                users: action.payload
            }
        }

        case GET_ALL_MESSAGE: {
            return {
                ...state,
                allMessages: action.payload
            }
        }
        default:
            return state
    }
}

export default getCurrentUserInfoReducer