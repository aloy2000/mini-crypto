import React, { useState } from 'react'
import { Button, Pressable, ScrollView, Text, TextInput, View, Alert } from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts';
import AnimatedLoader from "react-native-animated-loader";



import styles from './style'
import { storeData, getData, removeData } from './utils/storeData'


const Login = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const [networkError, setNetworkError] = useState('')
    const [loading, setLoading] = useState(false)

    const hideAlert = () => {
        setEmailError('')
        setPasswordError('')
        setNetworkError('')
        setShowAlert(false)
    }

    const connectPressed = () => {
        setLoading(true)
        console.log("connected pressed")
        fetch('http://192.168.43.15:7000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    email: email,
                    password: password
                }
            )
        }).then(data => {
            if (data.ok) {
                //throw Error(data.status)
                //console.log("data: " + data)
            }
            return data.json()
        }).then(res => {
            console.log(res)
            if (res.errors) {
                setShowAlert(true)
                if (res.errors.email) {
                    setEmailError(res.errors.email)
                }
                if (res.errors.password) {
                    setPasswordError(res.errors.password)
                }
                setLoading(false)
            }
            else {
                console.log(res.user)
                //eto zao fa za vizaka de go dormir
                console.log("res.user type: " + typeof(res.user))

                const dataStored = getData()
                console.log("dataStored: " + dataStored.toString())
                if (!dataStored) {
                    storeData(res.user)
                }
                else {
                    removeData('@storage_key')
                    storeData(res.user)
                }
                setLoading(false)
                navigation.navigate('Container')

            }
        }).catch(err => console.log("error: " + err))
    }

    const registerPressed = () => {
        navigation.navigate('RegisterScreen')
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {
                loading ?
                    <AnimatedLoader
                        visible={loading}
                        overlayColor="rgba(64, 181, 173, 1)"
                        animationStyle={styles.lottie}
                        speed={1}
                    >
                        <Text>Chargement...</Text>
                    </AnimatedLoader>
                    :

                    networkError ?
                        <AwesomeAlert
                            show={showAlert}
                            showProgress={false}
                            title="Erreur"
                            message="Erreur de réseau!"
                            closeOnTouchOutside={true}
                            closeOnHardwareBackPress={false}
                            showCancelButton={true}
                            showConfirmButton={true}
                            cancelText="Annuler"
                            confirmText="Compris"
                            confirmButtonColor="#40B5AD"
                            onCancelPressed={() => {
                                hideAlert()
                            }}
                            onConfirmPressed={() => {
                                hideAlert()
                            }}
                        />

                        :

                        emailError ?
                            <AwesomeAlert
                                show={showAlert}
                                showProgress={false}
                                title="Erreur"
                                message="Email incorrect!"
                                closeOnTouchOutside={true}
                                closeOnHardwareBackPress={false}
                                showCancelButton={true}
                                showConfirmButton={true}
                                cancelText="Annuler"
                                confirmText="Compris"
                                confirmButtonColor="#40B5AD"
                                onCancelPressed={() => {
                                    hideAlert()
                                }}
                                onConfirmPressed={() => {
                                    hideAlert()
                                }}
                            />

                            :
                            passwordError ?
                                <AwesomeAlert
                                    show={showAlert}
                                    showProgress={false}
                                    title="Erreur"
                                    message="Mot de passe  incorrect!"
                                    closeOnTouchOutside={true}
                                    closeOnHardwareBackPress={false}
                                    showCancelButton={true}
                                    showConfirmButton={true}
                                    cancelText="Annuler"
                                    confirmText="Compris"
                                    confirmButtonColor="#40B5AD"
                                    onCancelPressed={() => {
                                        hideAlert()
                                    }}
                                    onConfirmPressed={() => {
                                        hideAlert()
                                    }}
                                />
                                : null
            }

            <Text style={styles.textTitle} >Mini Crypto</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Votre adresse email ..."
                    onChangeText={setEmail}
                />
                <TextInput
                    placeholder=" Votre mot de passe ..."
                    style={styles.textInput}
                    onChangeText={setPassword}
                    secureTextEntry={true}

                />
                <View style={styles.button}>
                    <Button
                        title="Se connecter"
                        style={styles.button}
                        color={'#40B5AD'}
                        onPress={connectPressed}

                    />
                </View>
                <Pressable style={styles.passwordLost}>
                    <Text style={{ color: '#40B5AD' }}>Mot de passe oublié ?</Text>
                </Pressable>
            </View>
            <View style={styles.register}>
                <View style={styles.button}>
                    <Button title="Créer un compte" color={'#40B5AD'} onPress={registerPressed} />
                </View>
            </View>
        </ScrollView>

    )
}

export default Login


