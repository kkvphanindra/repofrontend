import React from 'react';
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
    TextInput,
    Button
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useValidation } from 'react-native-form-validator';

const { width, height } = Dimensions.get('window');

const SlambookForm = ({navigation}) => {
    const saveForm = () => {

    }
    const InviteSubmit = () => {

    }
    return (
        <ScrollView showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
                <ImageBackground
                    source={require('../assets/images/offer-bg-top.png')}
                    resizeMode="cover"
                    style={styles.topContainer}>
                        <View style={styles.wrapper}>
                            <Pressable onPress={() => navigation.navigate('slambookRequest')}  style={styles.iconWrapper}>
                                <Image style={styles.arrowIcon} source={require('../assets/images/menu-icon.png')}/>
                            </Pressable>    
                            <Text style={styles.title}>Slambook Form</Text>
                            <Pressable onPress={() => navigation.navigate('notifications')}  style={styles.notifyWrapper}>
                                <Image style={styles.notifyIcon} source={require('../assets/images/notify-icon.png')}/>
                            </Pressable>    
                        </View>
                </ImageBackground>
                <View style={styles.picContainer}>
                    <Image style={styles.imageHolder} source={require('../assets/images/picture-2.png')}/>
                </View>
                <View style={styles.formContainer}>
                    <View style={styles.formFlex}>
                        <Text style={styles.formLabel}>Full Name</Text>
                        <TextInput  style={styles.formField} />
                    </View>
                    <View style={styles.formFlex}>
                        <Text style={styles.formLabel}>Friends Call me</Text>
                        <TextInput  style={styles.formField} />
                    </View>
                    <View style={styles.formFlex}>
                        <Text style={styles.formLabel}>DOB</Text>
                        <TextInput  style={styles.formField} />
                    </View>
                    <View style={styles.formFlex}>
                        <Text style={styles.formLabel}>Email</Text>
                        <TextInput  style={styles.formField} />
                    </View>
                    <View style={styles.formFlex}>
                        <Text style={styles.formLabel}>Bestfriend</Text>
                        <TextInput  style={styles.formField} />
                    </View>
                    <View style={styles.formFlex}>
                        <Text style={styles.formLabel}>Happiest moment of life</Text>
                        <TextInput  style={styles.formField} />
                    </View>
                    <View style={styles.formFlex}>
                        <Text style={styles.formLabel}>3 Places you want to see before die</Text>
                        <TextInput multiline numberOfLines={4} style={[styles.formField ,{ height:200, textAlignVertical: 'top'}]} />
                    </View>
                    <View style={styles.formFlexSubmit}>
                        <Pressable onPress={saveForm} style={styles.saveBtn}>
                            <Text style={styles.saveBtnText}>Save</Text>
                        </Pressable>
                        <Pressable onPress={InviteSubmit} style={styles.inviteBtn}>
                            <LinearGradient style={styles.buttonWrapper} colors={['#5E6BFF', '#212FCC']}>
                                <Text style={styles.inviteBtnText}>Invite Friends</Text>
                            </LinearGradient>
                        </Pressable>
                    </View>
                </View>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flexDirection: 'column'
    },
    topContainer: {
        width: width,
        height: 188,
    },
    wrapper:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
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
    notifyIcon:{
        
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
    picContainer:{
        alignItems: 'center',
        justifyContent:'center',
        position: 'relative'
    },
    imageHolder:{
        width: 170,
        height: 170,
        borderRadius: 60,
        position: 'absolute',
        top: -85
    },
    formContainer:{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100
    },
    formFlex:{
        width: '80%',
        marginVertical: 10
    },
    formLabel:{
        fontFamily: 'Inter',
        fontSize: 15,
        fontWeight: '400',
        color: '#2C2948',
        lineHeight: 25,
        paddingBottom: 10
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
    formFlexSubmit:{
        flexDirection: 'row',
        marginVertical: 30,
        justifyContent: 'space-around'
    },
    saveBtn:{
        width: 150,
        height: 60,
        borderColor: '#5B67CA',
        borderWidth: 1,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    saveBtnText:{
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '700',
        color: '#5B67CA',
        lineHeight: 20,
    },
    inviteBtn:{
        width: 150,
        height: 60,
        borderRadius: 10,
        marginLeft: 10
    },
    buttonWrapper: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inviteBtnText:{
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '700',
        color: '#FFF',
        lineHeight: 20,
    },
})

export default SlambookForm;