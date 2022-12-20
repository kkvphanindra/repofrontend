import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const SnapCommentHeader = (props) => {
    const navigation = useNavigation()
  return (
    <View style={styles.header}>
          <TouchableOpacity onPress={props.navigation}>
          <Image
            // source={props.profilePic}
            source={require('../../assets/icons/png/backButton.png')}
            style={styles.icon}
          />
          </TouchableOpacity>
          <Text style={styles.headerText}>{props.header}</Text>
        </View>
  )
}

export default SnapCommentHeader

const styles = StyleSheet.create({
    icon: {
        marginTop: '10%',
        marginRight: '8%',
        marginLeft: '5%'
        },
        header: {
          alignSelf: 'flex-start',
          margin: '5%',
          flexDirection: 'row',
        },
        headerText: {
          color: '#000',
          fontSize: 22,
          fontWeight: 'bold',
        },
})