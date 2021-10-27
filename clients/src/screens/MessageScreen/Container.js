
import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MessageDetail from './MessageDetail';
import MessageSreen from '.';

const Stack = createNativeStackNavigator()

const ContainerMessage = () => {
    return (
        <NavigationContainer
            independent={true}

        >
            <Stack.Navigator>
                <Stack.Screen
                    name="Message"
                    component={MessageSreen}
                    options={{
                        title: 'Messages',
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: '#40B5AD',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}

                />
                <Stack.Screen
                    name='MessageDetail'
                    component={MessageDetail}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default ContainerMessage

const styles = StyleSheet.create({})
