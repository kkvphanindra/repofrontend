import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,

} from 'react-native';
import React from 'react';
import SettingsComponent from '../components/CustomSettings';

export default function Setting({ navigation }) {

    const settingsOptions = [

        { title: 'Invite friends', subTitle: null, onPress: () => { } },
        { title: 'Saved', subTitle: null, onPress: () => { } },
        { title: 'Notifications', subTitle: null, onPress: () => { navigation.navigate('settingNotification') } },
        { title: 'Privacy & Security', subTitle: null, onPress: () => { } },
        { title: 'Help', subTitle: null, onPress: () => { } },
        { title: 'About us', subTitle: null, onPress: () => { } },
        { title: 'Contact us', subTitle: null, onPress: () => { } },

    ];
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.icon}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/icons/png/backButton.png')} />
                    </TouchableOpacity>
                </View>

                <View style={{ alignContent: 'flex-start', alignSelf: 'center', marginLeft: 10 }}>
                    <Text style={styles.name}>Settings</Text>
                    <Text style={styles.number}>+91 9876543211</Text>

                </View>

            </View>
            <SettingsComponent
                settingsOptions={settingsOptions}
            />

        </View>
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
    }
});