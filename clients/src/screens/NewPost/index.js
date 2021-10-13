import React, { useEffect, useState } from 'react'
import { Text, TextInput, View, StyleSheet, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import ProfilImage from '../../components/ProfilImage'
import { useSelector, useDispatch } from 'react-redux'
import { HOST } from '@env'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import DocumentPicker from "react-native-document-picker"
import axios from 'axios'
import { getPost } from '../../redux/actions/postAction/postAction';
import Spinner from 'react-native-loading-spinner-overlay';





const NewPost = ({ navigation }) => {
    const { currentUser } = useSelector(state => state.getCurrentUserInfoReducer);
    //const { allPosts } = useSelector(state => state.postReducer)
    const dispatch = useDispatch()
    const [file, setFile] = useState(null)
    const [message, setMessage] = useState(null)
    const [fileLoaded, setfileLoaded] = useState(false)



    const createPost = async () => {
        setfileLoaded(true)
        if (message == null) {
            alert('Indiquer le message de votre post')
            setfileLoaded(false)
            return
        }

        if (file !== null) {
            console.warn("fileLoaded", fileLoaded)
            try {
                const fileToUpload = file[0]
                const data = new FormData()
                data.append('posterId', currentUser._id)
                data.append('message', message)
                data.append('file', fileToUpload)
                await axios.post(`http://${HOST}:7000/api/post/createPost`, data
                ).then((res) => {
                    if (res.data.errors) {
                        alert(res.data.errors.format)
                        console.log("res.data.errros: ", res.data.errors)
                    } else {
                        const getAllPosts = () => dispatch(getPost());
                        getAllPosts()
                        console.log("error tsy misy")
                        navigation.navigate('Container')
                        //console.warn(navigation, navigation)

                    }
                })
                    .catch((e) => console.log("eeeeeeee:", e))
                console.log("object")

            } catch (err) {
                console.log("err:" + err)
            }
            setfileLoaded(false)

        } else {
            alert('image non chargé, veuillez reessayez')
            return
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
    useEffect(() => {
        //console.warn("redx from post", allPosts)
        setfileLoaded(false)
    })

    return (

        <View style={styles.container}>
            <View style={styles.profile}>
                <ProfilImage uri={currentUser.profile} size={55} />
                <Text style={[styles.text, { padding: 5, margin: 5, fontSize: 20 }]} > {currentUser.pseudo} </Text>
            </View>
            <View style={{ margin: 10, width: Dimensions.get('window').width - 20, }}>
                <Text style={{ fontSize: 18, textAlign: 'center', color: '#40B5AD' }}>Nouvelle publication</Text>
            </View>
            <View>
                <TextInput
                    style={styles.textInput}
                    placeholder="A quoi pensez-vous ?"
                    onChangeText={setMessage}
                    value={message}
                />
            </View>
            <View style={styles.upload}>
                <TouchableWithoutFeedback onPress={selectFile}>
                    <MaterialCommunityIcons
                        style={{ padding: 5, }}
                        name={'camera'}
                        size={35}
                        color={'#1E1E1C'}
                    />
                </TouchableWithoutFeedback>

                <Text style={styles.text}>
                    Ajouter photo
                </Text>
            </View>
            <View>
                <TouchableOpacity onPress={createPost}>
                    <Text style={styles.btn}>
                        Publier
                    </Text>
                </TouchableOpacity >
            </View>
            <View>
                {fileLoaded ?
                     <Spinner
                        visible={true}
                        textContent={'Loading...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                    : <Spinner
                    visible={false}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                  />   
            }
            </View>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        padding: 5
    },
    text: {
        margin: 10,
        fontSize: 18,
    },
    spinner: {
        marginBottom: 50
    },
    spinnerTextStyle: {
        color: '#40B5AD'
    },
    btn: {
        width: Dimensions.get('window').width - 20,
        padding: 10,
        textAlign: 'center',
        borderWidth: 1,
        backgroundColor: '#40B5AD',
        margin: 10,
        borderColor: '#40B5AD',
        fontSize: 20,
        color: '#fff'

    }
})

export default NewPost

