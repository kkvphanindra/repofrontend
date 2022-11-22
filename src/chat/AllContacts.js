import { StyleSheet, Text, View, FlatList, PermissionsAndroid, Platform, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import Contacts from 'react-native-contacts';
import ContactList from '../components/Chat/ContactList';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getContact } from '../redux/Chat/actions';

const AllContacts = ({ contact }) => {
  const navigation = useNavigation()
  const [data, setData] = useState([])
  const [contacts, setContacts] = useState([]);
  const chatState = useSelector((state) => state.chatState)
  const [phone, setPhone] = useState([])
  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
      }).then(() => {
        loadContacts();
      }
      );
    } else {
      loadContacts();
    }
  }, []);
  const loadContacts = () => {
    Contacts.getAll()
      .then(contacts => {
        contacts.sort(
          (a, b) =>
            a.givenName.toLowerCase() > b.givenName.toLowerCase(),
        );
        setData(contacts)
        setContacts(contacts.map((i) => i.phoneNumbers.map((p) => p.number)));
      })
      .catch(e => {
        alert('Permission to access contacts was denied');
        console.warn('Permission to access contacts was denied');
      });
  };
  // console.log("contact 37", contacts, "sp", phone)
  const search = (text) => {
    const phoneNumberRegex =
      /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    if (text === '' || text === null) {
      loadContacts();
    } else if (phoneNumberRegex.test(text)) {
      Contacts.getContactsByPhoneNumber(text).then(contacts => {
        contacts.sort(
          (a, b) =>
            a.givenName.toLowerCase() > b.givenName.toLowerCase(),
        );
        setContacts(contacts);
        console.log('contacts', contacts);
      });
    } else {
      Contacts.getContactsMatchingString(text).then(contacts => {
        contacts.sort(
          (a, b) =>
            a.givenName.toLowerCase() > b.givenName.toLowerCase(),
        );
        setContacts(contacts);
        console.log('contacts', contacts);
      });
    }
  };

  const openContact = (contact) => {
    console.log(JSON.stringify(contact));
    Contacts.openExistingContact(contact);
  };
  let arr = []
  for (let i = 0; i < contacts.length; i++) {
    const element = contacts[i];
    let value = (element[0] || '').replace(/\D/g, '').slice(-10);
    arr.push(value)
    console.log("arr", arr)
  }
  console.log("arr", chatState.contacts)
  const dispatch = useDispatch()
  return (
    <View style={styles.container}>
      {/* {console.log("all contacts", data)} */}
      <TextInput
        onChangeText={search} r
        placeholderTextColor='#000'
        placeholder="Search"
        style={styles.searchBar}
      />
      <View>
      {chatState.contacts.map((item) => {
        return (
          <View>
            {item?.userId?
            <FlatList
              data={data}
              renderItem={(contact) => {
                // { console.log("contacts", contact) }
                return (
                  // <View style={{flexDirection: 'row'}}>
                  //   <Text>{contact.item.displayName}</Text>
                  //   <TouchableOpacity>
                  //     <Text>Invite</Text>
                  //   </TouchableOpacity>
                  // </View>
                  <ContactList
                    key={contact.item.recordID}
                    item={contact.item}
                    onPress={openContact}
                  />
                );
              }}
              keyExtractor={(item) => item.recordID}
            />:
             <View style={{flexDirection: 'row'}}>
                    <Text>{item.name}</Text>
                    <TouchableOpacity>
                      <Text>Invite</Text>
                    </TouchableOpacity>
                  </View>
          }
          </View>
        )
      })}
      </View>
    </View>
  )
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  searchBar: {
    backgroundColor: '#f0eded',
    paddingHorizontal: 30,
    color: '#000',
    paddingVertical: Platform.OS === 'android' ? undefined : 15,
  },
});

export default AllContacts
