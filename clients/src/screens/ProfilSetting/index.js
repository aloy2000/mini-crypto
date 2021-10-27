import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, ScrollView } from 'react-native'
import ProfilImage from '../../components/ProfilImage'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { HOST } from '@env'
import axios from 'axios'
import { useState } from 'react'
import Suggestion from '../../components/Suggestion'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ProfilChange from '../../components/ChangeProfil'





const ProfilSetting = () => {
    const { currentUser } = useSelector(state => state.getCurrentUserInfoReducer);
    //const [allPost, setAllPost] = useState([])
    //const [allUser, setAllUser] = useState([])
    const [post, setPost] = useState(0)
    const { following } = useSelector(state => state.getCurrentUserInfoReducer)
    const { allPosts } = useSelector(state => state.postReducer)
    const { users } = useSelector(state => state.getCurrentUserInfoReducer);
    const [updateProfil, setupdateProfil] = useState(false)

    //console.warn(currentUser.followers.length)

    useEffect(() => {
        //console.warn(users)
        let i = 0

        allPosts.map(function (posts) {
            if (posts.posterId === currentUser._id) {
                i = i + 1
            }
        })
        setPost(i)

    }, [])

    const handleProfilChange = (val) => {
        setupdateProfil(val)
    }

    if (!updateProfil) {
        return (

            <View style={styles.container}>
                <View style={styles.pseudo} >
                    <Text style={styles.pseudoText}> {currentUser.pseudo} </Text>
                </View>
                <View style={styles.user}>
                    <ProfilImage uri={currentUser.profile} size={70} />
                    <View style={styles.post} >
                        <Text style={styles.text}> {post} </Text>
                        <Text style={styles.text}>Publications</Text>
                    </View>
                    <View style={styles.followers} >
                        <Text style={styles.text}> {currentUser.followers.length !== undefined ? currentUser.followers.length : 0} </Text>
                        <Text style={styles.text}>Abonnés</Text>
                    </View>
                    <View style={styles.following} >
                        <Text style={styles.text}> {currentUser.following.length} </Text>
                        <Text style={styles.text}>Abonnements</Text>
                    </View>
                </View>
                <View style={styles.updateProfile}>
                    <TouchableOpacity style={styles.btn} onPress={() => setupdateProfil(true)} >
                        <Text style={styles.text} >Modifier mon profil</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.contactView}>
                    <Text style={styles.contact}>Contact à découvrir</Text>
                    <AntDesign
                        name={'contacts'}
                        size={25}
                        color={'#40B5AD'}
                    />
                </View>
                <FlatList
                    data={users.filter(user => user._id !== currentUser._id)}
                    horizontal
                    renderItem={
                        ({ item }) => <Suggestion key={item._id} user={item} />
                    }
                    keyExtractor={item => item._id}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        )
    } else {
        return (
            <ProfilChange close={handleProfilChange} />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        marginTop: 30
    },
    user: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    text: {
        fontSize: 15,
        textAlign: 'center',
    },
    pseudoText: {
        fontSize: 25,
        textAlign: 'center',
        paddingBottom: 15,
        paddingTop: 15,
        textTransform: 'capitalize',
        fontWeight: '100',
        color: '#949298',
    },
    pseudo: {
        borderBottomWidth: 1,
        borderColor: '#949298',
        alignItems: 'center',
    },
    updateProfile: {
        marginTop: 20
    },
    btn: {
        width: Dimensions.get('window').width - 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 12,
        paddingRight: 10,
        textAlign: 'center',
        borderWidth: 1,
        backgroundColor: '#40B5AD',
        margin: 10,
        borderColor: '#40B5AD',
        fontSize: 20,
        color: '#fff'
    },
    contact: {
        fontSize: 18,
        fontWeight: '400',
    },
    contactView: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

})

export default ProfilSetting
