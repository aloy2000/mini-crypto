import { ADD_POST, GET_ALL_POST, GET_COMMENT_SCREEN, GET_POST_COMMENT, GET_POST_ID } from "../../actions/postAction/postAction";

const initialState = {
    allPosts: [],
    singlePost: [],
    commentScreen: false,
    postId: ''
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
        case GET_POST_COMMENT:
            return {
                ...state,
                singlePost: action.payload
            }
        case GET_COMMENT_SCREEN:
            return {
                ...state,
                commentScreen: action.payload
            }
        case GET_POST_ID:
            return {
                ...state,
                postId: action.payload
            }
        default:
            return state
            break;
    }
}