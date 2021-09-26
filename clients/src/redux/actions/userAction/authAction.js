import axios from 'axios'

export const USER_CONNECTED = 'USER_CONNECTED'

export const fetchCurrentUserInfo =  (userId) => {
    try {
        return async dispatch => {
            const res = await axios.get(`http://192.168.43.15:7000/api/user/${userId}`)

            if(res.data) {
                console.log("res.data.res: " ,res.data)
                dispatch({
                    type:USER_CONNECTED,
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

