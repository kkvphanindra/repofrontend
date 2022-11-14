import React, {useRef, useState} from 'react';
import {StyleSheet, Text, Pressable, View, Modal} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import OTPInput from '../components/OTPInput';

const VerifyAccount = ({route, navigation}) => {
    // if(route !== undefined && route.params !== undefined){
        const { number, getConfirm, uniqueID } = route?.params;
    // }
    const [term, setTerm] = useState("");
    const [code, setCode] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    // console.log("getConfirm", navigation?.getParam('number'))
    console.log(number, "getConfirm")
    
    const sendCode = async() => {
        
      }
    const onChangeText = (value) => {
        console.log('value ==>', value)
        setCode(value)
    } 
      console.log('term', term)

      const confirmCode = async() => {
        console.log('confirmCode value ==>', code)
        try {
            await getConfirm.confirm(code);
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
                <View style={styles.timerWrapper}>
                    <Text style={styles.timerText}>02:22:01</Text>
                </View>
                <View style={styles.codeWrapper}>
                    <Text style={styles.subContent}>Didn’t not received the code?</Text>
                    <Text style={styles.linkText}>Resend Code</Text>
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