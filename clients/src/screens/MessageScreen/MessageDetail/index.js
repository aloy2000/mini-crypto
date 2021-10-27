import React, { useEffect } from 'react'
import { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import MessageView from '../../../components/MessageView'

const MessageDetail = ({ route, navigation }) => {
    const { conversation } = route.params
    const [message, setMessage] = useState(conversation)

    useEffect(() => {
        //const { conversation } = route.params
        //setMessage(conversation)
        //console.warn(message.messages)
    })

    return (
        <View>
            <ScrollView>
                 <MessageView message={message.messages} sendAt={message.messages.timestamp} key={message.messages._id} idConversation={message._id} idSender={message.idSender} />
            </ScrollView>

        </View>
    )
}

export default MessageDetail
