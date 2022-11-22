import {StyleSheet, Text, View, TouchableOpacity, Image,ImageBackground, Dimensions} from 'react-native';
import React from 'react';

const ChatHeader = props => {
  const navigation = props.navigation;
  return (
    <View {...props}>
      <ImageBackground
        source={require('../../assets/images/home-top-bg.png')}
        resizeMode="cover"
        style={styles.topContainer}>
        <View {...props} style={styles.chatheader}>
          <View style={styles.icon}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                // source={props.profilePic}
                source={require('../../assets/icons/png/backButton.png')}
                // style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.iconImage}>
            <Image
              // style={styles.iconImage}
              style={{
                width: 50,
                height: 50,
                alignSelf: 'center',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                borderRadius: 100 / 2,
              }}
              source={props.profilePic}
              // source={require('../../assets/icons/png/backButton.png')}
              // style={styles.icon}
            />
          </View>
          <View style={styles.nameHeader}>
            <Text style={styles.nameText} onPress={props.onPressName}>
              {props.name}
            </Text>
            <Text style={styles.numberText} numberOfLines={1}>
              {props.number}
            </Text>
          </View>
          <TouchableOpacity style={styles.call} onPress={()=>navigation.navigate('callNow')}>
            <Image
              source={require('../../assets/icons/png/call-icon.png')}
              style={{
                height: 35,
                width: 35,
                marginTop: '10%',
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.moreOption}>
            <Image
              source={require('../../assets/icons/png/actions.png')}
              style={{height: 22, width: 22, alignSelf: 'center'}}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ChatHeader;

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const styles = StyleSheet.create({
  chatheader: {
    // backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    // width: width/1.2,
  },
  topContainer:{
    // flex:1,
    // backgroundColor: 'pink',
    width: width/1,
    height: height/7
},
  icon: {
    marginLeft: '2%',
    marginTop: '11%',
    marginRight: '5%',
  },
  iconImage: {
    // backgroundColor: 'powderblue',
    marginTop: '7%',
    width: 60,
    height: 60,
    justifyContent: 'center',
    borderRadius: 100 / 2,
  },
  nameHeader: {
    marginTop: '8%',
    width: '39%',
    marginLeft: '3%',
  },
  nameText: {
    textAlign: 'left',
    color: '#000',
    fontSize: 22,
    // width: '80%',
    fontWeight: '800',
  },
  numberText: {
    textAlign: 'left',
    color: '#000',
    width: '90%',
    fontSize: 14,
    marginLeft: '2%',
    marginTop: '1%',
    // fontWeight: '800',
  },
  call: {
    // backgroundColor: 'black',
    alignSelf: 'flex-start',
    marginLeft: '8%',
    marginTop: '9%',
    // width: 40,
    // height: 40,
    borderRadius: 100 / 2,
  },
  moreOption: {
    // backgroundColor: 'powderblue',
    marginLeft: '3%',
    marginTop: '11%',
    width: 20,
    height: 20,
    borderRadius: 100 / 2,
  },
});
