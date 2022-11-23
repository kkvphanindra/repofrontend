import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    Alert

} from 'react-native';
import React, { useState } from 'react';
import ToggleSwitch from '../components/toggleSwitch';
import { Switch } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';


export default function SettingNotifications({ navigation }) {
    const [switchOn, setSwitchOn] = useState(false)

    return (
        <>
            <View style={styles.header}>
                <View style={styles.icon}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/icons/png/backButton.png')} />
                    </TouchableOpacity>
                </View>

                <View style={{ alignContent: 'flex-start', alignSelf: 'center', marginLeft: 10 }}>
                    <Text style={styles.name}>Notifications</Text>
                </View>

            </View>

            <ScrollView style={{ backgroundColor: '#ffffff' }}>
                <View style={styles.toggel}>
                    <Text style={styles.toggelName}>Comment</Text>
                    <Switch value={switchOn} onValueChange={() => {
                        setSwitchOn(!switchOn)
                        Alert.alert("Switch on : " + !switchOn)
                    }} />
                </View>

                <View style={styles.toggel}>

                    <Text style={styles.toggelName}>Share</Text>
                    <Switch value={switchOn} onValueChange={() => {
                        setSwitchOn(!switchOn)
                        Alert.alert("Switch on : " + !switchOn)
                    }} />
                </View>

                <View style={styles.toggel}>

                    <Text style={styles.toggelName}>Tag</Text>
                    <Switch value={switchOn} onValueChange={() => {
                        setSwitchOn(!switchOn)
                        Alert.alert("Switch on : " + !switchOn)
                    }} />

                </View>
                <View style={styles.toggel}>


                    <Text style={styles.toggelName}>Remainder</Text>
                    <Switch value={switchOn} onValueChange={() => {
                        setSwitchOn(!switchOn)
                        Alert.alert("Switch on : " + !switchOn)
                    }} />

                </View>
                <View style={styles.toggel}>


                    <Text style={styles.toggelName}>Connect request</Text>
                    <Switch value={switchOn} onValueChange={() => {
                        setSwitchOn(!switchOn)
                        Alert.alert("Switch on : " + !switchOn)
                    }} />
                </View>

                <View style={styles.toggel}>

                    <Text style={styles.toggelName}>Birthdays</Text>
                    <Switch value={switchOn} onValueChange={() => {
                        setSwitchOn(!switchOn)
                        Alert.alert("Switch on : " + !switchOn)
                    }} />

                </View>
                <View style={styles.toggel}>


                    <Text style={styles.toggelName}>Group fan request</Text>
                    <Switch value={switchOn} onValueChange={() => {
                        setSwitchOn(!switchOn)
                        Alert.alert("Switch on : " + !switchOn)
                    }} />
                </View>
                <View style={styles.toggel}>

                    <Text style={styles.toggelName}>Activities</Text>
                    <Switch value={switchOn} onValueChange={() => {
                        setSwitchOn(!switchOn)
                        Alert.alert("Switch on : " + !switchOn)
                    }} />
                </View>
                <View style={styles.toggel}>

                    <Text style={styles.toggelName}>Events</Text>
                    <Switch value={switchOn} onValueChange={() => {
                        setSwitchOn(!switchOn)
                        Alert.alert("Switch on : " + !switchOn)
                    }} />
                </View>
                <View style={styles.toggel}>

                    <Text style={styles.toggelName}>Updates from friends</Text>
                    <Switch value={switchOn} onValueChange={() => {
                        setSwitchOn(!switchOn)
                        Alert.alert("Switch on : " + !switchOn)
                    }} />

                </View>


            </ScrollView >
        </>
    );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#ebecff',
        height: 80,

    },
    icon: {
        marginLeft: '5%',
        marginTop: '8%',
        marginRight: '5%',
    },

    name: {
        fontSize: 20,
        color: 'black',
        fontWeight: '600',
        borderRadius: 100 / 2,
    },
    switchButtonContainer: {
        // height: 60,
        // width: windowWidth / 1,
        // borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
        // alignContent: 'center',
        // alignItems: 'center',
        // textAlign: 'center',
        // textAlignVertical: 'center'
        // flex: 1
        // alignSelf: 'center'
        marginTop: 40
    },
    toggel: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        // paddingTop: 20,
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1
    },
    toggelName:{
        fontSize: 17,
        fontWeight: "500"
        
    }
});