import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Header from './Header'
import Body from './Body'
import Footer from './Footer'


const Post = ({ post }) => {
    return (
        <View style={styles.container}>
            <Header imageUri={"https://scontent.ftnr1-1.fna.fbcdn.net/v/t1.6435-9/216705479_1078869752640193_612906026221720555_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeF3_XbH6MGOZbpfZfbUtaR0Kb3QkMBz-oUpvdCQwHP6hVRIVmqt7GuxkUs0MLduTsivdowL8Kq54fqg-ighgJjl&_nc_ohc=fZ-uKDkisLsAX_vl6q1&_nc_ht=scontent.ftnr1-1.fna&oh=4c146bef7b31d056fbedebbe68b961dc&oe=61516F22"} name={post.posterId} />
            <Body imageUri={"https://scontent.ftnr1-1.fna.fbcdn.net/v/t1.6435-9/216705479_1078869752640193_612906026221720555_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeF3_XbH6MGOZbpfZfbUtaR0Kb3QkMBz-oUpvdCQwHP6hVRIVmqt7GuxkUs0MLduTsivdowL8Kq54fqg-ighgJjl&_nc_ohc=fZ-uKDkisLsAX_vl6q1&_nc_ht=scontent.ftnr1-1.fna&oh=4c146bef7b31d056fbedebbe68b961dc&oe=61516F22"} />
            <Footer likes = {145221} caption={post.message} postedAt={post.createdAt}  />
        </View>
    )
}

export default Post

const styles = StyleSheet.create({
    container: {
        marginBottom: 30,
    }
})
