import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import ProfilImage from '../ProfilImage'
import Entypo from 'react-native-vector-icons/Entypo'

const Header = ({ imageUri, name }) => {
    console.warn("name:" +name)
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <ProfilImage uri={imageUri} size={40} />
                <Text style={styles.name}> {name} </Text>
            </View>

            <View style={styles.right}>
                <Entypo
                    name={"dots-three-vertical"}
                    size={20}
                    color={"#3b5998"}
                    style={styles.icon}
                />
            </View>

        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    left: {
      flexDirection: 'row',

    },
    name: {
        paddingRight: 60,
        alignSelf: 'center',
        fontWeight: '400',
        color: '#4f4f4f',
        fontSize: 18,
    },
    right:{
        marginRight: 16
    }


})
