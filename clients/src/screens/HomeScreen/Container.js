import React from 'react'
import { StatusBar, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getData } from '../LoginScreen/utils/storeData'


import HomeScreen from '.';
import MessageScreen from '../MessageScreen/index'
import NewPost from '../NewPost';
import Notification from '../Notification';
import ProfilImage from '../../components/ProfilImage';
import { useSelector } from 'react-redux'
import ProfilSetting from '../ProfilSetting';
import ContainerMessage from '../MessageScreen/Container';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();



//composant container responsable de la mise en place de la navigation sur le composant Home

function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerTitleAlign: 'center',
                    title: 'Mini',
                    headerLeft: () => {
                        return <Image
                            source={{ uri: 'https://scontent.ftnr1-1.fna.fbcdn.net/v/t1.6435-9/53264589_2267046020229713_6469793500375285760_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFj9Q3IoRNutVAYFPyjwdnyNsw_AFpk_6w2zD8AWmT_rGlJPCgP8qGwUUqq0UGpKJ7k2fEUuRFbxeKNJkBBlZfT&_nc_ohc=XhYhp3l9q18AX-_RuJb&tn=3un6r4YEW2HiX6dQ&_nc_ht=scontent.ftnr1-1.fna&oh=4538573bf6f5c4465992d151608f4e9a&oe=61801C4C' }}
                            style={{ height: 30, width: 30 }}
                        />
                    },
                    headerRight: () => {
                        return <MaterialIcons name={'message'} size={25} />
                    },
                    headerStyle: {
                        backgroundColor: '#fff'
                    },

                    //headerShadowVisible: false
                }}

            />
        </HomeStack.Navigator>
    );
}

const Container = ({ navigation }) => {
    const { currentUser } = useSelector(state => state.getCurrentUserInfoReducer);

    return (
        <>
            <NavigationContainer
                independent={true}
            >
                <StatusBar barStyle="dark-content" />
                <Tab.Navigator
                    detachInactiveScreens={true}

                    screenOptions={({ route }) => ({
                        tabBarStyle: {
                            position: 'absolute'
                        },
                        tabBarHideOnKeyboard: true,
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'HomeStackScreen') {
                                iconName = focused
                                    ? 'home'
                                    : 'home-outline';
                            } else if (route.name === 'MessageScreen') {
                                iconName = focused ? 'chatbox' : 'chatbox-outline';
                                
                            } else if (route.name === 'NewPost') {
                                iconName = focused ? 'add' : 'add-outline';
                                return <Ionicons name={iconName} size={30} color={color} />;
                            } else if (route.name === 'Notification') {
                                iconName = focused ? 'notifications' : 'notifications-outline';
                            } else if (route.name === 'ProfilSetting') {
                                iconName = focused ? 'add' : 'add-outline';
                                return <ProfilImage size={20} uri={currentUser.profile} key={3} />
                            }


                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: 'black',
                        tabBarInactiveTintColor: 'gray',
                        headerShown: false,
                        tabBarShowLabel: false,

                    })}
                >
                    <Tab.Screen name="HomeStackScreen" component={HomeStackScreen}  />
                    <Tab.Screen name="MessageScreen" component={ContainerMessage} />
                    <Tab.Screen name="NewPost" component={NewPost} />
                    <Tab.Screen name="Notification" component={Notification} />
                    <Tab.Screen name="ProfilSetting" component={ProfilSetting} />

                </Tab.Navigator>
            </NavigationContainer>
        </>
    );
}

export default Container
