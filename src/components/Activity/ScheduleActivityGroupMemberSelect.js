import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const data = [
  {
    id: 1,
    img: 'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000',
    name: 'Crystal Merlin',
    date: '08.02.2022',
    status: 'Scheduled',
    selected: false,
  },
  {
    id: 2,
    img: 'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000',
    name: 'Crystal Merlin',
    date: '08.02.2022',
    status: 'Accepted',
    selected: false,
  },
  {
    id: 3,
    img: 'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000',
    name: 'Crystal Merlin',
    date: '08.02.2022',
    status: 'Declined',
    selected: false,
  },
  {
    id: 4,
    img: 'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000',
    name: 'Crystal Merlin',
    date: '08.02.2022',
    status: 'Scheduled',
    selected: false,
  },
  {
    id: 5,
    img: 'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000',
    name: 'Crystal Merlin',
    date: '08.02.2022',
    status: 'Accepted',
    selected: false,
  },
];

const ScheduleActivityGroupMemberSelect = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(data);
  const [selectedBill, setSelectedBill] = useState([]);
  const handleOnPress = item => {
    const newItem = selected.map(val => {
      if (val?.id === item?.id) {
        return {
          ...val,
          selected: !val.selected,
        };
      } else {
        // return{...val,selected: false}
        return val;
      }
    });
    setSelected(newItem);
  };
  const selectAll=()=>{
    if(selected.selected===false){
      setSelected(true)
    }
  }
  console.log("",selected )
  return (
    <View>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.groupName}>Group Name</Text>
          <TouchableOpacity
            style={styles.selectAll}
            // onPress={()=>console.log("object")}>
            onPress={()=>selectAll()}>
            <Text style={styles.selectAllText}>Select All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={{flex: 1, padding: 0}}
          data={selected}
          keyExtractor={item => item?.id}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#EBECFE',
                  justifyContent: 'center',
                  paddingVertical: 5,
                  marginTop: '2%',
                  borderBottomColor: '#cacaca',
                  borderBottomWidth: 1,
                  width: windowWidth / 1.1,
                  alignSelf: 'center',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Image
                      source={{
                        uri: item?.img
                          ? item?.img
                          : 'https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg',
                      }}
                      style={{
                        // backgroundColor: 'black',
                        marginTop: '10%',
                        marginLeft: '5%',
                        marginBottom: '10%',
                        height: 50,
                        width: 50,
                        borderRadius: 100 / 2,
                      }}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        marginTop: '7%',
                        marginLeft: '5%',
                        color: '#000',
                      }}>
                      {item?.name}
                    </Text>
                    <Text
                      style={{
                        marginTop: '2%',
                        marginLeft: '5%',
                        color: 'grey',
                        fontSize: 12,
                      }}>
                      {item?.date}
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity onPress={() => handleOnPress(item)}>
                    {/* <TouchableOpacity onPress={()=> {
                                    if (selectedBill.includes(item.id)) {
                                        setSelectedBill(selectedBill.filter(value => value !== item.id))
                                    } else {
                                        setSelectedBill([ ...new Set([...selectedBill, item.id])] )
                                    }
                                }}> */}
                      <View
                        key={item?.id}
                        style={{
                          borderRadius: 100 / 2,
                          // backgroundColor: selectedBill?
                          backgroundColor: item.selected?
                            '#636DD9'
                            : '#B5B9DD',
                          height: 32,
                          width: 32,
                          marginTop: '6%',
                          marginLeft: '50%',
                          alignSelf: 'center',
                        }}>
                        {/* <Image
                          source={require('../assets/icons/png/tick.png')}
                          style={{ height: 18, width: 18, marginTop: '19%', marginLeft: '1%', alignSelf: 'center' }}
                        /> */}
                        <AntDesign
                          name="check"
                          size={20}
                          color="#fff"
                          style={styles.icon}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.scheduleNow}
        onPress={() => navigation.navigate('scheduleActivity')}>
        <Text style={styles.scheduleNowText}>Proceed to Schedule </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ScheduleActivityGroupMemberSelect;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
    backgroundColor: '#EBECFE',
    marginBottom: '1%',
    // backgroundColor: 'red'
  },
  groupName: {
    fontSize: 20,
    color: '#000',
    fontWeight: '700',
    marginLeft: '9%',
    marginTop: '8%',
    width: '55%',
    letterSpacing: 0.5,
  },
  selectAll: {
    // fontSize: 20,
    // color: '#000',
    // fontWeight: '700',
    backgroundColor: '#5E6BFF',
    borderRadius: 20,
    padding: 5,
    marginLeft: '9%',
    marginTop: '8%',
    // letterSpacing: 0.5
  },
  selectAllText: {
    fontSize: 12,
    color: '#fff',
    paddingVertical: 2,
    paddingHorizontal: 8,
    fontWeight: '500',
    // marginLeft: '9%',
    // marginTop: '8%',
    // width: '50%',
    letterSpacing: 0.5,
  },
  flatlist: {
    //   flex: 1,
    backgroundColor: '#EBECFE',
    //   justifyContent: 'center',
    marginTop: '2%',
    padding: 10,
    // marginLeft: '9%',
    borderBottomColor: '#cacaca',
    borderBottomWidth: 1,
    width: windowWidth / 1.2,
    alignSelf: 'center',
  },
  acceptText: {
    fontSize: 12,
    color: '#fff',
    alignSelf: 'center',
    fontWeight: '600',
  },
  icon: {
    // height: 18,
    // width: 18,
    // marginTop: '19%',
    //  marginLeft: '1%',
    padding: 7,
    alignSelf: 'center',
  },
  scheduleNow: {
    backgroundColor: '#5E6BFF',
    padding: 10,
    width: windowWidth / 1.5,
    marginTop: '10%',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: '5%',
  },
  scheduleNowText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});
