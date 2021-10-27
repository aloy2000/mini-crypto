import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ProfilImage from '../ProfilImage'



const MessageContent = ({ message, navigation }) => {
    const [lastMessageIndex, setLastMessageIndex] = useState(message.messages.length)
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('MessageDetail', {
                conversation: message
            })}
        >
            <View style={styles.container} >
                <ProfilImage uri={"dsfhsk"} size={50} />
                <View style={styles.info}>
                    <Text style={{ fontSize: 15, paddingBottom: 10, color: '#979797' }}> {message.pseudoSender} </Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }} > {message.messages[lastMessageIndex - 1].contents} </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default MessageContent

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
    },
    info: {
        marginLeft: 20,
        justifyContent: 'center',
        alignContent: 'center'
    }

})
