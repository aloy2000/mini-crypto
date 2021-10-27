import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import ProfilImage from '../ProfilImage'
import { useDispatch, useSelector } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign'
import axios from 'axios'
import { HOST } from '@env'
import { fetchCurrentUserInfo } from '../../redux/actions/userAction/authAction'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';





const ProfilChange = ({ close }) => {
    const { currentUser } = useSelector(state => state.getCurrentUserInfoReducer);
    const [pseudo, setPseudo] = useState(currentUser.pseudo)
    const [bio, setBio] = useState(currentUser.biography)
    const dispatch = useDispatch()
    const [profile, setProfile] = useState(null)
    const [avatar, setAvatar] = useState({ uri: currentUser.profile })


    const handlePicker = () => {
        launchImageLibrary({}, (response) => {
            if (response.errorCode) {
                console.log("error code")
            }
            else if (response.errorMessage) {
                console.log("error message")
            }
            else if (response.didCancel) {
                console.log("cancel")
            }
            else {
                //console.warn(response)
                setAvatar(response.uri)
                //console.warn("avatar", avatar)
                setProfile(response)

            }
        })
    }

    const handleClickCheck = async () => {
        console.warn('profile', profile)
        await axios.put(`http://${HOST}:7000/api/user/${currentUser._id}`, { pseudo: pseudo, biography: bio })
            .then(() => {
                console.log("test test")
            }).catch(e => console.log(e))


        if (profile !== null) {
            try {
                const fileToUpload = profile
                console.warn("mande")
                const data = new FormData()
                data.append('userId', currentUser._id)
                data.append('name', pseudo)
                data.append('file', fileToUpload)
                await axios.post(`http://${HOST}:7000/api/user/uploadfile`, data)
                    .then(() => console.log("then"))
                    .catch(e => console.log("catch:", e))
            } catch (e) {
                console.log(e)
            }
        }
        const userDispatch = () => dispatch(fetchCurrentUserInfo(currentUser._id))
        userDispatch()
        close(false)
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
                <TouchableOpacity onPress={handlePicker}>
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
            <View>
            </View>
        </View>
    )
}

export default ProfilChange

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 45,
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
