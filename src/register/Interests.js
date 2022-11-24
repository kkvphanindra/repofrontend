import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    TouchableOpacity,
    Pressable,
    Dimensions,
    View,
    TouchableHighlight,
    FlatList,
    ToastAndroid,
    SectionList
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import data from '../../mock.json';
import axios from 'axios';
import { environment } from '../../environment';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Interests = ({route, navigation}) => {
  const { uniqueID, phoneNumber, name, dob, gender, 
    occupation, profilePic, coverPic, latitude,longitude } = route?.params;
  const [BtnColor, setBtnColor] = useState("");
  const [interestData, setInterestData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  
  useEffect(() => {
    axios.get(`${environment.API_URL}/interest`).then((response) => {
        // console.log('response interest', response?.data[0]?.interest);
        setInterestData(response?.data[0]?.interest);
        
    }).catch(err => {
      console.log("interest err", err)
    });
  }, []);

  const removeItem = (i) => {
    // const index = filterData.indexOf(item);
    // console.log(filterData, "removeItem", i)
    const filteredInterest = filterData.filter((item) => item.id !== i.id);
    // console.log(filteredInterest, "filteredInterest")
    setFilterData(filteredInterest)
  }

  const ListItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.name}</Text>
        <TouchableOpacity onPress={() => removeItem(item)} style={styles.remove}>
          <Text style={styles.removeIcon}>X</Text>
        </TouchableOpacity>
      </View>)
  }

  const selectedItem = (item) => {
    console.log("item", item);
    const found = filterData.some(el => el.id === item.id);
    if(!found){
      setFilterData(filterData.concat(item))
    }
    console.log(filterData, "filter")
    setBtnColor('#FFF');
  }

  const submitLogin = () => {
    let payload = {
      "mobile": uniqueID,
      "phone": phoneNumber,
      "name": name,
      "dob": dob,
      "gender": gender,
      "occupation": occupation,
      "profilePicture": profilePic,
      "coverPicture": coverPic,
      "latitude": latitude,
      "longitude": longitude,
      "interest": filterData
  }
  console.log("payload", payload)
  axios.post(`${environment.API_URL}/login`, payload).then((response) => {
      console.log('response', response.data);
      ToastAndroid.showWithGravityAndOffset(
          "Submitted Login Request Successfully",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          height
        );
  });
    // navigation.navigate('groups');
  }

  // console.log("filterData", filterData)

    return (
        <View style={styles.container}>
          <Pressable
                onPress={() => navigation.navigate('groups')}
                style={styles.skipContainer}>
                <Text style={styles.skipText}>
                    Skip
                </Text>
            </Pressable>
            <View style={styles.wrapper}>
                <Text style={styles.title}>Select 5 Interests</Text>
                <View style={styles.filterContainer}>
                  <SafeAreaView style={{ flex: 1 }}>
                      <FlatList
                        horizontal
                        data={filterData}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => <ListItem item={item} />}
                        showsHorizontalScrollIndicator={true}
                      />
                  </SafeAreaView>
                </View>
                <View style={styles.listContainer}>
                  {
                    interestData.length > 0 && interestData.map((e,i) => {
                      // console.log("eeee", e)
                      return <TouchableHighlight
                      key={i}
                      style={styles.listBox}
                      activeOpacity={1}
                      underlayColor="#FB8D33"
                      onPress={() => selectedItem(e)}>
                      <Text style={styles.listText}>{e.name}</Text>
                    </TouchableHighlight>
                    })
                  }
                </View>
            </View>
            <Pressable
                onPress={() => submitLogin()}
                style={styles.buttonContainer}>
                <LinearGradient style={styles.buttonWrapper} colors={['#5E6BFF', '#212FCC']}>
                    <Text style={styles.buttonText}>
                        Continue
                    </Text>
                </LinearGradient>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#FFF',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      paddingTop: 60
  },
  wrapper: {
      maxWidth: '80%'
  },
  skipContainer: {
    borderColor: '#505EF4',
    borderWidth: 1,
    borderRadius: 5,
    width: 91,
    height: 34,
    zIndex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFF',
    position: 'absolute',
    right: 35,
    top: 20
},
skipText: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    color: '#5B67CA',
    lineHeight: 20,
    textAlign: 'center'
},
  title: {
      fontFamily: 'Inter',
      fontSize: 32,
      fontWeight: '600',
      color: '#2C2C2C',
      lineHeight: 40,
      textAlign: 'center',
      paddingTop: 20,
      paddingBottom: 20
  },
  filterContainer:{
    height: 60,
    borderBottomColor: '#D2D1D7',
    borderBottomWidth: 0.5,
  },
  itemContainer:{
    backgroundColor: '#8091E6',
    borderRadius: 15,
    height: 31,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    marginHorizontal: 5,
    
  },
  itemText:{
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '600',
    color: '#FFF',
    lineHeight: 18,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  listContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 20
  },
  listBox:{
    backgroundColor: '#F7F7F7',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginVertical: 5,
    marginHorizontal: 2

  },
  listText:{
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    lineHeight: 20,
    textAlign: 'center',
  },
  remove:{
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    borderRadius: 30,
    alignItems: 'center',
    width: 20,
    height: 20,
  },
  removeIcon:{
    color: '#8091E6',
    fontSize: 12
  },
  buttonContainer: {
      width: '80%',
      height: 60,
      marginTop: 'auto',
      marginBottom: 40
  },
  buttonWrapper: {
      width: '100%',
      height: '100%',
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center'
  },
  buttonText: {
      fontFamily: 'Inter',
      fontSize: 16,
      fontWeight: '600',
      color: '#FFF',
      lineHeight: 20,
      textAlign: 'center'
  }
})

export default Interests;