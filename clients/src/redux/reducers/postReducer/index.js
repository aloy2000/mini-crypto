import { ADD_POST, GET_ALL_POST } from "../../actions/postAction/postAction";

const initialState = {
    allPosts: []
}

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_POST:
            return action.payload
            break
        case GET_ALL_POST:
            return {
                ...state,
                allPosts: action.payload
            }
            break
        default:
            return state
            break;
    }
}