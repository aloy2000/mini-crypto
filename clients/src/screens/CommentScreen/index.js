import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, ScrollView, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { getComment, getCommentScreen } from '../../redux/actions/postAction/postAction'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ProfilImage from '../../components/ProfilImage'
import { Sae } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'
import { HOST } from '@env'
import CommentSection from '../../components/Comment'




const CommentScreen = ({ postId }) => {
    const { singlePost } = useSelector(state => state.postReducer)
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const { currentUser } = useSelector(state => state.getCurrentUserInfoReducer);


    useEffect(() => {
        const getAllComments = () => dispatch(getComment(postId))
        getAllComments()

        //axios.get(`http://${HOST}:7000/api/user/`)
        //console.warn(postId)
    }, [])

    const handleClickComment = () => {
        if (!comment) {
            return
        }
        axios.patch(`http://${HOST}:7000/api/post/comment/${postId}`, {
            idCommenter: currentUser._id,
            commenterPseudo: currentUser.pseudo,
            content: comment,
        }).then(() => {
            console.log('comment posted')
            const getAllComments = () => dispatch(getComment(postId))
            getAllComments()
            setComment('')
        }).catch(e => console.log('error', e))
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    const commentScreen = () => dispatch(getCommentScreen(false))
                    commentScreen()
                }} >
                    <AntDesign
                        name='close'
                        size={25}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={{ height: 450 }}
                keyboardShouldPersistTaps={'always'}
                showsVerticalScrollIndicator={false}
            >
                {singlePost.map(function (comment) {
                    return <CommentSection content={comment.content} pseudo={comment.pseudoComment} idCommenter={comment.idCommenter} time={comment.timestamp} />
                })}
            </ScrollView>

            <View style={styles.commentSection}>
                <View>
                    <ProfilImage size={30} uri={currentUser.profile} />
                </View>
                <TextInput
                    placeholder='Votre commentaire ...'
                    onChangeText={setComment}
                    value={comment}
                />
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <TouchableOpacity onPress={handleClickComment} >
                        <Text style={{ color: '#40B5AD', fontSize: 16 }}>Publier</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default CommentScreen

const styles = StyleSheet.create({
    container: {
        padding: 20,
        //height: Dimensions.get('screen').height,
        //position: 'absolute'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 40,
    },
    commentSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10
        //height: '80%',
    },

})

