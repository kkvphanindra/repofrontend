import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    enable,
  getAllPrivacySetting,
  selectedPrivacySetting,
} from '../redux/Notifications/action';
import Checkboxs from '../components/Notifcation/Checkbox';
import { Checkbox } from 'react-native-paper';

const PrivacySettings = ({navigation}) => {
  const authState = useSelector(state => state.authState);
  const notificationState = useSelector(state => state.notificationState);
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log("if", authState.userId)
    dispatch(getAllPrivacySetting(authState.userId));
  }, [dispatch]);
  const [checked, setChecked] = useState(false);
  const handleChange = async(item, id) => {
    //   setChecked(!checked)
    //   dispatch(enable(true))
    // console.log('id', item, id, checked);
    await dispatch(selectedPrivacySetting(authState.userId, item, id, checked));
    await dispatch(getAllPrivacySetting(authState.userId))
  };
  console.log('no', checked);
  // let selected = products.filter((product) => product.isChecked);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../assets/icons/png/backButton.png')} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignContent: 'flex-start',
            alignSelf: 'center',
            marginLeft: 10,
          }}>
          <Text style={styles.name}>Privacy & Security</Text>
        </View>
      </View>
      <View>
        {notificationState.data.map(item => {
          return (
            <View style={styles.itemHeader}>
              <Text style={styles.headerText}>{item.name}</Text>
              {item.items.map(y => {
                return (
                  <View style={styles.itemInnerStyle}>
                    {y.isEnabled ? (
                      <TouchableOpacity onPress={() =>{setChecked(false),handleChange(item.id,y.id)}}>
                        <Image
                          style={{height: 20, width: 20, marginRight: '3%'}}
                          source={require('../assets/icons/png/icon-done.png')}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => {setChecked(true),handleChange(item.id,y.id)}}>
                        <Image
                          style={{height: 20, width: 20,marginRight: '3%'}}
                          source={require('../assets/icons/png/icon-done-2.png')}
                        />
                      </TouchableOpacity>
                    )}
                    {/* <Checkbox
                      status={checked ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setChecked(!checked);
                      }}
                    /> */}

                    <Text style={styles.itemInnerText}>{y.name}</Text>
                    {/* {console.log('items', y)} */}
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default PrivacySettings;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#ebecff',
    height: windowHeight / 12,
  },
  icon: {
    marginLeft: '5%',
    marginRight: '5%',
    alignSelf: 'center',
  },
  name: {
    fontSize: 18,
    color: 'black',
    fontWeight: '600',
    textAlign: 'center',
  },
  itemHeader: {
    marginTop: '5%',
    marginLeft: '5%',
  },
  headerText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  itemInnerStyle: {
    flexDirection: 'row',
    marginTop: '2%',
  },
  itemInnerText: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 14,
    color: '#000',
  },
});
