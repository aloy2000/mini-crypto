import { GET_ALL_MESSAGE, GET_ONE_MESSAGE } from "../../actions/messageAction/messageAction";


const initialState = {
    allMessage: [],
    message: [],
}

function messageReducer (state = initialState, action) {
    switch(action.type) {
        case GET_ALL_MESSAGE:
            return {
                ...state,
                allMessage: action.payload
            }
            break
        case GET_ONE_MESSAGE: 
            return{
                ...state,
                message: action.payload
            }
        default: 
            return state
    }
}

export default messageReducer