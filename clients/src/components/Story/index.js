import React from 'react'
import {  Text, View } from 'react-native'

import ProfilImage from '../ProfilImage'
import styles from './style'

const Story = ({imageUri, name}) => {
    return (
        <View style>
            <ProfilImage uri={imageUri} />
            <Text style={styles.name}> {name} </Text>
        </View>
    )
}

export default Story

