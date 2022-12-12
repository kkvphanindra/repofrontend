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
import {createChat, getContact, groupCreate, reqName, reqUserId} from '../redux/Chat/actions';

const AllContacts = ({route}) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const authState = useSelector(state => state.authState);
  const [selectedName, setSelectedName] = useState([authState.name]);
  const [number, setNumber] = useState([authState.userId]);
  const [contacts, setContacts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const chatState = useSelector(state => state.chatState);
  const [phone, setPhone] = useState([]);

  const {isGroupChat} = route.params;

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
      }).then(() => {
        loadContacts();
      });
    } else {
      console.log('error getting contacts');
      loadContacts();
    }
  }, []);
  const loadContacts = () => {
    if (chatState.contacts == undefined) {
      Contacts.getAll()
        .then(contacts => {
          contacts.sort(
            (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase(),
          );
          setData(contacts);
          // console.log()
          setFilteredData(contacts);
          setContacts(contacts.map(i => i.phoneNumbers.map(p => p.number)));
        })
        .catch(e => {
          alert('Permission to access contacts was denied');
          console.warn('Permission to access contacts was denied');
        });
    }

    let num = '';
    let final = [];
    let arr = chatState.contacts;
    console.log('start', arr);

    // console.log("before", d)
    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];
      final.push({
        name: element.name,
        phone: element.phone,
        profilePicture: element.profilePicture,
        isSelected: false,
        userId: element.userId,
      });
    }
    if (isGroupChat) {
      let fnl = final.filter(y => {
        return y.userId !== null;
      });
      setData(fnl);
      setFilteredData(fnl);
    } else {
      console.log('end'.arr);
      setData(final);
      setFilteredData(final);
    }

    // console.log(chatState.contacts)
    // formatContact(data)
  };
  // console.log("contact 37", contacts, "sp", phone)
  const search = text => {
    const d1 = data.filter(a => a.name.toLowerCase().includes(text));
    setFilteredData(d1);
    console.log('contacts', contacts);

    // const phoneNumberRegex =
    //   /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    // if (text === '' || text === null) {
    //   loadContacts();
    // } else if (phoneNumberRegex.test(text)) {
    //   const d1 =
    //   data.filter(
    //     (a) => a.name.toLowerCase().includes(text)
    //   )
    //   // Contacts.getContactsByPhoneNumber(text).then(contacts => {
    //   //   contacts.sort(
    //   //     (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase(),
    //   //   );
    //   setContacts(d1);
    //   console.log('contacts', contacts);
    //   // });
    // } else {

    //   Contacts.getContactsMatchingString(text).then(contacts => {
    //     contacts.sort(
    //       (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase(),
    //     );
    //     setContacts(contacts);
    //     setFilteredData(contacts)
    //     console.log('contacts', contacts, filteredData);
    //   });
    // }
  };

  // const openContact = contact => {
  //   console.log(JSON.stringify(contact));
  //   Contacts.openExistingContact(contact);
  // };

  //   const formatContact = (d) =>{
  //     let num = '';
  //   let arr = [];
  // console.log("before", d)
  //     for (let j = 0; j < data.length; j++) {
  //           const element = a[j];
  //           const element2 = data[j];
  //           // console.log("num", element2)
  //           let value = (data[0] || '').replace(/[^+\d]+/g, "");
  //           // console.log("val", value)
  //            num= value;
  //           arr.push({ 'name': element, 'number': num , isSelected:false});
  //         }
  //         setData(arr)
  //     setFilteredData(arr)
  //     console.log("fil", arr)

  //   }

  const selectContact = userId => {
    // console.log("149 userId",userId)
    // if(userIdnull){

    // } else{
    // console.log("first")

    console.log(data);
    let newData = data.map(x =>
      x.userId == userId
        ? {
            name: x.name,
            phone: x.phone,
            profilePicture: x.profilePicture,
            isSelected: !x.isSelected,
            userId: x.userId,
          } && console.log('163', {name: x.name})
        : x && console.log('x 165', x),
    );
    // let selectState =
    // data.find(item=> item.userId==userId? item.isSelected=!item.isSelected:null);
    // selectState.isSelected= !selectState.isSelected;

    // setData(selectState);
    // setFilteredData(selectState)
    console.log('antim');
    console.log(newData);
    // }
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
  // useEffect((async) => {
  //   contact()
  // }, [])

  // let a = data.map(i => i.displayName)
  // // console.log(a)
  // let num = '';
  // let arr = [];
  // // console.log("chatstate.contacts", chatState.data[0].users[0])
  // const contact = () => {

  //   for (let j = 0; j < contacts.length; j++) {
  //     const element = a[j];
  //     const element2 = contacts[j];
  //     // console.log("num", element2)
  //     let value = (element2[0] || '').replace(/[^+\d]+/g, "");
  //     // console.log("val", value)
  //     num = value;
  //     arr.push({ 'name': element, 'number': num , isSelected:false});
  //   }
  //   console.log("here", arr)
  // dispatch(getContact(arr))
  // navigation.navigate("allContacts")
  // }

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
          {/* {item?.userId ? ( */}
          <FlatList
            data={filteredData}
            renderItem={contact => {
              {
                console.log('contact1s', filteredData);
              }
              {
                console.log('groupc', isGroupChat);
              }
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
                    isGroupChat={isGroupChat}
                    // selectContact= {()=>selectContact(contact)}
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
                          // navigation.navigate('Chat'),
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
      <TouchableOpacity {...selectedName} style={{position: 'absolute', bottom: 0, right: 15, marginBottom: 20}} onPress={()=>{navigation.goBack()}}>
        <Text style={{color: '#000'}}>done</Text>
      </TouchableOpacity>
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
