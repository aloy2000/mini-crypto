import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { HOST } from '@env'

const Footer = ({ likes, postId, caption, postedAt, listPostLikers, navigation }) => {
    const [like, setLike] = useState(false)
    const [likeCount, setLikeCount] = useState(likes)
    const { currentUser } = useSelector(state => state.getCurrentUserInfoReducer);

    const onLikePressed = async () => {
        setLike(!like)
        if (like) {
            try {
                const res = await axios.patch(`http://${HOST}:7000/api/post/likepost/${postId}`, { id: currentUser._id })
                if (res.data) {
                    console.log("res.data.res: ", res.data)
                } else {
                    console.log('unable to fetch data user')
                }
            } catch (err) {
                console.log('error patch: ', err)
            }

        } else {
            try {
                const res = await axios.patch(`http://${HOST}:7000/api/post/dislikepost/${postId}`, { id: currentUser._id })

                if (res.data) {
                    console.log("res.data.res: ", res.data)
                } else {
                    console.log('unable to fetch data user')
                }
            } catch (err) {
                console.log('error: ', err)
            }

        }
        const incrementOrDecrement = like ? -1 : 1
        setLikeCount(likeCount + incrementOrDecrement)
    }

    useEffect(() => {
        for (let i = 0; i < listPostLikers.length; i++) {
            if (listPostLikers[i] === currentUser._id) {
                setLike(true)
            }
        }
        setLikeCount(likeCount)
    }, [])

    const commentPressed = () => {
        console.warn(navigation.getParent())
        navigation.navigate('Home', {
            screen: 'Comment',
        })
    }

    return (
        <View style={styles.container}>

            <View style={styles.iconContainer}>
                <View style={styles.left}>
                    <TouchableWithoutFeedback
                        onPress={onLikePressed}
                    >
                        {
                            like ?
                                <AntDesign
                                    style={{ padding: 5, }}
                                    name={"heart"}
                                    size={25}
                                    color={'#40B5AD'}
                                />
                                : <AntDesign
                                    style={{ padding: 5, }}
                                    name={"hearto"}
                                    size={25}
                                    color={'#1E1E1C'}
                                />
                        }
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={commentPressed}>
                        <Fontisto
                            style={{ padding: 5, }}
                            name={'comment'}
                            size={22}
                            color={'#1E1E1C'}
                        />
                    </TouchableWithoutFeedback>
                    <Feather
                        style={{ padding: 5, }}
                        name={'bookmark'}
                        size={25}
                        color={'#1E1E1C'}
                    />
                </View>
                <View style={styles.right} >
                    <MaterialCommunityIcons
                        style={{ padding: 5, marginLeft: '58%' }}
                        name={'share-outline'}
                        color={'#1E1E1C'}
                        size={28}
                    />
                </View>
            </View>

            <View style={styles.textContainer} >
                <Text> {likeCount} Likes</Text>
                <Text> {caption} </Text>
                <Text style={styles.postedAt}> {postedAt} </Text>
            </View>
        </View>
    )
}

export default Footer

const styles = StyleSheet.create({
    container: {
        margin: 3

    },
    textContainer: {
        marginLeft: 5
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 3,
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    right: {
        width: '100%',
        //marginRight: -63
    },
    postedAt: {
        fontWeight: '200',
        fontSize: 15,
        fontStyle: 'italic',
        color: '#A49797'
    }

})
