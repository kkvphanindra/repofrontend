import React, {useEffect} from 'react';
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
import {getAllPostsByUserId, postHide, postSave} from '../redux/Post/actions';

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
const authId="6dddae20-5925-11ed-a555-c9afc10124e6"
  useFocusEffect(
    React.useCallback(() => {
      //   const unsubscribe = API.subscribe(userId, user => setUser(user));
      dispatch(getAllPostsByUserId('6dddae20-5925-11ed-a555-c9afc10124e6'));
    }, [dispatch]),
  );
  const hidePost = (postId) => {
    dispatch(postHide(postId, authId))
    // console.log("post state", postState)
  }
  const savePost = (postId) => {
    dispatch(postSave(postId,authId))
  }
  // useEffect(() => {
  //     dispatch(getAllPostsByUserId("b62f35c0-17ff-11ed-929f-0bfbd7529461"));
  // }, [dispatch]);

  // React.useEffect(({navigation}) => {
  //     const unsubscribe = navigation.addListener('focus', () => {
  //       console.log('Refreshed!');
  //     });
  //     return unsubscribe;
  //   }, [navigation]);

  const renderPostItem = item => {
    return (
      <PostItem
        id={item.id}
        name={item.firstName + '\b' +  item.lastName}
        follow={()=>console.log("follow back")}
        hidePost={()=>hidePost(item.id)}
        savePost={()=>savePost(item?.id)}
        report={()=> console.log("report")}
        verify={()=>console.log("verify")}
        addTo={()=>console.log("addTo")}
        groupName={item.groupName}
        message={item.description}
        profilePic={item.profilePic}
        postText={item.description}
        image={item.image}
        // photo={{uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png'}}
        attachmentType={item.attachmentType}
        attachment={item.attachment}
        heart={item.heart}
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
