import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ProfilImage from '../ProfilImage'
import { HOST } from '@env'
import moment from 'moment'

const CommentSection = ({ content, pseudo, idCommenter, time }) => {
    const [userInfo, setuserInfo] = useState([])
    const [times, setTimes] = useState(moment(time).fromNow())

    useEffect(async () => {
        await axios.get(`http://${HOST}:7000/api/user/${idCommenter}`)
            .then(res => setuserInfo(res.data)).catch((e) => { console.log("error", e) })
    }, [])

    return (
        <View style={styles.container}>
            <View>
                <ProfilImage size={30} uri={userInfo.profile} />
            </View>
            <View style={styles.contentView}>
                <View style={styles.content}>
                    <Text style={{ fontWeight: '700' }}  > {pseudo} </Text>
                    <Text style={{ fontWeight: '200', fontStyle: 'italic' }} > {content} </Text>
                </View>
                <View style={styles.contentFooter}>
                    <Text style={{ fontWeight: '200', fontStyle: 'italic', color: '#40B5AD' }} > {times} </Text>
                </View>
            </View>
        </View>
    )
}

export default CommentSection

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
        borderBottomWidth:1,
        borderBottomColor: '#D3D7CF'
    },
    contentView: {
        padding: 5,
       
    },
    content: {
        borderColor: '#40B5AD',
        borderRadius: 10,
        borderWidth: 1,
        padding: 7,
        width: 200,
        marginBottom: 5,

    }
})
