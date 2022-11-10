import React, {useState, useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    FlatList,
    Pressable,
    View,
    Image,
    PermissionsAndroid,
    Dimensions,
    Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Contacts from 'react-native-contacts';
import SearchComponent from '../components/search';

const width = Dimensions
    .get('window')
    .width;
const height = Dimensions
    .get('window')
    .height;

const InviteFriends = ({navigation}) => {
    let [contacts,
        setContacts] = useState([]);
    const [searchPhrase,
        setSearchPhrase] = useState("");
    useEffect(() => {
        if (Platform.OS === 'android') {
            PermissionsAndroid
                .request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
                title: 'Contacts',
                message: 'This app would like to view your contacts.'
            })
                .then(() => {
                    loadContacts();
                });
        } else {
            loadContacts();
        }
    }, [])

    const loadContacts = () => {
        Contacts
            .getAll()
            .then(contacts => {
                contacts.sort((a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase(),);
                console.log('contacts', contacts[0].phoneNumbers[0].number)
                setContacts(contacts);
            })
            .catch(e => {
                alert('Permission to access contacts was denied');
                console.log('Permission to access contacts was denied');
            });
    };

    // console.log('contacts', contacts.length)
    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => navigation.navigate('interests')}
                style={styles.skipContainer}>
                <Text style={styles.skipText}>
                    Skip
                </Text>
            </Pressable>
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
                
                return (
                  
                    <View
                        style={styles.listContainer}
                        key={e
                        ?.recordID}>
                        <Image
                style={styles.imageContainer}
                source={{
                uri: e.thumbnailPath
            }}/>
                        <View style={styles.contactWrapper}>
                        
                        <Text style={styles.contactName}>{e?.displayName ? e?.displayName: ''}</Text>
                        <Text style={styles.contactNumber}>{e?.phoneNumbers[0].number}</Text>
                        </View>
                        <Pressable onPress={() => navigation.navigate('')} style={styles.smallButton}>
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
                onPress={() => navigation.navigate('interests')}
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
        height: height / 2.5,
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

export default InviteFriends;