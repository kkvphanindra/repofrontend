import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ChatListItem from '../components/Chat/ChatListItem'
import CallListItem from '../components/Chat/CallListItem'
const data = [
  {
    id:"1",
    name: "Rajarshi",
    profileUrl: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png",
    lastMessage: "This is Okay!",
    time: "12:34 PM",
    unread: 3,
    date:"456789"
  },
  {
    id:"2",
    name: "Krishna",
    profileUrl: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png",
    lastMessage: "Fine!",
    time: "12:34 PM",
    unread: 15,
    date:"12345676"
  }
]
export default function Call({navigation}) {
  return (
    <View style={styles.container}>
      <ScrollView>
      {data.map((item, index) => {
        return (
          <View>
          <TouchableOpacity onPress={()=>navigation.navigate('callNow')}>
          <CallListItem
            id={index}
            name={item.name}
            profileUrl={item.profileUrl}
            lastMessage={item.lastMessage}
            time={item.time}
            unread={item.unread}
            date={item.date} />
            </TouchableOpacity>
            </View>
        )
      })}
      </ScrollView>
     
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20
  },
  button:{
    position: 'absolute',
    bottom: 50,
    right: 40,
    backgroundColor: 'black',
        width: 60,
        height: 60,
        borderRadius: 45,
        color:'white',
        
        
  },
  plus:{
    fontSize:45,
    color:'white',
    alignSelf:'center',

  }
})