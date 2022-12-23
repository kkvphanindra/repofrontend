import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ProgressBar from 'react-native-progress/Bar';
import StackHeader from '../components/Activity/StackHeader';
import {useDispatch, useSelector} from 'react-redux';
import {Checkbox} from 'react-native-paper';
import {
  activityName,
  groupName,
  UsersByGroupId,
} from '../redux/activity/action';
import SelectList from 'react-native-dropdown-select-list';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import GroupMembersFlatlist from '../components/Activity/GroupMembersFlatlist';
import GroupMemberHeader from '../components/Activity/GroupMemberHeader';
import LinearGradient from 'react-native-linear-gradient';

const ActivityAssign = ({navigation}) => {
  const [checked, setChecked] = useState(null);
  const [activityN, setActivityN] = useState('');
  const authState = useSelector(state => state.authState);
  const activityState = useSelector(state => state.activityState);
  const [groupN, setGroupN] = useState('');
  const [groupId, setGroupId] = useState('');
  const dispatch = useDispatch();
  var id = authState.userId;
  useEffect(() => {
    dispatch(activityName());
    dispatch(groupName());
    // dispatch(UsersByGroupId(groupId));
  }, [dispatch]);
  const press = selectedItem => {
    let d = activityState.groupName.filter(i => i.key === selectedItem);
    let e = d?.[0]?.key;
    let f = d?.[0]?.value;
    setGroupN(f);
    setGroupId(e);
    dispatch(UsersByGroupId(e));
    console.log(e, f);
  };

  const handleCheck = id => {
    setChecked(!checked ? id : null);
  };
  // console.log("checked", checked)
  return (
    <View style={styles.container}>
      <ScrollView>
      <StackHeader
        IconLeftName="left"
        IconLeftSize={24}
        header="Create Activity"
        notification={false}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Assign Activity</Text>
      </View>
      <View style={styles.progressBar}>
        <ProgressBar
          progress={1}
          width={width / 1.3}
          borderRadius={0}
          borderColor={'#fff'}
          unfilledColor={'#f7f7f7'}
          color={'#5E6BFF'}
          borderWidth={0}
          animated={false}
        />
      </View>
      <View style={styles.activityHeader}>
        <Text style={styles.started}>
          Choose who to participate in activity{' '}
        </Text>
      </View>
      <View style={styles.assignTo}>
        <Text style={styles.assignToText}>Assign to</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.self}>SELF</Text>
          {/* <View
            style={{marginTop: '3%', marginLeft: '5%', alignSelf: 'center'}}> */}
            {/* <Checkbox
                color="#636DD9"
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => handleCheck(id)}
              /> */}
              <TouchableOpacity style={{marginTop: '5%', marginLeft: '5%', alignSelf: 'center'}}
              onPress={()=>{handleCheck(id)}}
              >
            {checked ? (
              <Image
                source={require('../assets/icons/png/icon-done.png')}
                style={{height: 22, width: 22, alignSelf: 'center'}}
              />
            ) : (
              <Image
                source={require('../assets/icons/png/icon-done-2.png')}
                style={{height: 22, width: 22, alignSelf: 'center', padding:5,}}
              />
            )}
              </TouchableOpacity>
          {/* </View> */}
        </View>
      </View>
      <View>
        {checked ? null : (
          <View>
            <View style={styles.activity}>
              <Text style={styles.startDateText}>Group</Text>
              <SelectList
                onSelect={() => console.log('group name selected', groupN)}
                // onSelect={press}
                setSelected={press}
                // save="value"
                // setSelected={activityState.groupName.map((i)=>i.value)}
                data={activityState.groupName}
                arrowicon={
                  <FontAwesome name="chevron-down" size={12} color={'black'} />
                }
                searchicon={
                  <FontAwesome name="search" size={12} color={'black'} />
                }
                search={false}
                placeholder="Select Group"
                boxStyles={{
                  marginTop: '4%',
                  borderRadius: 10,
                  width: '90%',
                  backgroundColor: '#f7f7f7',
                  borderColor: '#f7f7f7',
                }}
                inputStyles={{
                  color: 'grey',
                }}
                dropdownStyles={{
                  width: '90%',
                  borderColor: '#f7f7f7',
                  // backgroundColor: '#fff',
                  backgroundColor: '#f7f7f7',
                }}
                dropdownItemStyles={{
                  backgroundColor: '#f7f7f7',
                }}
                dropdownTextStyles={{
                  color: 'grey',
                }}
              />
            </View>
            {groupId ? (
              <View style={styles.groupcontainer}>
                <FlatList
                  ListHeaderComponent={() => (
                    <GroupMemberHeader groupN={groupN} groupId={groupId} />
                  )}
                  data={activityState.groupUser}
                  keyExtractor={item => item?.id}
                  renderItem={({item}) => <GroupMembersFlatlist item={item} />}
                />
              </View>
            ) : null}
          </View>
        )}
      </View>
      </ScrollView>
    </View>
  );
};

export default ActivityAssign;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignSelf: 'center',
    marginBottom: '5%',
  },
  headerText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000',
  },
  progressBar: {
    alignSelf: 'center',
  },
  activityHeader: {
    marginTop: '8%',
    marginLeft: '11%',
  },
  started: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
  },
  assignTo: {
    marginTop: '10%',
    marginLeft: '10%',
  },
  assignToText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    // marginLeft: '10%',
    letterSpacing: 0.5,
  },
  self: {
    marginTop: '5%',
    // marginLeft: '9%',
    color: 'grey',
    fontSize: 14,
  },
  activity: {
    marginLeft: '10%',
    marginTop: '5%',
  },
  activityDropdown: {
    backgroundColor: '#F7F7F7',
    // padding: 5,
    // marginTop: '3%',
    borderRadius: 10,
    // width: '90%',
    alignSelf: 'flex-start',
    borderColor: '#f7f7f7',
  },
});
