import { USER_CONNECTED } from "../../actions/userAction/authAction"

const initialState = { currentUser: {} }

function getCurrentUserInfo(state = initialState, action) {
    let nextState
    switch (action.type) {
        case USER_CONNECTED:
            return nextState = {
                ...state,
                currentUser: action.currentUser
            }
            break

        default:
            return state
    }
}

export default getCurrentUserInfo