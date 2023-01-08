import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getAllSlambookByUserId} from '../redux/Slambook/action';
import SlambookFlatlist from '../components/slambook/SlambookFlatlist';

const Sent = () => {
  const slambookState = useSelector(state => state.slambookState);
  const authState = useSelector(state => state.authState);
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      dispatch(getAllSlambookByUserId(authState.userId, null, true));
    }, [dispatch]),
  );
  // console.log("slambook sent screen",slambookState.sentData)
  return (
    <View style={styles.container}>
    <View style={styles.tabWrapper}>
      <FlatList
        data={slambookState.sentData}
        renderItem={({item}) => <SlambookFlatlist data={item} />}
        keyExtractor={item => item.id}
      />
    </View>
    </View>
  );
};

export default Sent;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#fff'
  },
  tabWrapper:{
    width: '100%',
    alignSelf: 'center',
},
});
