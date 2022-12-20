import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    Pressable,
    View,
    Dimensions,
    Platform,
    PermissionsAndroid
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
// import Geolocation from "react-native-geolocation-service";
import Geolocation from "@react-native-community/geolocation";
import axios from 'axios';
import GetLocation from 'react-native-get-location';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Location = ({route, navigation}) => {
    const { uniqueID, phoneNumber, name, dob, gender, occupation, profilePic, coverPic } = route?.params;
    // console.log(phoneNumber, name, dob, gender, occupation, profilePic, coverPic)
    
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    const triggerRegister = ()     => {
        navigation.navigate('inviteFriends', {
            uniqueID: uniqueID,
            phoneNumber: phoneNumber,
            name: name, 
            dob: dob, 
            gender: gender, 
            occupation: occupation,
            profilePic: profilePic,
            coverPic: coverPic,
            latitude: latitude.toString(),
            longitude: longitude.toString()
        })
    }
    useEffect(() => {
        if (Platform.OS === 'android') {
            
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,);
            if (PermissionsAndroid.RESULTS.GRANTED) {
                // console.log(PermissionsAndroid.RESULTS.GRANTED, "Geolocation", Geolocation.getCurrentPosition(e => console.log('e',e.coords.latitude)));
                Geolocation.getCurrentPosition(e => {
                    console.log('position', e.coords)
                    setLatitude(e.coords.latitude);
                    setLongitude(e.coords.longitude);
                },
                error => {
                    console.log("error.message", error.message.toString());
                },{
                    showLocationDialog: true,
                    timeout: 20000,
                    maximumAge: 3600000
                })
                // Geolocation.getCurrentPosition(e => {
                //     console.log('position', e.coords)
                //     setLatitude(e.coords.latitude);
                //     setLongitude(e.coords.longitude);
                // }, error => {
                //     console.log("error.message", error.message.toString());
                // }, {
                //     showLocationDialog: true,
                //     enableHighAccuracy: true,
                //     timeout: 20000,
                //     maximumAge: 3600000
                // });
                //   GetLocation.getCurrentPosition({     enableHighAccuracy: true,     timeout:
                // 15000, }) .then(location => {     console.log("location",location); })
                // .catch(error => {     const { code, message } = error;     console.warn(code,
                // message); })
            }
        }

        return () => {}
    }, []);

    console.log('latitude', latitude, 'longitude', longitude)
    return (

        <View style={styles.container}>
            <Pressable
                onPress={() => navigation.navigate('inviteFriends')}
                style={styles.skipContainer}>
                <Text style={styles.skipText}>
                    Skip
                </Text>
            </Pressable>
            <View style={styles.wrapper}>
                <Text style={styles.title}>Enable Location</Text>
            </View>
            <MapView
                provider={PROVIDER_GOOGLE}
                loadingIndicatorColor="#e21d1d"
                style={styles.map}
                region={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }}
                showsUserLocation={true}
                showsBuildings={true}
                loadingEnabled={true}>
                <Marker
                    coordinate={{
                    latitude: latitude,
                    longitude: longitude
                }}></Marker>
            </MapView>
            <Pressable
                onPress={() => triggerRegister()}
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
    skipContainer: {
        borderColor: '#505EF4',
        borderWidth: 1,
        borderRadius: 5,
        width: 91,
        height: 34,
        zIndex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFF',
        position: 'absolute',
        right: 50,
        top: 20
    },
    skipText: {
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: '400',
        color: '#5B67CA',
        lineHeight: 20,
        textAlign: 'center'
    },
    title: {
        fontFamily: 'Inter',
        fontSize: 32,
        fontWeight: '600',
        color: '#2C2C2C',
        lineHeight: 40,
        textAlign: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        zIndex: 1
    },
    map: {
        width: width,
        height: height,
        position: 'absolute',
        top: 0,
        bottom: 0
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

export default Location;