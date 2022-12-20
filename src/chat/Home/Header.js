import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Header() {
  return (
    <View style={{height:80,flexDirection:'row'}}>
      <View style={{width:'80%'}}>

      </View>
      <View style={{flexDirection:'row',alignItems:'center'}}>
          <Text>
              N
          </Text>
          <Text>
              S
          </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})