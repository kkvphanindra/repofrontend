import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    Pressable,
    View,
    TouchableHighlight,
    TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SelectDropdown from 'react-native-select-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

const Details = ({navigation}) => {
    const countries = ["Male", "Female"];
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
        const selectedDate = moment(date).format('MM/DD/YYYY');
        setDateText(selectedDate)
        console.log("A date has been picked: ", selectedDate);
        hideDatePicker();
    };

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>My Name is</Text>
                <Text style={[styles.info, styles.infoHighlight]}>
                    wow its available!!!</Text>
                <Text style={styles.info}>
                    This name will appear as your username and you wont be able to change
                </Text>
            </View>
            <View style={styles.selectContainer}>
                <View style={styles.selectWrapper}>
                    <Text style={styles.selectText}>DOB</Text>
                    <TouchableHighlight
                        style={styles.dropDownBox}
                        activeOpacity={1}
                        underlayColor="transparent"
                        onPress={showDatePicker}>
                        <Text style={styles.dropDownText}>{dateText}</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.selectWrapper}>
                    <Text style={styles.selectText}>Gender</Text>
                    <SelectDropdown
                        data={countries}
                        defaultButtonText="Select"
                        buttonStyle={styles.buttonStyle}
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
            </View>
            <View style={styles.selectContainer}>
                <View style={[styles.selectWrapper, styles.fullWidth]}>
                    <Text style={styles.selectText}>Working at</Text>
                    <TextInput style={styles.buttonStyle}/>
                </View>
            </View>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}/>

            <Pressable
                onPress={() => navigation.navigate('uploadPicture')}
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
    info: {
        fontFamily: 'Inter',
        fontSize: 18,
        fontWeight: '400',
        color: '#2C2C2C',
        lineHeight: 30,
        textAlign: 'center'
    },
    infoHighlight: {
        color: '#3D5CFF'
    },
    selectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginVertical: 20
    },
    selectWrapper: {
        width: '48%'
    },
    selectText: {
        fontFamily: 'Inter',
        fontSize: 15,
        fontWeight: '400',
        color: '#2C2948',
        lineHeight: 25,
        paddingBottom: 10
    },
    fullWidth: {
        width: '100%'
    },
    dropDownBox: {
        backgroundColor: '#F7F7F7',
        borderRadius: 12,
        border: '#2C2C2C',
        borderWidth: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    buttonStyle: {
        backgroundColor: '#F7F7F7',
        border: '#2C2C2C',
        borderWidth: 0.8,
        borderRadius: 10,
        width: '100%'
    },
    buttonTextStyle: {
        fontFamily: 'Inter',
        fontSize: 15,
        fontWeight: '400',
        color: '#2C2948',
        lineHeight: 25
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

export default Details;