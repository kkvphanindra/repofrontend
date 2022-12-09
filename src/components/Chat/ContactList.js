// Access Device’s Contact List in React Native App
// https://aboutreact.com/access-contact-list-react-native/
 
import React, {memo} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
 
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getContact} from '../../redux/Chat/actions';

 
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
  const chatState = useSelector((state)=>state.chatState)
  const dispatch = useDispatch()
  const shouldComponentUpdate = () => {
    return false;
  };
  const {item, onPress} = props;
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
  return (
    <View>
      <TouchableOpacity onPress={() => console.log("first")}>
        <View style={styles.itemContainer}>
          <View style={styles.leftElementContainer}>
            <Avatar
              img={
                item.hasThumbnail ?
                  {uri: item.thumbnailPath} : undefined
              }
              placeholder={getAvatarInitials(
                `${item.givenName} ${item.familyName}`,
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
                }>{`${item.givenName} ${item.familyName}`}</Text>
            </View>
          </View>
        <TouchableOpacity style={styles.invite}>
          <Text style={styles.inviteText}>Invite</Text>
        </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};
 
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    minHeight: 44,
    height: 63,
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
    width: '67%',
    // flex: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#515151',
    // backgroundColor: 'yellow'
  },
  mainTitleContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  titleStyle: {
    fontSize: 16,
    color: '#000'
  },
  invite: {
    backgroundColor: '#5d6aff',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    // justifyContent: 'flex-end',
    alignSelf: 'center',
    // alignContent: 'flex-end',
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
