import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        margin: 10,
        height: '100%',
        justifyContent: 'center',

        //alignItems: 'center',

    },
    textTitle: {
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin: 20

    },
    lottie: {
        width: 100,
        height: 100
    },
    inputContainer: {
        marginBottom: 60,
        paddingBottom: 30,
        borderBottomWidth: 1,
    },
    textInput: {
        borderColor: '#40B5AD',
        borderRadius: 5,
        height: 40,
        margin: 10,
        borderWidth: 2,
        padding: 10
    },
    button: {
        padding: 10,
    },
    passwordLost: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    register: {

    }
})

export default styles;
