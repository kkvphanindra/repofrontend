import React, { useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Pressable,
  FlatList,
  View,
  Image,
    PermissionsAndroid,
    Dimensions,
    Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SearchComponent from '../components/search';

const height = Dimensions.get('window').height;

const Groups = ({navigation}) => {
  const [searchPhrase, setSearchPhrase] = useState("");

  const groupDatas = [
    {
      "pic": require('../assets/images/picture-1.png'),
      "name": 'Goku',
      "number": '9878321453',
      "id": 1
    },
    {
      "pic": require('../assets/images/picture-2.png'),
      "name": 'Trunks',
      "number": '9878321453',
      "id": 2
    },
    {
      "pic": require('../assets/images/picture-3.png'),
      "name": 'Freza',
      "number": '9878321453',
      "id": 3
    },
    {
      "pic": require('../assets/images/picture-1.png'),
      "name": 'Yamcha',
      "number": '9878321453',
      "id": 3
    },
    {
      "pic": require('../assets/images/picture-2.png'),
      "name": 'Pikolo',
      "number": '9878321453',
      "id": 4
    },
    {
      "pic": require('../assets/images/picture-3.png'),
      "name": 'Cullin',
      "number": '9878321453',
      "id": 5
    },
    {
      "pic": require('../assets/images/picture-1.png'),
      "name": 'Vegeta',
      "number": '9878321453',
      "id": 6
    },
    {
      "pic": require('../assets/images/picture-2.png'),
      "name": 'Gohan',
      "number": '9878321453',
      "id": 7
    },
  ]
    return(
<View style={styles.container}>
            <Pressable
                onPress={() => navigation.navigate('home')}
                style={styles.skipContainer}>
                <Text style={styles.skipText}>
                    Skip
                </Text>
            </Pressable>
            <View style={styles.wrapper}>
                <Text style={styles.title}>Group Names</Text>
                <View style={styles.searchContainer}>
                    <SearchComponent placeHolder={'Search Groups'} searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase}/>
                </View>
                <View style={styles.contactContainer}>
                <SafeAreaView>
    <ScrollView showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                {groupDatas.length > 0 && groupDatas.map((e, i) => {
                
                return (
                  
                    <View
                        style={styles.listContainer}
                        key={i}>
                        <Image style={styles.imageContainer} source={e.pic}/>
                        <View style={styles.contactWrapper}>
                        <Text style={styles.contactName}>{e?.name ? e?.name: ''}</Text>
                        <Text style={styles.contactNumber}>{e?.number}</Text>
                        </View>
                        <Pressable onPress={() => navigation.navigate('')} style={styles.smallButton}>
                            <Text style={styles.smallButtonText}>Request</Text>
                        </Pressable>
                    </View>
                )
            })
        }
        </ScrollView>
                    </SafeAreaView>
                </View>
            </View>
            <Pressable
                onPress={() => navigation.navigate('home')}
                style={styles.buttonContainer}>
                <LinearGradient style={styles.buttonWrapper} colors={['#5E6BFF', '#212FCC']}>
                    <Text style={styles.buttonText}>
                        Done
                    </Text>
                </LinearGradient>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
      // flex: 1,
      backgroundColor: '#FFF',
      alignItems: 'center',
      justifyContent: 'center',
      height: height,
      paddingTop: 60
  },
  wrapper: {
      width: '80%',
      // flex: 1
  },
  skipContainer: {
      borderColor: '#505EF4',
      borderWidth: 1,
      borderRadius: 5,
      width: 91,
      height: 34,
      zIndex: 1,
      justifyContent: 'center',
      backgroundColor: '#FFF',
      position: 'absolute',
      right: 35,
      top: 20
  },
  skipText: {
      fontFamily: 'Inter',
      fontSize: 14,
      fontWeight: '400',
      color: '#5B67CA',
      lineHeight: 20,
      textAlign: 'center'
  },
  title: {
      fontFamily: 'Inter',
      fontSize: 32,
      fontWeight: '600',
      color: '#2C2C2C',
      lineHeight: 40,
      textAlign: 'center',
      paddingTop: 20,
      paddingBottom: 20
  },
  subTitle: {
      fontFamily: 'Inter',
      fontSize: 16,
      fontWeight: '600',
      color: '#2C2C2C',
      lineHeight: 20,
      textAlign: 'left',
      paddingVertical: 20
  },
  searchContainer: {},
  contactContainer: {
      marginTop: 20,
      height: height / 2,
      width: '100%',
      flexDirection: 'column'
  },
  listContainer: {
    flexDirection: 'row',
    borderBottomColor: '#D2D107',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10
},
imageContainer: {
    width: 54,
    height: 54,
    borderRadius: 54
},
contactWrapper: {
    flexDirection: 'column',
    marginRight: 'auto',
    marginLeft: 20
},
contactName: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    color: '#2C2C2C',
    lineHeight: 20
},
contactNumber: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    color: '#9EA6BE',
    lineHeight: 16
},
smallButton: {
    backgroundColor: '#5D6AFF',
    width: 74,
    height: 35,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
},
smallButtonText: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    color: '#FFF',
    lineHeight: 16,
    textAlign: 'center'
},
  buttonContainer: {
      width: '80%',
      height: 60,
      marginTop: 'auto',
      marginBottom: 40
  },
  buttonWrapper: {
      width: '100%',
      height: '100%',
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center'
  },
  buttonText: {
      fontFamily: 'Inter',
      fontSize: 16,
      fontWeight: '600',
      color: '#FFF',
      lineHeight: 20,
      textAlign: 'center'
  }
})
export default Groups;