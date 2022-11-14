import React, {useState, useRef, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    Pressable,
    View,
    TextInput,
    Button,
    Alert,
    PermissionsAndroid,
    Image,
    ImageBackground,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const LoginComponent = ({navigation}) => {
    const [confirmLogin, setConfirmLogin] = useState(false);
    const [uniqueID, setUniqueID] = useState(false);
    
    const phoneNumberValidate = () => {
        requestPermissions();
        if(PermissionsAndroid.RESULTS.GRANTED){
            console.log("sdsds", PermissionsAndroid.RESULTS.GRANTED);
            DeviceInfo.getUniqueId().then((uniqueId) => {
                console.log('uniqueId',uniqueId);
                setUniqueID(uniqueId)
                
                axios.get('http://18.212.184.28:3000/api/login').then((response) => {
                    let data = response.data.length;
                    console.log("data", data);
                    if(data){
                        response.data.filter(e => { 
                            console.log("e.mobile", e.mobile);
                           if(e.mobile === uniqueId){
                               setConfirmLogin(false);
                               navigation.navigate('home')
                           }
                           else{
                               setConfirmLogin(true)
                           }
                       })
                    }
                    else{
                        setConfirmLogin(true)
                    }
                  })
            })
            
            DeviceInfo.getPhoneNumber().then((phoneNumber) => {
                // Alert.alert('My phone munber', phoneNumber)
                console.log("login DeviceInfo phoneNumber", phoneNumber);
                // axios.get('http://18.212.184.28:3000/api/login').then((response) => {
                //     // console.log("response", response.data);
                //     response.data.filter(e => { 
                //         if(e.phone === phoneNumber){
                //             setConfirmLogin(false);
                //             navigation.navigate('home')
                //         }
                //         else{
                //             setConfirmLogin(true)
                //         }
                //     })
                //   });
            });
        }
    }

    const requestPermissions = () => {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE)
    }

    useEffect(() => {
        console.log("Login Component");
        phoneNumberValidate();
    }, []);
    console.log("Login confirmLogin", confirmLogin);

    return (
        <ImageBackground source={require('../assets/images/login.png')} resizeMode="cover" style={styles.imageContainer}>
            {
                confirmLogin && 
                <TouchableOpacity onPress={()=> navigation.navigate('mobileNumber', {uniqueID: uniqueID})} style={styles.textWrapper}>
                <Text style={styles.loginText}>Login With Mobile</Text>
                <Image
                    style={styles.arrow}
                    source={require('../assets/images/login-arrow.png')}/>
            </TouchableOpacity>
            }
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: '100%'
    },
    textWrapper:{
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 'auto',
        marginLeft: 'auto',
        position: 'relative',
        right: 40,
        bottom: 5
    },
    loginText:{
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '600',
        color: '#FFF',
        lineHeight: 40,
        
    },
    arrow:{
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default LoginComponent;