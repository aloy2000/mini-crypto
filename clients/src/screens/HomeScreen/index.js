import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import Post from '../../components/Post';
import Stories from '../../components/Stories';
import { useSelector, useDispatch } from 'react-redux'
import { HOST } from '@env'
import { getPost } from '../../redux/actions/postAction/postAction';
import CommentScreen from '../CommentScreen';


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const HomeScreen = ({ navigation }) => {

    const [refresh, setRefresh] = useState(false)
    const { allPosts } = useSelector(state => state.postReducer)
    const { commentScreen } = useSelector(state => state.postReducer)
    const { postId } = useSelector(state => state.postReducer)

    const dispatch = useDispatch()

    const onrefresh = useCallback(() => {
        setRefresh(true)
        wait(2000).then(() => setRefresh(false))
    }, [])

    useEffect(() => {
        const getAllPosts = () => dispatch(getPost());
        getAllPosts()
        //console.warn("allPostFromRedux", allPosts)
    }, []);


    if (commentScreen == false) {
        return (

            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={onrefresh}
                    />
                }
            >
                <Stories />
                {
                    allPosts.map(function (post) {
                        return <Post post={post} key={post._id} likersCount={post.likers.length} navigation={navigation} />
                    })
                }

            </ScrollView>
        )
    } else {
        return (
            <CommentScreen  postId={postId} />

        )
    }
}

export default HomeScreen;