import { USER_CONNECTED } from "../../actions/userAction/authAction"

const initialState = { currentUser: [] }

function getCurrentUserInfoReducer(state = initialState, action) {
    switch (action.type) {
        case USER_CONNECTED:
            return {
                ...state,
                currentUser: action.payload
            }

        default:
            return state
    }
}

export default getCurrentUserInfoReducer