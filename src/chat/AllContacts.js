import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  PermissionsAndroid,
  Platform,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect } from 'react';
import Contacts from 'react-native-contacts';
import ContactList from '../components/Chat/ContactList';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { createChat, getContact, groupFilter, reqName, reqUserId, singleFilter } from '../redux/Chat/actions';
import colours from '../assets/colours';
const AllContacts = ({ route }) => {
  const navigation = useNavigation();
  const authState = useSelector(state => state.authState);
  const chatState = useSelector(state => state.chatState);

  const { isGroupChat } = route.params;
  useEffect(() => {
    async function getContacts(contact) {

      let final = [];
      for (let j = 0; j < contact.length; j++) {
        const element = contact[j];
        // console.log("time", element)


        if (element.phoneNumbers[0]?.number != undefined && element.displayName != undefined) {
          console.log(element.phoneNumbers[0]?.number)
          let newPhone = element.phoneNumbers[0]?.number.replace(/\s/g, '').replace(/[()]/g, '')

          final.push({
            name: element.displayName,
            number: newPhone,
          });
          final.sort((a, b) => a.name.localeCompare(b.name))
        }
      }
      if (final.length > 0) {
        dispatch(getContact(final, isGroupChat));
      }

    }

    try {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts',
          message: 'This app would like to view your contacts.',
        })
        .then(() => {
          Contacts.getAll()
            .then(contacts => {
              getContacts(contacts)
            })
            .catch(e => {
              alert(e);
              console.warn('Permission to access contacts was denied',e);
            });
        })


    } catch (err) {
      console.log("error", err)
      console.warn(err);
    }

  }, []);
  const search = text => {
    let d1=[];
    if(isGroupChat){
      d1 = chatState.groupContact.filter(a => a.name.toLowerCase().includes(text));

    }else if(!isGroupChat){
      console.log("cc",chatState.contacts)
      d1 = chatState.contacts.filter(b=>b.name.toLowerCase().includes(text));
      
    }
    dispatch(groupFilter(d1))
    dispatch(singleFilter(d1))
    console.log('contacts search', d1,chatState.groupFilter, chatState.singleFilter);
  };
  const kil = (name, userId) => {
    console.log('object');
    if (chatState.name.includes(name) && chatState.userId.includes(userId)) {
      dispatch(reqName(chatState.name.filter(value => value !== name)));
      dispatch(reqUserId(chatState.userId.filter(value => value !== userId)));
      console.log('bi', chatState.name, chatState.userId);
    } else {
      dispatch(reqName([...new Set([...chatState.name, name])]));
      dispatch(reqUserId([...new Set([...chatState.userId, userId])]));
      console.log('se', chatState.name, chatState.userId);
    }
  };

  console.log('arr', chatState.contacts);
  const dispatch = useDispatch();

  
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(e)=>search(e)}
        placeholderTextColor="#000"
        placeholder="Search"
        style={styles.searchBar}
      />
      {chatState.loading?
    
      <View style={{flex:1, justifyContent:'center'}}>
        <ActivityIndicator  color={colours.primary}/>
      </View>
    
  :
      <View>
        <FlatList
          data={!isGroupChat?chatState.singleFilter:chatState.groupFilter}
          renderItem={contact => {
            return (
             
              <View>
                <ContactList
                  key={contact.item.recordID}
                  item={contact.item}
                  isGroupChat={isGroupChat}
                  selectContact={() =>
                    kil(contact?.item.name, contact.item.userId)
                  }
                  selectedContacts={chatState.userId}
                  isSelected={contact.item.isSelected}
                  createChat={() => {
                    dispatch(
                      createChat(
                        contact.item.userId,
                        authState.userId,
                      ),
                    );
                    navigation.navigate('Chat');
                  }}
                  invite={{}}
                />
              </View>
            );
          }}
          keyExtractor={item => item.recordID}
        />
        
      </View>
}
      {isGroupChat == true ?

        <TouchableOpacity style={{
          position: 'absolute',
          resizeMode: 'contain',
          alignItems: 'center',
          justifyContent: 'center',
          right: 30,
          bottom: 30,
          width: 50,
          height: 50,
          borderRadius: 50,
          backgroundColor: colours.primary,
        }} onPress={() => { navigation.goBack() }}>

          <Image style={{ height: 20, width: 20 }} source={require('../assets/icons/png/tick.png')} />
        </TouchableOpacity>

        : null}


    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    backgroundColor: '#f0eded',
    paddingHorizontal: 30,
    color: '#000',
    paddingVertical: Platform.OS === 'android' ? undefined : 15,
  },
  contactName: {
    width: '80%',
    color: '#000',
    fontSize: 16,
    marginTop: '2%',
    // backgroundColor: 'red',
    fontWeight: '400',
  },
  invite: {
    backgroundColor: '#5d6aff',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    // margin: '5%'
  },
  inviteText: {
    fontSize: 14,
    color: '#fff',
  },
});

export default AllContacts;
