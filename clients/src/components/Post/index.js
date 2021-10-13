import React, { useEffect, useState } from 'react'
import { StyleSheet,  View } from 'react-native'
import axios from 'axios'
import moment from 'moment'

import Header from './Header'
import Body from './Body'
import Footer from './Footer'
import { HOST } from '@env'
import { useSelector, useDispatch } from 'react-redux'




const Post = ({ post, likersCount, navigation }) => {
    const [nameOfPoster, setNameOfPoster] = useState('');
    const [time, setTime] = useState(moment(post.createdAt).fromNow())
    const { currentUser } = useSelector(state => state.getCurrentUserInfoReducer);


    useEffect(async () => {
        try {
            const res = await axios.get(`http://${HOST}:7000/api/user/${post.posterId}`)
            console.log("response: ", res.data)
            if (res.data) {
                setNameOfPoster(res.data.pseudo)
            } else {
                console.log("unable to find user poster")
            }
        } catch (err) {
            console.log("error 400:", err)
        }
        setTime(moment(post.createdAt).fromNow())

    }, [])

    return (
        <View style={styles.container}>
            <Header imageUri={currentUser.profile} name={nameOfPoster} />
            <Body imageUri={post.picture} />
            <Footer likes={likersCount} postId={post._id} caption={post.message} postedAt={time} listPostLikers={post.likers} navigation={navigation}  />
        </View>
    )
}

export default Post

const styles = StyleSheet.create({
    container: {
        marginBottom: 30,
    }
})
