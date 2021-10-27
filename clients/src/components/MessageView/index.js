import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { HOST } from '@env'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
const { width, height } = Dimensions.get('window')
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { getMessageInExistingConversationAction } from '../../redux/actions/messageAction/messageAction'
import moment from 'moment'
import 'moment/locale/fr'
import ProfilImage from '../ProfilImage'
moment.locale('fr')


const MessageView = ({ sendAt, idSender, idConversation }) => {

    const [userSender, setuserSender] = useState({})
    const [msg, setMsg] = useState('')
    //const { message } = useSelector(state => state.messageReducer);
    const { allMessage } = useSelector(state => state.messageReducer);
    const { message } = useSelector(state => state.messageReducer);
    //const [allMessages, setAllMessages] = useState(message)
    const { currentUser } = useSelector(state => state.getCurrentUserInfoReducer);
    const dispatch = useDispatch()



    useEffect(async () => {
        const getOneMessage = () => dispatch(getMessageInExistingConversationAction(idConversation))
        getOneMessage()
        console.warn("allMessageFromRedc:", message)
        await axios.get(`http://${HOST}:7000/api/user/${idSender}`)
            .then(res => {
                setuserSender(res.data)
                console.warn(userSender)
            })
            .catch(e => console.log(e))
    }, [])

    const sendMessage = async () => {
        if (msg == '') return
        await axios.patch(`http://${HOST}:7000/api/message/addMessage/${idConversation}`, {
            message: msg,
            sender: currentUser._id,
            dest: idSender
        })
            .then(res => {
                setMsg('')
                const getOneMessage = () => dispatch(getMessageInExistingConversationAction(idConversation))
                getOneMessage()
                    .then(() => console.log("done"))
                    .catch(e => console.log(e))
            })
            .catch(e => console.log("e:", e))
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.message}>
                {message.map(function (m) {
                    if (m.sender == currentUser._id) {
                        return (
                            <View>
                                <View style={{ width: width, marginBottom: 20, marginTop: 10 }}>
                                    <Text style={{ textAlign: 'center', color: '#A0A0A0' }}> {moment(m.timestamp).calendar()} </Text>
                                </View>
                                <View style={{ padding: 10, marginBottom: 10, borderRadius: 30, justifyContent: 'flex-end', marginLeft: width - 180, alignContent: 'flex-end', width: 150, borderWidth: 1, borderColor: '#40B5AD', backgroundColor: '#40B5AD' }} key={m._id}  >
                                    <Text style={{ textAlign: 'left', paddingRight: 20, fontSize: 15, }}> {m.contents} </Text>
                                </View>
                            </View>
                        )
                    } else {
                        return (
                            <View>
                                <View style={{ width: width, marginBottom: 20, marginTop: 10 }}>
                                    <Text style={{ textAlign: 'center', color: '#A0A0A0' }} > {moment(m.timestamp).calendar()} </Text>

                                </View>
                                <View style={{ flexDirection: 'row' }} >
                                    <ProfilImage size={28} uri={userSender.profile} />
                                    <View style={{ paddingRight: 10, width: 150, borderWidth: 1, borderColor: '#E1E1E1', marginLeft: 10, borderRadius: 30, padding: 10 }} key={m._id}  >
                                        <Text style={{ textAlign: 'left', paddingRight: 20, fontSize: 15, }}> {m.contents} </Text>
                                    </View>
                                </View>

                            </View>
                        )
                    }
                })}
            </ScrollView>
            <View style={styles.messageInp}>
                <Input
                    placeholder='Entrer votre message...'
                    rightIcon={
                        <Icon
                            name='send'
                            size={24}
                            color='#40B5AD'
                            onPress={sendMessage}
                        />
                    }
                    value={msg}
                    onChangeText={setMsg}
                />
            </View>

        </View>
    )
}

export default MessageView

const styles = StyleSheet.create({
    container: {
        padding: 12,
        width: width
        //height: Dimensions.get('screen').height,
    },
    message: {
        width: width,
        height: height - 210,

    },
    messageInp: {
        width: width,
        height: 100,
        paddingRight: 10

    }
})
