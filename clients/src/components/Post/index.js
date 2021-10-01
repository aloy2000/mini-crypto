import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import axios from 'axios'
import moment from 'moment'

import Header from './Header'
import Body from './Body'
import Footer from './Footer'
import { HOST } from '@env'



const Post = ({ post, likersCount, navigation }) => {
    const [nameOfPoster, setNameOfPoster] = useState('');
    const [time, setTime] = useState(moment(post.createdAt).fromNow())

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
            <Header imageUri={"https://scontent.ftnr1-1.fna.fbcdn.net/v/t1.6435-9/216705479_1078869752640193_612906026221720555_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeF3_XbH6MGOZbpfZfbUtaR0Kb3QkMBz-oUpvdCQwHP6hVRIVmqt7GuxkUs0MLduTsivdowL8Kq54fqg-ighgJjl&_nc_ohc=8bb7UyJFXhgAX89Ryj0&_nc_ht=scontent.ftnr1-1.fna&oh=a2f4c2ee5484ca4b565d3e8a34b39c65&oe=617CF0A2"} name={nameOfPoster} />
            <Body imageUri={"https://scontent.ftnr1-1.fna.fbcdn.net/v/t1.6435-9/216705479_1078869752640193_612906026221720555_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeF3_XbH6MGOZbpfZfbUtaR0Kb3QkMBz-oUpvdCQwHP6hVRIVmqt7GuxkUs0MLduTsivdowL8Kq54fqg-ighgJjl&_nc_ohc=8bb7UyJFXhgAX89Ryj0&_nc_ht=scontent.ftnr1-1.fna&oh=a2f4c2ee5484ca4b565d3e8a34b39c65&oe=617CF0A2"} />
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
