import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import MessageContent from '../../components/MessageContent';
import { HOST } from '@env'
import axios from 'axios';
import { getAllMessageAction } from '../../redux/actions/messageAction/messageAction';


const MessageSreen = ({ navigation }) => {
    const dispatch = useDispatch()
    //const [Allmessage, setAllMessage] = useState([])
    const { currentUser } = useSelector(state => state.getCurrentUserInfoReducer);
    const { allMessage } = useSelector(state => state.messageReducer);

    useEffect(async () => {
        const allMsg = () => dispatch(getAllMessageAction())
        allMsg()
        /*await axios.get(`http://${HOST}:7000/api/message/getAllMessage`)
            .then((res) => setAllMessage(res.data))
            .catch(e => console.log("error getAllMessage: ", e))
        console.log("allMessage:", Allmessage)*/
    }, [])
    //console.log(allMessages)
    return (
        <View style={styles.container} >
            <FlatList
                data={allMessage.filter(message => message.idDest == currentUser._id || message.idSender == currentUser._id  )}
                horizontal
                renderItem={
                    ({ item }) => (<MessageContent key={item._id} message={item} navigation={navigation} />)
                }
                keyExtractor={item => item._id}
                showsHorizontalScrollIndicator={false}
            />

        </View>
    )
}

export default MessageSreen

const styles = StyleSheet.create({
    container: {

    }
})
