import React from 'react'
import { Image, View, StyleSheet, Dimensions } from 'react-native'

const Body = ({ imageUri }) => {
    const image = imageUri
    //console.warn("imageUri", imageUri)
    return (
        <View>
            <Image
                source={{uri: imageUri}}
                style={styles.image}
                fromWeb={false}
            />
        </View>
    )
}

export default Body

const styles = StyleSheet.create({
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width + 100
    }
})

