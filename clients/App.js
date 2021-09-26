/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import Login from './src/screens/LoginScreen';
import Container from './src/screens/HomeScreen/Container';
import RegisterScreen from './src/screens/RegisterScreen';
import { Provider } from 'react-redux';
import { store } from './src/redux/store/userStore'



const Stack = createNativeStackNavigator();


const Tab = createBottomTabNavigator();


const HomeStack = createNativeStackNavigator();

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
              source={{ uri: 'https://scontent.ftnr1-1.fna.fbcdn.net/v/t1.6435-9/53264589_2267046020229713_6469793500375285760_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFj9Q3IoRNutVAYFPyjwdnyNsw_AFpk_6w2zD8AWmT_rGlJPCgP8qGwUUqq0UGpKJ7k2fEUuRFbxeKNJkBBlZfT&_nc_ohc=4SqrklT8Zt8AX92FNdM&_nc_ht=scontent.ftnr1-1.fna&oh=339e24de107d93f09752dcafe095c9a1&oe=6150A64C' }}
              style={{ height: 30, width: 30 }}
            />
          },
          headerRight: () => {
            return <MaterialIcons name={'message'} size={25} />
          },
          headerStyle: {
            backgroundColor: '#fff'
          }
          //headerShadowVisible: false
        }}

      />
    </HomeStack.Navigator>
  );
}

const App: () => Node = () => {
  return (
    <Provider store={store} >
      <NavigationContainer
        independent={true}
      >
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Container" component={Container}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen}
            options={{ headerShown: false }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
};

export default App;
