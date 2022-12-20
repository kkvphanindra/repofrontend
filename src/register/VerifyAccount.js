import React, {useRef, useState} from 'react';
import {StyleSheet, Text, Pressable, View, Modal, TouchableOpacity, ToastAndroid} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CountDown from 'react-native-countdown-component';
import auth from '@react-native-firebase/auth';
import OTPInput from '../components/OTPInput';

const VerifyAccount = ({route, navigation}) => {
    // if(route !== undefined && route.params !== undefined){
        const { number, getConfirm, uniqueID } = route?.params;
    // }
    const [term, setTerm] = useState("");
    const [code, setCode] = useState("");
    const [getConfirmation, setGetConfirmation] = useState(getConfirm);
    const [resend, setResend] = useState(false);
    const [timer, setTimer] = useState(10);
    const [showTimer, setShowRunTimer] = useState(true);
    const [runTimer, setRunTimer] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    // console.log("getConfirm", navigation?.getParam('number'))
    // console.log(number, "getConfirm")
    
    const resendCode = async(number) => {
        console.log('signInWithPhoneNumber.',number);
        try{
            const confirmation = await auth().signInWithPhoneNumber(number);
            if(confirmation){
                console.log("confirmation", confirmation)
                setGetConfirmation(confirmation);
                setShowRunTimer(true);
                setResend(false)
            }
        } catch (e) {
            console.log(e.message);
            ToastAndroid.showWithGravityAndOffset(
                `Request ${e.message}`,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                height
              );
        }
    }

    const onChangeText = (value) => {
        console.log('value ==>', value)
        setCode(value)
    } 
    //   console.log('term', term)

      const confirmCode = async() => {
        console.log('confirmCode value ==>', code)
        try {
            await getConfirmation.confirm(code);
            console.log('success.');
            setModalVisible(false);
            navigation.navigate('agree',{
                phoneNumber: number,
                uniqueID: uniqueID
            });
        } catch (error) {
            console.log('Invalid code.');
        }
        }
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>Verify Account</Text>
                <Text style={styles.subContent}>Enter 6-digit code we have sent to {number}</Text>
                <View style={styles.OTPWrapper}>
                    <OTPInput 
                        maximumLength={6} 
                        onChange={onChangeText}
                    />
                </View>
                    {
                        showTimer && 
                        <View style={styles.timerWrapper}>
                            <CountDown
                                size={10}
                                until={timer}
                                onFinish={() => [setShowRunTimer(false),setResend(true)]}
                                digitStyle={{backgroundColor: 'transparent', borderWidth: 0, borderColor: 'transparent'}}
                                digitTxtStyle={{marginHorizontal: -10, color: '#FFF'}}
                                timeLabelStyle={{marginHorizontal: -10, fontSize: 8, color: '#FFF', fontWeight: 'bold'}}
                                separatorStyle={{marginHorizontal: -10, color: '#FFF'}}
                                timeToShow={['H', 'M', 'S']}
                                timeLabels={{m: null, s: null}}
                                showSeparator
                            />
                        </View>
                    }
                    {/* <Text style={styles.timerText}>02:22:01</Text> */}
                <View style={styles.codeWrapper}>
                    <Text style={styles.subContent}>Didn’t not received the code?</Text>
                    {
                        resend && <Pressable onPress={resendCode}  style={styles.resendButton}>
                            <Text style={styles.linkText}>Resend Code</Text>
                        </Pressable>
                    }
                </View>
            </View>
            <Pressable
                onPress={confirmCode}
                style={styles.buttonContainer}>
                <LinearGradient style={styles.buttonWrapper} colors={['#5E6BFF', '#212FCC']}>
                    <Text style={styles.buttonText}>
                        Proceed
                    </Text>
                </LinearGradient>
            </Pressable>
            <Text style={styles.footerText}>
                by clicking start, you agree to our&nbsp;
                <Text
                    style={styles.footerLinkText}
                    onPress={() => navigation.navigate('agree')}>
                     Privacy Policy&nbsp;
                </Text>&nbsp;our
                <Text
                    style={styles.footerLinkText}
                    onPress={() => navigation.navigate('agree')}> Teams and Conditions</Text>
                </Text>
            {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      ><Text>OTP Verification Success</Text></Modal> */}
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
        paddingTop: 60,
        paddingBottom: 40
    },
    wrapper: {
        maxWidth: 300,
        alignItems: 'center'
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
    OTPWrapper: {
        marginVertical: 40
    },
    timerWrapper: {
        width: 84,
        height: 31,
        marginBottom: 20,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5D6AFE'
    },
    timerText: {
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: '600',
        color: '#FFF',
        lineHeight: 18,
        textAlign: 'center'
    },
    resendButton:{
        paddingHorizontal: 20
    },
    linkText: {
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '400',
        color: '#2E3CD7',
        lineHeight: 24,
        textAlign: 'center',
        paddingVertical: 10,
    },
    codeWrapper: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        width: '80%',
        height: 60,
        marginTop: 20,
        marginBottom: 20
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
    },
    footerText: {
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: '400',
        color: 'rgba(44, 44, 44, 0.8)',
        lineHeight: 28,
        textAlign: 'center',
        width: '80%'
    },
    footerLinkText: {
        color: '#2E3CD7'
    }
})

export default VerifyAccount;