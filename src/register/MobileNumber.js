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
    ToastAndroid,
    Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PhoneInput from 'react-native-phone-number-input';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/auth/action';
import auth from '@react-native-firebase/auth';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const MobileNumber = ({route, navigation}) => {
    // const { uniqueID } = route?.params;
    const [confirm, setConfirm] = useState(null);
    const [phoneNumber,
        setphoneNumber] = useState('');
        
        const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [deviceIMEI, setDeviceIMEI] = useState();
  const dispatch = useDispatch()
    const phoneInput = useRef(null);
 const authState = useSelector((state)=>state.authState)
    // const onAuthStateChanged = (user) => {
    //     console.log('user', user)
    //     setUser(user);
    //     if (initializing) setInitializing(false);
    //   }

      
    // useEffect(() => {
        // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        // console.log('subscriber', subscriber)
        // return subscriber; // unsubscribe on unmount
        
        
    // }, []);

    const signInWithPhoneNumber = async(phoneNumber) => {
        console.log('signInWithPhoneNumber Mbile.', phoneNumber);
        // auth().signOut();
        try{
            // const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            const confirmation = phoneNumber
            console.log("confirma", confirmation)
            if(confirmation){
                setConfirm(confirmation);
                navigation.navigate('verifyAccount', {
                    uniqueID: uniqueID,
                    screen: 'verifyAccount',
                    number: phoneNumber,
                    getConfirm: confirmation
                });
            }
        }
        catch (e) {
            console.log("error",e.message);
            ToastAndroid.showWithGravityAndOffset(
                `Request ${e.message}`,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                height
              );
        }
        console.log('confirmation.', confirm);
    }

    //   console.log('confirm ===>', confirm)
    //   if (!confirm) {
    //     return (
    //       <Button
    //         title="Phone Number Sign In"
    //         onPress={() => signInWithPhoneNumber('+919952022301')}
    //       />
    //     );
    //   }
    const onProceed=()=>{
        dispatch(login(number,Alert))
    }
    console.log("err", authState.error)
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>Mobile Number</Text>
                <Text style={styles.subContent}>Please enter your valid phone number. We will
                    send you 6-digit code to verify account.</Text>
            </View>
            {/* <TextInput value={phoneNumber} onChangeText={text => setphoneNumber(text)} style={{color: '2C2C2C', fontSize: 14, borderColor: '#000', borderWidth: 1, width: '80%'}} />
      <Button title="sign in" onPress={() => signInWithPhoneNumber(phoneNumber)} /> */}
            {/* <TextInput value={code} onChangeText={text => setCode(text)} style={{color: '2C2C2C', fontSize: 14, borderColor: '#000', borderWidth: 1, width: '80%'}} />
            <Button title="Confirm Code" onPress={confirmCode} /> */}
            <PhoneInput
                ref={phoneInput}
                defaultValue={phoneNumber}
                defaultCode="IN"
                layout="first"
                withShadow
                autoFocus
                onChangeText={(text) => {
                    setphoneNumber(text);
                  }}
                containerStyle={styles.phoneNumberView}
                textContainerStyle={styles.textInput}
                onChangeFormattedText={text => {
                setphoneNumber(text);
            }}/>
            <Pressable
                // onPress={() => signInWithPhoneNumber(phoneNumber)}
                onPress={()=> {
                    navigation.navigate('verifyAccount', {
                    // uniqueID: uniqueID,
                    // screen: 'verifyAccount',
                    number: phoneNumber,
                    // getConfirm: confirmation
                })}}
                style={styles.buttonContainer}>
                <LinearGradient style={styles.buttonWrapper} colors={['#5E6BFF', '#212FCC']}>
                    <Text style={styles.buttonText}>
                        Send Code
                    </Text>
                </LinearGradient>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingTop: 60
    },
    wrapper: {
        maxWidth: 300
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
    subContent: {
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '400',
        color: '#2C2C2C',
        lineHeight: 24,
        textAlign: 'center'
    },
    phoneNumberView: {
        marginTop: 60,
        marginBottom: 20,
        width: '80%',
        padding: 0,
        height: 70,
        backgroundColor: 'white'
    },
    textInput:{
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '600',
        color: '#2C2C2C',
        lineHeight: 24
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

export default MobileNumber;