import React from 'react'
import { FlatList } from 'react-native'
import Story from '../Story'

const data = [
    {
        imageUri: 'https://scontent.ftnr1-1.fna.fbcdn.net/v/t1.6435-9/216705479_1078869752640193_612906026221720555_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeF3_XbH6MGOZbpfZfbUtaR0Kb3QkMBz-oUpvdCQwHP6hVRIVmqt7GuxkUs0MLduTsivdowL8Kq54fqg-ighgJjl&_nc_ohc=fZ-uKDkisLsAX_vl6q1&_nc_ht=scontent.ftnr1-1.fna&oh=4c146bef7b31d056fbedebbe68b961dc&oe=61516F22',
        name: 'react',
        key:0
    },
    {
        imageUri: 'https://reactnative.dev/img/tiny_logo.png',
        name: 'react',
        key:1
    },
    {
        imageUri: 'https://reactnative.dev/img/tiny_logo.png',
        name: 'react-native',
        key:2
    },
    {
        imageUri: 'https://reactnative.dev/img/tiny_logo.png',
        name: 'react-native',
        key:3
    },
    {
        imageUri: 'https://reactnative.dev/img/tiny_logo.png',
        name: 'react-native',
        key:4
    },
    {
        imageUri: 'https://reactnative.dev/img/tiny_logo.png',
        name: 'react-native',
        key:5
    },
    
  
   

]

const Stories = () => {
    return (
        <FlatList
            horizontal
            data= { data } 
            renderItem= {({item}) => <Story imageUri={item.imageUri} name={item.name} />} 
            showsHorizontalScrollIndicator={false}
            keyExtractor= {item => item.key}
        />
           
        
    )
}

export default Stories

