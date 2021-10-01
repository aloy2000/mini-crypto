import { DISLIKE, LIKE, LIKE_OR_NOT } from "../../actions/userAction/likeAction";

const initialState = {
    like = false
}

const initialState2 = {
    dislike: false
}

export default function LikeReducer(state = initialState, action) {
    switch (action.type) {
        case LIKE:
            return {
                ...state,
                like: action.payload
            }

        default:
            return state
    }
}

export default function dislikeReducer(state = initialState2, action) {
    switch (action.type) {
        case DISLIKE:
            return {
                ...state,
                dislike: action.payload
            }

        default:
            return state
    }
}

