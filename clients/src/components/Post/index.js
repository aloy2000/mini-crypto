import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import axios from 'axios'
import moment from 'moment'

import Header from './Header'
import Body from './Body'
import Footer from './Footer'


const Post = ({ post }) => {
    const [nameOfPoster, setNameOfPoster] = useState('');
    const [time, setTime] = useState(moment(post.createdAt).fromNow())

    useEffect(async () => {
        try {
            const res = await axios.get(`http://192.168.43.15:7000/api/user/${post.posterId}`)
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
            <Header imageUri={"https://scontent.ftnr1-1.fna.fbcdn.net/v/t1.6435-9/216705479_1078869752640193_612906026221720555_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeF3_XbH6MGOZbpfZfbUtaR0Kb3QkMBz-oUpvdCQwHP6hVRIVmqt7GuxkUs0MLduTsivdowL8Kq54fqg-ighgJjl&_nc_ohc=fZ-uKDkisLsAX_vl6q1&_nc_ht=scontent.ftnr1-1.fna&oh=4c146bef7b31d056fbedebbe68b961dc&oe=61516F22"} name={nameOfPoster} />
            <Body imageUri={"https://scontent.ftnr1-1.fna.fbcdn.net/v/t1.6435-9/216705479_1078869752640193_612906026221720555_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeF3_XbH6MGOZbpfZfbUtaR0Kb3QkMBz-oUpvdCQwHP6hVRIVmqt7GuxkUs0MLduTsivdowL8Kq54fqg-ighgJjl&_nc_ohc=fZ-uKDkisLsAX_vl6q1&_nc_ht=scontent.ftnr1-1.fna&oh=4c146bef7b31d056fbedebbe68b961dc&oe=61516F22"} />
            <Footer likes={145221} caption={post.message} postedAt={time} />
        </View>
    )
}

export default Post

const styles = StyleSheet.create({
    container: {
        marginBottom: 30,
    }
})
