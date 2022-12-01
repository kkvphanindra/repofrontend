import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  ActivityIndicator,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Header from './header';
import PostItem from '../components/snap/PostItem';
import LoadingComponet from '../components/snap/LoadingComponent';
import {useDispatch, useSelector} from 'react-redux';
import {getAllPostsByUserId, postHide, postSave, postVerify} from '../redux/Post/actions';
import { activityName, groupName } from '../redux/activity/action';

const data = [
  {
    id: '1',
    name: 'Jary',
    groupName: '@abc',
    profilePic:
      'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
    attachment:
      'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
    postText: 'cdscds',
    attachmentType: 'PHOTO',
    loves: 1500,
    comment: 320,
    voices: 53,
    shares: 436,
  },
  {
    id: '2',
    name: 'Jary',
    groupName: '@abc',
    profilePic:
      'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
    postText:
      'ABCDsadsad  asdasdas asdsadasd asdasdasd asdasdasd asdasdasd asdasdasd asdasdasd sadsadasd',
    attachment:
      'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
    attachmentType: 'PHOTO',
    loves: 1500,
    comment: 320,
    voices: 53,
    shares: 436,
  },
];

const Snap = navigation => {
  const dispatch = useDispatch();
  const postState = useSelector(state => state.postState);
  const activityState = useSelector(state => state.activityState);
  const [groupN, setGroupN] = useState('');
  const [groupId, setGroupId] = useState('');
  const [activityN, setActivityN] = useState('');
const authId="6dddae20-5925-11ed-a555-c9afc10124e6"
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getAllPostsByUserId('6dddae20-5925-11ed-a555-c9afc10124e6'));
    }, [dispatch]),
  );
  useEffect(()=>{
        dispatch(groupName())
        dispatch(activityName())
      },[dispatch])
  const hidePost = (postId) => {
    dispatch(postHide(postId, authId))
  }
  const savePost = (postId) => {
    dispatch(postSave(postId,authId))
  }
  const verifyPost = (userId) => {
    dispatch(postVerify(userId,authId))
  }
  let user = {
    userId: '6dddae20-5925-11ed-a555-c9afc10124e6',
    firstName: 'Danish',
    lastName: 'ali',
    photo: 'https://i.ibb.co/pyhjCBx/ffd493ff-fe15-4d19-b645-635cadbab9d1.jpg',
    countryCode: '91',
    phoneNumber: '7439240134',
    createdAt: '2022-10-31T14:08:01.029Z',
    updatedAt: '2022-11-03T05:37:14.544Z',
  };
  // useEffect(() => {
  //     dispatch(getAllPostsByUserId("b62f35c0-17ff-11ed-929f-0bfbd7529461"));
  // }, [dispatch]);

  // React.useEffect(({navigation}) => {
  //     const unsubscribe = navigation.addListener('focus', () => {
  //       console.log('Refreshed!');
  //     });
  //     return unsubscribe;
  //   }, [navigation]);
console.log("dat", postState.data[0])
  const renderPostItem = item => {
    return (
      <PostItem
        id={item.id}
        name={item.firstName + '\b' +  item.lastName}
        follow={()=>console.log("follow back")}
        hidePost={()=>hidePost(item.id)}
        savePost={()=>savePost(item?.id)}
        report={()=> console.log("report")}
        verify={()=>verifyPost(item.userId)}
        addTo={()=>console.log("addTo")}
        endorsed='6.5k'
        genuine={item.genuine}
        groupName='@FunTogether'
        message={item.description}
        profilePic={{uri:user.photo}}
        postText={item.description}
        image={{uri:item.images}}
        // photo={{uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png'}}
        attachmentType={item.attachmentType}
        attachment={item.attachment}
        heart={item.isLikedByAuth}
        loves={item.likes}
        comment={item.comments}
        voices={item.voices}
        shares={item.shares}
        shareItem={item.likes}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={postState.data}
        renderItem={({item}) => renderPostItem(item)}
        ListEmptyComponent={LoadingComponet}
        keyExtractor={(item, index) => item.id + index.toString()}
        ListHeaderComponent={<Header navigation={navigation} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingHorizontal: 40,
  },
});

export default Snap;
