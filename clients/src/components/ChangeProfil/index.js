import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import ProfilImage from '../ProfilImage'
import { useDispatch, useSelector } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign'
import axios from 'axios'
import { HOST } from '@env'
import { fetchCurrentUserInfo } from '../../redux/actions/userAction/authAction'




const ProfilChange = ({ close }) => {
    const { currentUser } = useSelector(state => state.getCurrentUserInfoReducer);
    const [pseudo, setPseudo] = useState(currentUser.pseudo)
    const [bio, setBio] = useState(currentUser.biography)
    const dispatch = useDispatch()

    const handleClickCheck = async () => {
        //console.warn("check")
        await axios.put(`http://${HOST}:7000/api/user/${currentUser._id}`, {pseudo: pseudo, biography: bio})
            .then(() => {
                console.log("test test")
                const userDispatch = () => dispatch(fetchCurrentUserInfo(currentUser._id))
                userDispatch()
                close(false)
            }).catch(e => console.log(e))
        
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => close(false)} >
                    <AntDesign
                        name='close'
                        size={30}
                    />
                </TouchableOpacity>
                <Text style={{ fontSize: 23, }} >Modification  Profil</Text>
                <TouchableOpacity onPress={handleClickCheck}>
                    <AntDesign
                        name='check'
                        color={'#40B5AD'}
                        size={30}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.user} >
                <ProfilImage uri={currentUser.profile} size={100} />
                <TouchableOpacity>
                    <Text style={{ color: '#40B5AD', fontSize: 18 }}>Changer la photo de profil </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.information}>
                <TextInput
                    placeholder={currentUser.pseudo}
                    style={styles.textInput}
                    onChangeText={setPseudo}
                />
                <TextInput
                    placeholder='Biographie'
                    style={styles.textInput}
                    onChangeText={setBio}
                />
            </View>
        </View>
    )
}

export default ProfilChange

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    user: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    textInput: {
        borderColor: '#40B5AD',
        borderRadius: 5,
        height: 40,
        margin: 10,
        borderWidth: 2,
        padding: 10,
    },
})
