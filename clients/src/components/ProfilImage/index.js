import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './style';

const ProfilImage = ({ uri, size=60 }) => {
    return (
        <View style={[styles.container, {width:size + 6, height: size + 6} ]}>
            <Image 
                source={ { uri} } 
                style={[styles.image, {width: size, height: size}]}
             />
        </View>
    );
}

export default ProfilImage;
