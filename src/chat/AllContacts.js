import {
  StyleSheet,
  Text,
  View,
  FlatList,
  PermissionsAndroid,
  Platform,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import Contacts from 'react-native-contacts';
import ContactList from '../components/Chat/ContactList';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getContact} from '../redux/Chat/actions';

const AllContacts = ({contact}) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [filteredData, setFilteredData] = useState([])
  const chatState = useSelector(state => state.chatState);
  const [phone, setPhone] = useState([]);
  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
      }).then(() => {
        loadContacts();
      });
    } else {
      loadContacts();
    }
  }, []);
  const loadContacts = () => {
    Contacts.getAll()
      .then(contacts => {
        contacts.sort(
          (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase(),
        );
        setData(contacts);
        setFilteredData(contacts)
        setContacts(contacts.map(i => i.phoneNumbers.map(p => p.number)));
      })
      .catch(e => {
        alert('Permission to access contacts was denied');
        console.warn('Permission to access contacts was denied');
      });
  };
  // console.log("contact 37", contacts, "sp", phone)
  const search = text => {
    const phoneNumberRegex =
      /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    if (text === '' || text === null) {
      loadContacts();
    } else if (phoneNumberRegex.test(text)) {
      Contacts.getContactsByPhoneNumber(text).then(contacts => {
        contacts.sort(
          (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase(),
        );
        setContacts(contacts);
        console.log('contacts', contacts);
      });
    } else {
      Contacts.getContactsMatchingString(text).then(contacts => {
        contacts.sort(
          (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase(),
        );
        setContacts(contacts);
        setFilteredData(contacts)
        console.log('contacts', contacts,filteredData);
      });
    }
  };

  const openContact = contact => {
    console.log(JSON.stringify(contact));
    Contacts.openExistingContact(contact);
  };
  let arr = [];
  for (let i = 0; i < contacts.length; i++) {
    const element = contacts[i];
    let value = (element[0] || '').replace(/\D/g, '').slice(-10);
    arr.push(value);
    // console.log('arr', arr);
  }
  console.log('arr', chatState.contacts);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      {/* {console.log("all contacts", data)} */}
      <TextInput
        onChangeText={search}
        placeholderTextColor="#000"
        placeholder="Search"
        style={styles.searchBar}
      />
      <View>
        {/* {chatState.contacts.map(item => {
          return ( */}
            <View>
              {/* {item?.userId ? ( */}
                <FlatList
                  data={filteredData}
                  renderItem={contact => {
                    // { console.log("contacts", contact) }
                    return (
                      // <View style={{flexDirection: 'row'}}>
                      //   <Text>{contact.item.displayName}</Text>
                      //   <TouchableOpacity>
                      //     <Text>Invite</Text>
                      //   </TouchableOpacity>
                      // </View>
                      <View>
                      <ContactList
                        key={contact.item.recordID}
                        item={contact.item}
                        onPress={openContact}
                      />
                      </View>
                    );
                  }}
                  keyExtractor={item => item.recordID}
                />
              {/* ) : ( */}
                {/* <View
                  style={{
                    flexDirection: 'row',
                    marginTop: '2%',
                    marginLeft: '1%',
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.contactName}>{item.name}</Text>
                  <TouchableOpacity style={styles.invite}>
                    <Text style={styles.inviteText}>Invite</Text>
                  </TouchableOpacity>
                </View> */}
              {/* )} */}
            </View>
          {/* );
        })} */}
      </View>
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
