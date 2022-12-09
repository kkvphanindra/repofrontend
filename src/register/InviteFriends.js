import React, {useState, useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    FlatList,
    Pressable,
    View,
    Image,
    PermissionsAndroid,
    ToastAndroid,
    Dimensions,
    Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Contacts from 'react-native-contacts';
import SearchComponent from '../components/search';
import SmsAndroid from 'react-native-get-sms-android';


const width = Dimensions
    .get('window')
    .width;
const height = Dimensions
    .get('window')
    .height;

const InviteFriends = ({route, navigation}) => {
    const { uniqueID, phoneNumber, name, dob, gender, occupation, profilePic, coverPic, latitude, longitude } = route?.params;
    let [contacts, setContacts] = useState([]);
    const [searchPhrase, setSearchPhrase] = useState("");
    const [spinner, setSpinner] = useState(false);

    // console.log("searchPhrase invite ", searchPhrase)
        async function requestContactsPermission() {
            if (Platform.OS === 'ios') {
                return true
               } else {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
                ]);
                if (
                    granted['android.permission.READ_CONTACTS'] === PermissionsAndroid.RESULTS.GRANTED &&
                    granted['android.permission.WRITE_CONTACTS'] === PermissionsAndroid.RESULTS.GRANTED
                    ) {
                        console.log('granted if ==>> ');
                        return true
                    } else {
                        console.log('granted else ==>> ');
                        return false
                    }
                }
                    
        }

    useEffect(() => {
        if(searchPhrase === ''){
           requestContactsPermission().then((didGetPermission) => {
                if (didGetPermission) {
                    console.log("didGetPermission", didGetPermission);
                    loadContacts()
                }
            });
        }
        else{
            setSpinner(true);
            Contacts.getContactsMatchingString(searchPhrase).then(contacts => {
                contacts.sort((a, b) => a.displayName.localeCompare(b.displayName));
                setContacts(contacts);
                setSpinner(false);
            }).catch(e => {
                console.log('no contacts in list', e);
            });
            // contacts.filter((x) => {
            //     if(x.displayName.toLowerCase().includes(searchPhrase.toLowerCase())){
            //         console.log("xxx",x);
            //         setContacts(x);      
            //     }
            //     else{
            //         setContacts(contacts)
            //     }
            // })
        }

    }, [searchPhrase])
    // console.log("contacts render", contacts)
    const loadContacts = () => {
        setSpinner(true);
        Contacts
            .getAll()
            .then(contacts => {
                // console.log('contacts ==>', contacts)
                // contacts.sort((a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase(),);
                // console.log('contacts', contacts[0].phoneNumbers[0].number)
                contacts.sort((a, b) => a.displayName.localeCompare(b.displayName));
                setContacts(contacts);
                setSpinner(false);
            })
            .catch(e => {
                console.log('Permission to access contacts was denied', e);
            });
    };

    const getSMSPermission = async () => {
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.SEND_SMS
            ]);
            if (
                granted['android.permission.SEND_SMS'] === PermissionsAndroid.RESULTS.GRANTED
                ) {
                    console.log('granted if ==>> ');
                    return true
                } else {
                    console.log('granted else ==>> ');
                    return false
                }
            
      };

    const sendSMSCallback = async (number) =>{
        // SendSMS.send("+919952022301", "Hey");
        getSMSPermission().then(e => {
            console.log(e, "result sendSMSCallback", number);
            if(e){
                SmsAndroid.autoSend(
                    number,
                    'welcome message frisles app',
                    (fail) => {
                        console.log('Failed with this error: ' + fail);
                        ToastAndroid.showWithGravityAndOffset(
                            `Request ${fail}`,
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM,
                            25,
                            height
                          );
                    },
                    (success) => {
                        console.log('SMS sent successfully', success);
                        ToastAndroid.showWithGravityAndOffset(
                            `Request ${success}`,
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM,
                            25,
                            height
                          );
                    },
                );
            }

        });
    }

    const contactCallback = () => {

    }
    
    console.log('contacts ==>', contacts.length)
    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => navigation.navigate('interests', {
                    uniqueID: uniqueID,
                    phoneNumber: phoneNumber,
                    name: name, 
                    dob: dob, 
                    gender: gender, 
                    occupation: occupation,
                    profilePic: profilePic,
                    coverPic: coverPic,
                    latitude: latitude,
                    longitude: longitude
                })}
                style={styles.skipContainer}>
                <Text style={styles.skipText}>
                    Skip
                </Text>
            </Pressable>
            {spinner && <ActivityIndicator size="large" color="#0000ff" />}
            <View style={styles.wrapper}>
                <Text style={styles.title}>Invite Friends</Text>
                <Text style={styles.subTitle}>All Contacts</Text>
                <View style={styles.searchContainer}>
                    <SearchComponent  placeHolder={'Search'} searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase}/>
                </View>
                <View style={styles.contactContainer}>
                    <SafeAreaView>
                        <ScrollView showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}>
                            {contacts.length > 0 && contacts.map((e, i) => {
                                // console.log('eeee==> ', e?.givenName)
                                return (
                                    <View
                                        style={styles.listContainer}
                                        key={e
                                        ?.recordID}>
                                        {
                                            e?.thumbnailPath !== '' ?
                                            <Image
                                                style={styles.imageContainer}
                                                source={{
                                                uri: e?.thumbnailPath
                                            }}/> :
                                            <View style={styles.contactImage}>
                                                <Text style={styles.contactImageTxt}>{e?.displayName.substring(0, 1)}</Text>
                                            </View>
                                        }    
                                        <View style={styles.contactWrapper}>
                                            <Text style={styles.contactName}>{e?.displayName ? e?.displayName: ''}</Text>
                                            <Text style={styles.contactNumber}>{e?.phoneNumbers.length ? e?.phoneNumbers[0]?.number : ''}</Text>
                                        </View>
                                        <Pressable onPress={() => sendSMSCallback(e?.phoneNumbers[0]?.number)} style={styles.smallButton}>
                                            <Text style={styles.smallButtonText}>Invite</Text>
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
                onPress={() => navigation.navigate('interests', {
                    uniqueID: uniqueID,
                    phoneNumber: phoneNumber,
                    name: name, 
                    dob: dob, 
                    gender: gender, 
                    occupation: occupation,
                    profilePic: profilePic,
                    coverPic: coverPic,
                    latitude: latitude,
                    longitude: longitude
                })}
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
        paddingBottom: 10
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
  contactImage:{
    backgroundColor: '#5D6AFF',
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contactImageTxt:{
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: 24,
    justifyContent: 'center',
    alignItems: 'center'
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

export default InviteFriends;