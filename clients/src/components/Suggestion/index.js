import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ProfilImage from '../ProfilImage'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCurrentUserInfo, followUser, unFollowUser } from '../../redux/actions/userAction/authAction'

const Suggestion = ({ user }) => {
    const dispatch = useDispatch()
    const [isAleardyFollow, setIsAlreadyFollow] = useState('Suivre')
    const { currentUser } = useSelector(state => state.getCurrentUserInfoReducer);


    //const [pressed, setPressed] = useState('pressed')


    useEffect(() => {
        //console.warn(" id ", user)
        if (user.followers.length === 0) {
            //console.warn(" id ", user)
            setIsAlreadyFollow('Suivre')
        } else {
            user.followers.map(function (e) {
                if (e === currentUser._id) {
                    //console.warn(" id 15", e)
                    setIsAlreadyFollow("Se desabonner")
                } else {
                    setIsAlreadyFollow("Suivre")
                }
            })
        }


    }, [])

    const followPress = () => {
        //console.log(user);
        //setPressed("sdfsdfklmsdlfks")
        if (user.followers.length === 0) {
            setIsAlreadyFollow('Se desabonner')
            const follow = () => dispatch(followUser(currentUser._id, user._id))
            follow()
            const userDispatch = () => dispatch(fetchCurrentUserInfo(currentUser._id))
            userDispatch()
        }
        else {
            user.followers.map(function (f) {

                if (f === currentUser._id) {
                    console.warn(" id 4545", user)

                    console.warn(true)
                    setIsAlreadyFollow("Suivre")
                    const unfollow = () => dispatch(unFollowUser(currentUser._id, user._id))
                    unfollow()
                        .then(() => console.log("yessss"))
                        .catch((e) => console.log("errer zandry a", e))
                    const userDispatch = () => dispatch(fetchCurrentUserInfo(currentUser._id))
                    userDispatch()
                } else {
                    setIsAlreadyFollow("Se desabonner")
                    const follow = () => dispatch(followUser(currentUser._id, user._id))
                    follow()
                    const userDispatch = () => dispatch(fetchCurrentUserInfo(currentUser._id))
                    userDispatch()
                }
            })
        }

    }

    return (
        <View style={styles.container} >
            <View style={styles.container2}>
                <ProfilImage uri={user.profile} size={60} />
                <Text style={styles.text} >{user.pseudo}</Text>
            </View>
            <TouchableOpacity style={styles.btn} onPress={followPress} >
                <Text style={styles.text} > {isAleardyFollow} </Text>

            </TouchableOpacity>
        </View>
    )
}

export default Suggestion

const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        borderRadius: 5,
        //justifyContent: 'center',
        width: 160,
        height: 200,
        borderWidth: 2,
        //borderLeftWidth: 1,
        borderStyle: 'solid',
        borderColor: '#40B5AD'
    },
    container2: {
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
    },
    btn: {
        padding: 5,
        alignSelf: 'flex-start',
        borderWidth: 1,
        marginTop: 40,
        marginLeft: 9,
        backgroundColor: '#40B5AD',
        borderColor: '#40B5AD',
        fontSize: 20,
        color: '#fff',
        width: 140
    }
})
