import { getData } from '../../../screens/LoginScreen/utils/storeData'

export const USER_CONNECTED = 'USER_CONNECTED'

export const fetchCurrentUserInfo = () => {
    let userId;
    return ((dispach) => {
        getData().then((val) => {
            userId = val
        }).catch(err => console.log("error:", err))

        if (userId) {
            fetch('http://192.168.45.15:7000/api/user/' + userId)
                .then(res => res.json())
                .then(data => {
                    dispach({ type: USER_CONNECTED, currentUser: data })
                }).catch(e => console.log("error: ", e))
        }
        else {
            console.log('user id not found')
        }
    })
} 