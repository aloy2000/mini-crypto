
import React, { useState } from 'react'
import { Button, Alert, ScrollView, Text, TextInput, View } from 'react-native'
import styles from '../LoginScreen/style'
import { validate } from 'email-validator'
import AnimatedLoader from "react-native-animated-loader";
import AwesomeAlert from 'react-native-awesome-alerts';




const RegisterScreen = ({ navigation }) => {


    const [pseudo, setPseudo] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [pseudoError, setPseudoError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const [loading, setLoading] = useState(false)

    const hideAlert = () => {
        setPseudoError('')
        setEmailError('')
        setPasswordError('')
        setShowAlert(false)
    }

    const connectPressed = () => {
        navigation.navigate('Login')
    }

    const registerPressed = () => {
        setLoading(true)
        if (!validate(email)) {
            console.log("Email non valide")
            setEmailError('Email non valide')
        }

        fetch('http://192.168.43.15:7000/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    pseudo: pseudo,
                    email: email,
                    password: password
                }
            )
        })
            .then(data => {
                if (!data.ok) {
                    throw Error(data.status)
                }
                return data.json()
            }).then(json => {
                if (json.errors) {
                    setShowAlert(true)
                    if (json.errors.pseudo) {
                        setPseudoError(json.errors.pseudo)
                    }
                    if (json.errors.email) {
                        setEmailError(json.errors.email)
                    }
                    if (json.errors.password) {
                        setPasswordError(json.errors.password)
                    }
                    setLoading(false)
                }
                else {
                    setLoading(false)
                    navigation.navigate('Login')
                }
                console.log({ "data": json.errors.pseudo })
            }).catch(e => {
                console.log("error fetching data: " + e)
            })


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
                    emailError ?
                        <AwesomeAlert
                            show={showAlert}
                            showProgress={false}
                            title="Erreur"
                            message={emailError}
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
                        pseudoError ?
                            <AwesomeAlert
                                show={showAlert}
                                showProgress={false}
                                title="Erreur"
                                message={pseudoError}
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
                                    message={passwordError}
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
                    placeholder="Entrer votre pseudo "
                    value={pseudo}
                    onChangeText={setPseudo}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Saissisez un email valide ..."
                    onChangeText={setEmail}
                    value={email}
                    keyboardType="email-address"
                />
                <TextInput
                    placeholder=" Saissisez un nouveau mot de passe ..."
                    style={styles.textInput}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                <View style={styles.button}>
                    <Button title="S'inscrire" style={styles.button} color={'#40B5AD'} onPress={registerPressed} />
                </View>

            </View>
            <View style={styles.register}>
                <View style={styles.button}>
                    <Button title="Avoir un compte " color={'#40B5AD'} onPress={connectPressed} />
                </View>
            </View>
        </ScrollView>

    )
}

export default RegisterScreen

