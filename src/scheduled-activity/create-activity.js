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
    TextInput,
    Button,
    VirtualizedList,
    TouchableHighlight
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SelectDropdown from 'react-native-select-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

const { width, height } = Dimensions.get('window');

const CreateActivity = ({navigation}) => {

    const activityName = ['Arts', 'Dancing', 'Playing Games', 'Cricket', 'Singing'];
    const groupName = ['Single', 'Edge', 'Chrome', 'Firefox', 'Chrome'];
    const [isDatePickerVisible,
        setDatePickerVisibility] = useState(false);
    const [dateText,
        setDateText] = useState('DD/MM/YY');

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        const selectedDate = moment(date).format('MM/DD/YYYY, HH:MM');
        setDateText(selectedDate)
        console.log("A date has been picked: ", selectedDate);
        hideDatePicker();
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
                <ImageBackground
                    source={require('../assets/images/offer-bg-top.png')}
                    resizeMode="cover"
                    style={styles.topContainer}>
                        <View style={styles.wrapper}>
                            <Pressable onPress={() => navigation.navigate('scheduledHome')}  style={styles.iconWrapper}>
                                <Image style={styles.arrowIcon} source={require('../assets/images/left-arrow.png')} />
                            </Pressable>    
                            <Text style={styles.title}>Huddle Play</Text>
                            <Pressable onPress={() => navigation.navigate('notifications')}  style={styles.notifyWrapper}>
                                <Image style={styles.notifyIcon} source={require('../assets/images/notify-icon.png')}/>
                            </Pressable>    
                        </View>
                        <Text style={styles.headTitle}>Create Activity</Text>
                </ImageBackground>
            
                <View style={styles.contentContainer}>
                    <View style={styles.formContainer}>
                        <View style={styles.formFlex}>
                            <Text style={styles.formLabel}>Start Date and Time</Text>
                            <TouchableHighlight
                                style={styles.formField}
                                activeOpacity={1}
                                underlayColor="transparent"
                                onPress={showDatePicker}>
                                <Text style={styles.dropDownText}>{dateText}</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.formFlex}>
                            <Text style={styles.formLabel}>End Date and Time</Text>
                            <TextInput style={styles.formField} />
                        </View>
                        <View style={styles.formFlex}>
                            <Text style={styles.formLabel}>Activity Name</Text>
                            <SelectDropdown
                                data={activityName}
                                defaultButtonText="Select"
                                buttonStyle={styles.formField}
                                buttonTextStyle={styles.buttonTextStyle}
                                onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                            }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                                rowTextForSelection={(item, index) => {
                                return item
                            }}/>
                        </View>
                        <Text style={styles.formTitle}>Assign to</Text>
                        <View style={[styles.formFlex,styles.formFlexWrap]}>
                            <Text style={styles.formLabel}>SELF</Text>
                            <Pressable onPress={() => navigation.navigate('')}  style={styles.notifyWrapper}>
                                <Image style={styles.checkIcon} source={require('../assets/images/big-icon-done.png')}/>
                            </Pressable> 
                        </View>
                        <View style={styles.formFlex}>
                            <Text style={styles.formLabel}>Group</Text>
                            <SelectDropdown
                                data={groupName}
                                defaultButtonText="Select"
                                buttonStyle={styles.formField}
                                buttonTextStyle={styles.buttonTextStyle}
                                onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                            }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                                rowTextForSelection={(item, index) => {
                                return item
                            }}/>
                        </View>
                        <View style={styles.formFlex}>
                            <Text style={styles.formLabel}>Message</Text>
                            <TextInput multiline numberOfLines={4} style={[styles.formField ,{ height:200, textAlignVertical: 'top'}]} />
                        </View>
                    </View>
                    <Pressable
                    onPress={() => navigation.navigate('scheduledActivity')}
                    style={styles.buttonContainer}>
                        <LinearGradient style={styles.buttonWrapper} colors={['#5E6BFF', '#212FCC']}>
                            <Text style={styles.buttonText}>
                                Schedule Now
                            </Text>
                        </LinearGradient>
                    </Pressable>
                </View>
                <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}/>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flexDirection: 'column',
    },
    topContainer: {
        width: width,
        justifyContent:'center',
        paddingVertical: 20
    },
    wrapper:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        paddingBottom: 20
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
    headTitle:{
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: '700',
        color: '#2C2C2C',
        lineHeight: 30,
        paddingLeft: 40,
        paddingBottom:10
    },
    contentContainer:{
        width: '100%',
        alignItems: 'center'
    },
    formContainer:{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        width: '80%',
    },
    formFlex:{
        width: '100%',
        marginVertical: 10
    },
    formFlexWrap:{
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 'auto',
        width: 200
    },
    checkIcon:{
        width: 32,
        height: 32,
        marginRight: 'auto'
    },
    formTitle:{
        fontFamily: 'Inter',
        fontSize: 18,
        fontWeight: '600',
        color: '#2C2C2C',
        lineHeight: 25,
        textAlign: 'left',
        justifyContent: 'flex-start',
        width: '100%',
        paddingTop: 20
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
        paddingHorizontal: 20,
        width:'100%',
        textAlign: 'left',
        justifyContent: 'flex-start'
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

export default CreateActivity;