// Access Device’s Contact List in React Native App
// https://aboutreact.com/access-contact-list-react-native/

import React, { memo } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

import PropTypes from 'prop-types';
import Avatar from './Avatar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContact } from '../../redux/Chat/actions';
import colours from '../../assets/colours';


const getAvatarInitials = (textString) => {
  if (!textString) return '';
  const text = textString.trim();
  const textSplit = text.split(' ');
  if (textSplit.length <= 1) return text.charAt(0);
  const initials =
    textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);
  return initials;
};

const ContactList = (props) => {
  const chatState = useSelector((state) => state.chatState)
  const dispatch = useDispatch()
  const shouldComponentUpdate = () => {
    return false;
  };
  const { item, invite, createChat, isGroupChat, isSelected ,selectContact, selectedContacts } = props;
  // console.log("item", chatState.contacts)
  // let arr = [];
  // for (let i = 0; i < contacts.length; i++) {
  //   const element = contacts[i];
  //   let value = (element[0] || '').replace(/\D/g, '').slice(-10);
  //   arr.push(value);
  // }
  // useEffect(()=>{
  //   dispatch(getContact(arr));
  // },[dispatch])
  // id= item.userId;
  if(!isGroupChat){
    return (
      <View>
        <TouchableOpacity onPress={isGroupChat? selectContact:null}>
          <View style={styles.itemContainer}>
            <View style={styles.leftElementContainer}>
              <Avatar
                img={
                  item.hasThumbnail ?
                    { uri: item.thumbnailPath } : undefined
                }
                placeholder={getAvatarInitials(
                  `${item.name}`,
                )}
                width={40}
                height={40}
              />
            </View>
            <View style={styles.rightSectionContainer}>
              <View style={styles.mainTitleContainer}>
                <Text
                  style={
                    styles.titleStyle
                  }>{`${item.name}`}</Text>
              </View>
            </View>
            {
              isGroupChat == true ?
                <TouchableOpacity
                  onPress={selectContact}
                  style={{ alignSelf: 'center',marginHorizontal:20}}>
                    {/* {isSelected == true?
                    <Image
                    source={require('./../../assets/icons/png/icon-done.png')}
                    style={{
                      height: 22,
                      width: 22,
                      // marginTop: '19%',
                      // marginLeft: '1%',
                      alignSelf: 'center',
                    }}
                  />
                  :
                  <Image
                    source={require('./../../assets/icons/png/icon-done-2.png')}
                    style={{
                      height: 22,
                      width: 22,
                      // marginTop: '19%',
                      // marginLeft: '1%',
                      alignSelf: 'center',
                    }}
                  />
                  } */}
                {selectedContacts?.includes(item.userId)?
              <Image
              source={require('./../../assets/icons/png/icon-done.png')}
              style={{
                height: 22,
                width: 22,
                // marginTop: '19%',
                // marginLeft: '1%',
                alignSelf: 'center',
              }}
            />
            :
            <Image
              source={require('./../../assets/icons/png/icon-done-2.png')}
              style={{
                height: 22,
                width: 22,
                // marginTop: '19%',
                // marginLeft: '1%',
                alignSelf: 'center',
              }}
            />  
              }
                </TouchableOpacity>
                :
                <>
                  {item.userId == null ?
                    <TouchableOpacity
                      onPress={invite}
                      style={styles.invite}>
                      <Text style={styles.inviteText}>Invite</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                      onPress={createChat}
                      style={styles.invite}>
                      <Text style={styles.inviteText}>Message</Text>
                    </TouchableOpacity>
                  }
                </>
  
  
            }
  
  
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  if(isGroupChat){
    return (
      <View>
        {item.userId!==null?
        <TouchableOpacity onPress={isGroupChat? selectContact:null}>
          <View style={styles.itemContainer}>
            <View style={styles.leftElementContainer}>
              <Avatar
                // img={
                //   item.hasThumbnail ?
                //     { uri: item.thumbnailPath } : undefined
                // }
                placeholder={getAvatarInitials(
                  `${item.name}`,
                )}
                width={40}
                height={40}
              />
            </View>
            <View style={styles.rightSectionContainer}>
              <View style={styles.mainTitleContainer}>
                <Text
                  style={
                    styles.titleStyle
                  }>{`${item.name}`}</Text>
              </View>
            </View>
            {
              // groupchat True then circle icon
              isGroupChat == true ?
                <TouchableOpacity
                  onPress={selectContact}
                  style={{ alignSelf: 'center',marginHorizontal:20}}>
                    {/* {isSelected == true?
                    <Image
                    source={require('./../../assets/icons/png/icon-done.png')}
                    style={{
                      height: 22,
                      width: 22,
                      // marginTop: '19%',
                      // marginLeft: '1%',
                      alignSelf: 'center',
                    }}
                  />
                  :
                  <Image
                    source={require('./../../assets/icons/png/icon-done-2.png')}
                    style={{
                      height: 22,
                      width: 22,
                      // marginTop: '19%',
                      // marginLeft: '1%',
                      alignSelf: 'center',
                    }}
                  />
                  } */}
                {selectedContacts?.includes(item.userId)?
              <Image
              source={require('./../../assets/icons/png/icon-done.png')}
              style={{
                height: 22,
                width: 22,
                // marginTop: '19%',
                // marginLeft: '1%',
                alignSelf: 'center',
              }}
            />
            :
            <Image
              source={require('./../../assets/icons/png/icon-done-2.png')}
              style={{
                height: 22,
                width: 22,
                // marginTop: '19%',
                // marginLeft: '1%',
                alignSelf: 'center',
              }}
            />  
              }
                </TouchableOpacity>
                :
                // groupchat false then not colored circle icon
                <>
                  {item.userId == null ?
                    <TouchableOpacity
                      onPress={invite}
                      style={styles.invite}>
                      <Text style={styles.inviteText}>Invite</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                      onPress={createChat}
                      style={styles.invite}>
                      <Text style={styles.inviteText}>Message</Text>
                    </TouchableOpacity>
                  }
                </>
  
  
            }
  
  
          </View>
        </TouchableOpacity>
        :
        // <Text>no contacts</Text>
        <></>
      }
      </View>
    );
  }
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    minHeight: 44,
    height: 63,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#515151',
    // backgroundColor: 'red'
  },
  leftElementContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 2,
    paddingLeft: 10,
    // backgroundColor: 'pink'
  },
  rightSectionContainer: {
    marginLeft: '2%',
    flexDirection: 'row',
    flex: 1,
    // width: '%',
    // flex: 20,
    // backgroundColor: 'yellow'
  },
  mainTitleContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    // flex: 0.5,
  },
  titleStyle: {
    fontSize: 16,
    color: '#000'
  },
  invite: {
    backgroundColor: colours.primary,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
    // justifyContent: 'flex-end',
    alignSelf: 'center',
    alignContent: 'flex-end',
    // alignItems: 'flex-end',
    // margin: '5%'
  },
  inviteText: {
    fontSize: 14,
    color: '#fff',
  },
});

export default ContactList;

ContactList.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
};
