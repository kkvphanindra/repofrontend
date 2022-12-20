import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    Pressable,
    View,
    Dimensions,
    ImageBackground,
    Image,
    Button,
    TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SearchComponent from '../components/search';

const { width, height } = Dimensions.get('window');

const InviteToGroup = ({navigation}) => {
    const [searchPhrase, setSearchPhrase] = useState("");

    const groupDatas = [
        {
          "pic": require('../assets/images/picture-1.png'),
          "name": 'Goku',
          "location": 'Oxford Street',
          "members": "1.2K members",
          "id": 1
        },
        {
          "pic": require('../assets/images/picture-2.png'),
          "name": 'Trunks',
          "location": 'Oxford Street',
          "members": "1.2K members",
          "id": 2
        },
        {
          "pic": require('../assets/images/picture-3.png'),
          "name": 'Freza',
          "location": 'Oxford Street',
          "members": "1.2K members",
          "id": 3
        },
        {
          "pic": require('../assets/images/picture-1.png'),
          "name": 'Yamcha',
          "location": 'Oxford Street',
          "members": "1.2K members",
          "id": 3
        },
        {
          "pic": require('../assets/images/picture-2.png'),
          "name": 'Pikolo',
          "location": 'Oxford Street',
          "members": "1.2K members",
          "id": 4
        },
        {
          "pic": require('../assets/images/picture-3.png'),
          "name": 'Cullin',
          "location": 'Oxford Street',
          "members": "1.2K members",
          "id": 5
        },
        {
          "pic": require('../assets/images/picture-1.png'),
          "name": 'Vegeta',
          "location": 'Oxford Street',
          "members": "1.2K members",
          "id": 6
        },
        {
          "pic": require('../assets/images/picture-2.png'),
          "name": 'Gohan',
          "location": 'Oxford Street',
          "members": "1.2K members",
          "id": 7
        },
      ]
      
    return (
        <ScrollView showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>
                <ImageBackground
                    source={require('../assets/images/offer-bg-top.png')}
                    resizeMode="cover"
                    style={styles.topContainer}>
                        <View style={styles.wrapper}>
                            <Pressable onPress={() => navigation.navigate('connectHome')}  style={[styles.iconWrapper, {marginLeft: 'auto'}]}>
                                <Image style={styles.arrowIcon} source={require('../assets/images/left-arrow.png')}/>
                            </Pressable>    
                            <Text style={styles.title}>Huddle Connect</Text>
                            <View style={styles.notifyWrapper}></View>    
                        </View>
                </ImageBackground>
                <View style={styles.searchWrapper}>
                    <SearchComponent placeHolder={'Search group'}      
                        searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} filter={false} />
                </View>
                <View style={styles.contactContainer}>
                    {groupDatas.length > 0 && groupDatas.map((e, i) => {
                    return (
                        <View
                            style={styles.listContainer}
                            key={i}>
                            <Image style={styles.imageContainer} source={e.pic}/>
                            <View style={styles.contactWrapper}>
                            <Text style={styles.contactName}>{e?.name ? e?.name: ''}</Text>
                            <View style={styles.tabLocationWrapper}>
                                <Image style={styles.icon} source={require('../assets/images/location-icon.png')}/>
                                <Text style={styles.tabLocation}>{e?.location}</Text>
                            </View>
                            </View>
                            <Text style={styles.contactMembers}>{e?.members}</Text>
                            <Pressable onPress={() => navigation.navigate('')} style={styles.smallButton}>
                            <Image style={styles.notifyIcon} source={require('../assets/images/big-icon-unselect.png')}/>
                            </Pressable>
                        </View>
                            )
                        })
                    }
                </View>
                <View style={styles.formContainer}>
                    <View style={styles.formFlex}>
                        <Text style={styles.formLabel}>Message</Text>
                        <TextInput multiline numberOfLines={4} style={[styles.formField ,{ height:140, textAlignVertical: 'top'}]} />
                    </View>
                </View>
                
                <Pressable
                    onPress={() => navigation.navigate('')}
                    style={styles.buttonContainer}>
                    <LinearGradient style={styles.buttonWrapper} colors={['#5E6BFF', '#212FCC']}>
                        <Text style={styles.buttonText}>
                            Invite
                        </Text>
                    </LinearGradient>
                </Pressable>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    topContainer: {
        width: width,
        height: 170,
        alignItems: 'center',
        position: 'relative'
    },
    wrapper:{
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: 60,
        marginHorizontal: 20,
    },
    iconWrapper:{
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    notifyWrapper:{
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 20
    },
    title: {
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: '700',
        color: '#2C2C2C',
        lineHeight: 30,
        textAlign: 'center',
        paddingTop: 10,
        marginLeft: 'auto'
    },
    searchWrapper:{
        width: '80%',
        position: 'relative',
        backgroundColor: 'transparent',
        top: -25
    },
    contactContainer: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center'
    },
    listContainer: {
        flexDirection: 'row',
        borderBottomColor: '#D2D107',
        borderBottomWidth: 0.5,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        width: '80%'
    },
    imageContainer: {
        width: 54,
        height: 54,
        borderRadius: 54
    },
    contactWrapper: {
        flexDirection: 'column',
        marginRight: 'auto',
        marginLeft: 20
    },
    contactName: {
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '400',
        color: '#2C2C2C',
        lineHeight: 20
    },
    tabLocationWrapper:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#C8E7F0',
        borderRadius: 18,
        height: 20,
        marginTop: 5,
        width: 90,
        alignItems: 'center'
    },
    tabLocation:{
        color: '#000',
        fontFamily: 'Inter',
        fontSize: 11,
        fontWeight: '400',
        lineHeight: 14
    },
    contactMembers:{
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: '400',
        color: '#858597',
        lineHeight: 16
    },
    smallButton: {
        width: 74,
        height: 35,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    formContainer:{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        width: '80%',
    },
    formFlex:{
        width: '100%',
    },
    formLabel:{
        fontFamily: 'Inter',
        fontSize: 22,
        fontWeight: '600',
        color: '#2C2c2C',
        lineHeight: 28,
        paddingBottom: 14
    },
    formField:{
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: '700',
        color: '#2C2C2C',
        lineHeight: 30,
        backgroundColor: '#F7F7F7',
        borderRadius: 10,
        height: 50,
        paddingHorizontal: 20
    },
    buttonContainer: {
        width: '80%',
        height: 60,
        marginVertical: 40
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

export default InviteToGroup;