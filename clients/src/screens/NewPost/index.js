import React, { useState } from 'react'
import { Text, TextInput, View, StyleSheet, Dimensions, TouchableWithoutFeedback, Image, Button } from 'react-native'
import ProfilImage from '../../components/ProfilImage'
import { useSelector } from 'react-redux'
import { HOST } from '@env'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import DocumentPicker from "react-native-document-picker";
import axios from 'axios'



const NewPost = () => {
    const { currentUser } = useSelector(state => state.getCurrentUserInfoReducer);
    const [file, setFile] = useState(null)
    const [message, setMessage] = useState(null)


    const createPost = async () => {
        if (file !== null) {
            try {
                const fileToUpload = file[0]
                const data = new FormData()
                data.append('posterId', currentUser._id)
                data.append('message', message)
                data.append('file', fileToUpload)
                await axios.post(`http://${HOST}:7000/api/post/createPost`, data
                ).then((res) => {
                    if (res.data.errors) {
                        console.log("res.data.errros: ", res.data.errors)
                    } else {
                        console.log("error tsy misy")
                    }
                })
                    .catch((e) => console.log("eeeeeeee:",  e ))
                console.log("object")

            } catch (err) {
                console.log("err:" + err)
            }

        }
    }

    const selectFile = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images]
            })
            console.log('res: ' + JSON.stringify(res))
            setFile(res)
            console.log("file:", file)
        } catch (err) {
            setFile(null)
            if (DocumentPicker.isCancel(err)) {
                alert('Canceled')
            } else {
                alert('Unknown error: ' + JSON.stringify(err))
            }
        }
    }

    return (

        <View style={styles.container}>
            <View style={styles.profile}>
                <ProfilImage uri={"https://scontent.ftnr1-1.fna.fbcdn.net/v/t1.6435-9/216705479_1078869752640193_612906026221720555_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeF3_XbH6MGOZbpfZfbUtaR0Kb3QkMBz-oUpvdCQwHP6hVRIVmqt7GuxkUs0MLduTsivdowL8Kq54fqg-ighgJjl&_nc_ohc=fZ-uKDkisLsAX_vl6q1&_nc_ht=scontent.ftnr1-1.fna&oh=4c146bef7b31d056fbedebbe68b961dc&oe=61516F22"} size={60} />
                <Text> {currentUser.pseudo} </Text>
            </View>
            <View>
                <TextInput
                    style={styles.textInput}
                    placeholder="A quoi pensez-vous ?"
                    onChangeText={setMessage}
                />
            </View>
            <View style={styles.upload}>
                <TouchableWithoutFeedback onPress={selectFile}>
                    <MaterialCommunityIcons
                        style={{ padding: 5, }}
                        name={'camera'}
                        size={29}
                        color={'#1E1E1C'}
                    />
                </TouchableWithoutFeedback>

                <Text style={styles.text}>
                    Ajouter photo
                </Text>
            </View>
            <Button
                onPress={createPost}
                title="Terminer"
            />
            {file != null ? (
                <Text style={styles.textStyle}>
                    File Name: {file[0].name ? file[0].name : ''}
                    {'\n'}
                    Type: {file[0].type ? file[0].type : ''}
                    {'\n'}
                    File Size: {file[0].size ? file[0].size : ''}
                    {'\n'}
                    URI: {file[0].uri ? file[0].uri : ''}
                    {'\n'}
                </Text>
            ) : null}
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'flex-start'

    },
    profile: {
        flexDirection: 'row',

    },
    textInput: {
        height: 50,
        width: Dimensions.get('window').width - 20,
        fontSize: 20,
        borderColor: '#40B5AD',
        borderRadius: 5,
        margin: 10,
        borderWidth: 2,
        padding: 10

    },
    upload: {
        flexDirection: 'row'
    },
    text: {

    }


})

export default NewPost

