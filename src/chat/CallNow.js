import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import {BlurView} from '@react-native-community/blur';
import React from 'react';
// import {TouchableOpacity} from 'react-native-gesture-handler';

export default function CallNow({navigation}) {
  return (
    <View style={styles.container}>
      <Image
        blurRadius={15}
        source={{
          uri: 'https://cdn.create.vista.com/api/media/small/142981027/stock-photo-stylish-handsome-man',
        }}
        style={styles.absolute}
      />
      <Image
        style={styles.imageView}
        source={{
          uri: 'https://cdn.create.vista.com/api/media/small/142981027/stock-photo-stylish-handsome-man',
        }}
      />
      <Text style={styles.name}>Tushar Malhotra</Text>
      <Text style={styles.time}>03:15</Text>
      <View style={{flexDirection: 'row', marginTop: '50%'}}>
        <TouchableOpacity style={styles.endingView}>
        <Image
          source={require('../assets/icons/png/list.png')}
          style={{height: 35, width: 35, marginTop: '19%',marginLeft: '7%',}}
          />
          </TouchableOpacity>
        <TouchableOpacity style={styles.endingViewCall} onPress={()=>navigation.goBack()}>
          <Image
          source={require('../assets/icons/png/ongoingCallButton.png')}
          style={{height: 50, width: 50,borderRadius: 100,}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.endingView}>
        <Image
          source={require('../assets/icons/png/Speaker.png')}
          style={{height: 30, width: 44,marginRight: '10%', marginTop: '19%',
          marginLeft: '7%',}}
          />
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    // backgroundColor: 'grey'
  },
  imageView: {
    marginTop: '40%',
    width: 150,
    height: 150,
    borderRadius: 100 / 1,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'grey',
  },
  name: {
    marginTop: '5%',
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
  },
  time: {
    marginTop: '3%',
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  endingView: {
    width: 50,
    height: 50,
    marginRight: '10%',
    marginLeft: '10%',
    borderRadius: 100 / 1,
    // backgroundColor: 'grey',
    marginTop: '20%',
    alignSelf: 'center'
  },
  endingViewCall: {
    width: 50,
    height: 50,
    marginRight: '10%',
    marginLeft: '10%',
    borderRadius: 10,
    // backgroundColor: 'red',
    marginTop: '20%',
    elevation: 0,
    alignSelf: 'center'
  }
});
