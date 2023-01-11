import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const SlambookReceivedFlatlist = ({data}) => {
  const [button, setButton] = useState('');
  const navigation = useNavigation();
  return (
    <>
      {data?.status == 'SENT' ? (
        <>
            <View style={styles.listContainer} key={data?.invitedBy[0]?.userId}>
              <Image
                style={styles.imageContainer}
                source={{uri: data?.invitedBy[0]?.profilePicture==''?'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg':data?.invitedBy[0]?.profilePicture}}
              />
              <View style={styles.contactWrapper}>
                <Text style={styles.contactName}>
                  {data?.invitedBy[0]?.name ? data?.invitedBy[0]?.name : ''}
                </Text>
                <Text style={styles.contactNumber}>
                  {data?.invitedBy[0]?.dob}
                </Text>
              </View>
              {data?.status == 'SENT' ? (
                <Pressable
                  onPress={() => {
                    navigation.navigate('slambookForm', {
                      invitedBy: data?.invitedBy[0]?.userId,
                    });
                  }}
                  style={styles.smallButton}>
                  <Text style={styles.smallButtonText}>START</Text>
                </Pressable>
              ) : (
                <>
                  {data?.status == 'IN-PROGRESS' ? (
                    <Pressable
                      onPress={() => {
                        navigation.navigate('slambookForm', {
                          invitedBy: data?.invitedBy[0]?.userId,
                        });
                      }}
                      style={styles.smallButton}>
                      <Text style={styles.smallButtonText}>IN-PROGRESS</Text>
                    </Pressable>
                  ) : (
                    <Pressable
                      // onPress={() => {
                      //   navigation.navigate('slambookForm', {
                      //     invitedBy: data?.invitedBy[0]?.userId,
                      //   });
                      // }}
                      style={styles.smallButton}>
                      <Text style={styles.smallButtonText}>COMPLETED</Text>
                    </Pressable>
                  )}
                </>
              )}
            </View>
        </>
      ) :  <>
      {data?.status == 'IN-PROGRESS' ? (
        <View style={styles.listContainer} key={data?.invitedBy[0]?.userId}>
          <Image
            style={styles.imageContainer}
            source={data?.invitedBy[0]?.profilePicture}
          />
          <View style={styles.contactWrapper}>
            <Text style={styles.contactName}>
              {data?.invitedBy[0]?.name ? data?.invitedBy[0]?.name : ''}
            </Text>
            <Text style={styles.contactNumber}>
              {data?.invitedBy[0]?.dob}
            </Text>
          </View>
          {data?.status == 'SENT' ? (
            <Pressable
              onPress={() => {
                navigation.navigate('slambookForm', {
                  invitedBy: data?.invitedBy[0]?.userId,
                });
              }}
              style={styles.smallButton}>
              <Text style={styles.smallButtonText}>START</Text>
            </Pressable>
          ) : (
            <>
              {data?.status == 'IN-PROGRESS' ? (
                <Pressable
                  onPress={() => {
                    navigation.navigate('slambookForm', {
                      invitedBy: data?.invitedBy[0]?.userId,
                    });
                  }}
                  style={styles.smallButton}>
                  <Text style={styles.smallButtonText}>IN-PROGRESS</Text>
                </Pressable>
              ) : (
                <Pressable
                  // onPress={() => {
                  //   navigation.navigate('slambookForm', {
                  //     invitedBy: data?.invitedBy[0]?.userId,
                  //   });
                  // }}
                  style={styles.smallButton}>
                  <Text style={styles.smallButtonText}>COMPLETED</Text>
                </Pressable>
              )}
            </>
          )}
        </View>
      ) : 
      <View style={styles.listContainer} key={data?.invitedBy[0]?.userId}>
          <Image
            style={styles.imageContainer}
            source={data?.invitedBy[0]?.profilePicture}
          />
          <View style={styles.contactWrapper}>
            <Text style={styles.contactName}>
              {data?.invitedBy[0]?.name ? data?.invitedBy[0]?.name : ''}
            </Text>
            <Text style={styles.contactNumber}>
              {data?.invitedBy[0]?.dob}
            </Text>
          </View>
          {data?.status == 'SENT' ? (
            <Pressable
              onPress={() => {
                navigation.navigate('slambookForm', {
                  invitedBy: data?.invitedBy[0]?.userId,
                });
              }}
              style={styles.smallButton}>
              <Text style={styles.smallButtonText}>START</Text>
            </Pressable>
          ) : (
            <>
              {data?.status == 'IN-PROGRESS' ? (
                <Pressable
                  onPress={() => {
                    navigation.navigate('slambookForm', {
                      invitedBy: data?.invitedBy[0]?.userId,
                    });
                  }}
                  style={styles.smallButton}>
                  <Text style={styles.smallButtonText}>IN-PROGRESS</Text>
                </Pressable>
              ) : (
                <Pressable
                  // onPress={() => {
                  //   navigation.navigate('slambookForm', {
                  //     invitedBy: data?.invitedBy[0]?.userId,
                  //   });
                  // }}
                  style={styles.smallButton}>
                  <Text style={styles.smallButtonText}>COMPLETED</Text>
                </Pressable>
              )}
            </>
          )}
        </View>
      }
    </>}
    </>
  );
};

export default SlambookReceivedFlatlist;

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    borderBottomColor: '#C7C7C7',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    // backgroundColor: 'pink',
    width: '95%',
    alignSelf: 'center',
  },
  imageContainer: {
    width: 54,
    height: 54,
    borderRadius: 54,
    backgroundColor:'red'
  },
  contactWrapper: {
    flexDirection: 'column',
    marginRight: 'auto',
    marginLeft: 20,
  },
  contactName: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    color: '#2C2C2C',
    lineHeight: 20,
  },
  contactNumber: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    color: '#9EA6BE',
    lineHeight: 16,
  },
  smallButton: {
    backgroundColor: '#5D6AFF',
    width: 100,
    height: 35,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallButtonText: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    color: '#FFF',
    lineHeight: 16,
    textAlign: 'center',
  },
});
