import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import Post from '../../components/Post';
import Stories from '../../components/Stories';
import { useSelector, useDispatch } from 'react-redux'

const post = [
    {
        user: {
            imageUri: 'https://scontent.ftnr1-1.fna.fbcdn.net/v/t1.6435-9/216705479_1078869752640193_612906026221720555_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeF3_XbH6MGOZbpfZfbUtaR0Kb3QkMBz-oUpvdCQwHP6hVRIVmqt7GuxkUs0MLduTsivdowL8Kq54fqg-ighgJjl&_nc_ohc=fZ-uKDkisLsAX_vl6q1&_nc_ht=scontent.ftnr1-1.fna&oh=4c146bef7b31d056fbedebbe68b961dc&oe=61516F22',
            name: 'react',
        },
        imageUri: 'https://scontent.ftnr1-1.fna.fbcdn.net/v/t1.6435-9/216705479_1078869752640193_612906026221720555_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeF3_XbH6MGOZbpfZfbUtaR0Kb3QkMBz-oUpvdCQwHP6hVRIVmqt7GuxkUs0MLduTsivdowL8Kq54fqg-ighgJjl&_nc_ohc=fZ-uKDkisLsAX_vl6q1&_nc_ht=scontent.ftnr1-1.fna&oh=4c146bef7b31d056fbedebbe68b961dc&oe=61516F22',
        caption: 'Best profile ever',
        likes: 1234,
        postedAt: '10 minutes ago',

    },
    {
        user: {
            imageUri: 'https://scontent.ftnr1-1.fna.fbcdn.net/v/t1.6435-9/199385759_345470910277839_3988273979229903886_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeEzh9pmo-5k_yw7s954Vcz2_R1YrUnrs9b9HVitSeuz1hnz1RIsL92YE0NFOl_yx4vU0tU--s6zH3j5EeHALR3Q&_nc_ohc=qkHgz6TpAhsAX87FbjU&_nc_ht=scontent.ftnr1-1.fna&oh=2ce20a3772f690d660152bbaae3e2510&oe=6150AF8F',
            name: 'react',
        },
        imageUri: 'https://scontent.ftnr1-1.fna.fbcdn.net/v/t1.6435-9/199385759_345470910277839_3988273979229903886_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeEzh9pmo-5k_yw7s954Vcz2_R1YrUnrs9b9HVitSeuz1hnz1RIsL92YE0NFOl_yx4vU0tU--s6zH3j5EeHALR3Q&_nc_ohc=qkHgz6TpAhsAX87FbjU&_nc_ht=scontent.ftnr1-1.fna&oh=2ce20a3772f690d660152bbaae3e2510&oe=6150AF8F',
        caption: 'Messi the Goat',
        likes: 410144444,
        postedAt: '15 minutes ago',

    }
]

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const HomeScreen = () => {
    const [allPost, setAllPost] = useState([]);
    const [refresh, setRefresh] = useState(false)
    const { currentUser } = useSelector(state => state.getCurrentUserInfoReducer);

    const onrefresh = useCallback(() => {
        setRefresh(true)
        wait(2000).then(() => setRefresh(false))
    }, [])

    useEffect(() => {
        fetch('http://192.168.43.15:7000/api/post/getAllPosts')
            .then(res => res.json())
            .then(
                (result) => {
                    setAllPost(result)
                    console.log(result)
                }
            )
            .catch((err) => console.log("error occuring: " + err))
    }, []);

    console.warn("state global a: ", currentUser)

    return (

        <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl= {
                <RefreshControl
                    refreshing={refresh}
                    onRefresh={onrefresh}
                />
            }
        >
            <Stories />
            {
                allPost.map(function (post) {
                    return <Post post={post} key={post._id} />
                })
            }
            <Post post={post[1]} />

        </ScrollView>
    )
}


export default HomeScreen;