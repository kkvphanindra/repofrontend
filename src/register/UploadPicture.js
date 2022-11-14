import React, {useState} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    Button,
    Image,
    Pressable,
    View,
    ImageBackground
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as ImagePicker from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';


const UploadPicture = ({route, navigation}) => {
    const { uniqueID, phoneNumber, name, dob, gender, occupation } = route?.params;
    console.log("UploadPicture", phoneNumber, name, dob, gender, occupation)
    const [profileFilepath,
        setProfileFilepath] = useState({data: '', uri: ''});
    const [profileFileData,
        setProfileFileData] = useState('');
    const [profileFileUri,
        setProfileFileUri] = useState('');
    const [coverFilepath,
        setCoverFilepath] = useState({data: '', uri: ''});
    const [coverFileData,
        setCoverFileData] = useState('');
    const [coverFileUri,
        setCoverFileUri] = useState('');
    const [photo,
        setPhoto] = useState(null);

    const handleChoosePhoto = () => {
        const options = {
            noData: true
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            console.log('response', response)
            if (response.uri) {
                setPhoto(response);
            }
        });
    };

    const uploadProfileLogo = (e) => {
        // let file = e.target;
        // console.log('e====>', file)
        let reader = new FileReader();
        reader.onloadend = function () {
            console.log('RESULT===>', reader.result);
        }
        reader.readAsDataURL(e);
        // console.log()
    }
    
    const uploadCoverLogo = (e) => {
        console.log('e====>', e)
        // let file = e.target.files[0];
        // let reader = new FileReader();
        // reader.onloadend = function () {
        //     console.log('RESULT', reader.result);
        // }
        // reader.readAsDataURL(file);
    }

    const launchImageLibrary = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.launchImageLibrary(options, (response) => {
          if(response !== undefined){
            // console.log('Response = ', response
            //     ?.assets[0]
            //         ?.uri);
            // const getImage = response
            //     ?.assets[0]
            //         ?.uri;
            // setProfileFileUri(getImage);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                console.log(response.customButton);
            } else {
                const source = {
                    uri: response.uri
                };
                console.log('response.uri', response
                    ?.assets[0]
                        ?.uri);
                        setCoverFilepath(response);
                setProfileFileData(response.data);
                // setProfileFileUri(response?.assets[0]?.uri);
                ImgToBase64.getBase64String(response?.assets[0]?.uri)
                .then(base64String => setProfileFileUri(`data:image/jpeg;base64,${base64String}`)).catch(err => console.log('error',err));
                // uploadProfileLogo(response?.assets[0]?.uri);
            }

          }
        })
    }
    const launchCoverImageLibrary = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.launchImageLibrary(options, (response) => {
          if(response !== undefined){
            // console.log('Response = ', response
            //     ?.assets[0]
            //         ?.uri);
            // const getImage = response
            //     ?.assets[0]
            //         ?.uri;
            // setProfileFileUri(getImage);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                console.log(response.customButton);
            } else {
                const source = {
                    uri: response.uri
                };
                console.log('response.uri', response
                    ?.assets[0]
                        ?.uri);
                setCoverFilepath(response);
                setCoverFileData(response.data);
                // setCoverFileUri(response?.assets[0]?.uri);
                ImgToBase64.getBase64String(response?.assets[0]?.uri)
                .then(base64String => setCoverFileUri(`data:image/jpeg;base64,${base64String}`)).catch(err => console.log('error',err));
            }

          }
        })
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.wrapper}>
                        <Text style={styles.title}>Profile Picture</Text>
                        {/* {photo && (<Image
                    source={{
                    uri: photo.uri
                }}
                    style={{
                    width: 300,
                    height: 300
                }}/>)}
                <Button title="Choose Photo" onPress={handleChoosePhoto}/> */}
                        <ImageBackground
                            source={require('../assets/images/profile-bg.png')}
                            resizeMode="cover"
                            style={styles.imageContainer}>
                            <TouchableOpacity onPress={launchImageLibrary} style={styles.imageWrapper}>
                                <Image
                                    style={styles.profileImage}
                                    source={{
                                    uri: profileFileUri
                                }}/>
                            </TouchableOpacity>
                        </ImageBackground>
                        <Text style={styles.title}>Cover Picture</Text>
                        <ImageBackground
                            source={require('../assets/images/profile-bg.png')}
                            resizeMode="cover"
                            style={styles.imageContainer}>
                            <TouchableOpacity onPress={launchCoverImageLibrary} style={styles.imageWrapper}>
                                <Image
                                    style={styles.profileImage}
                                    source={{
                                    uri: coverFileUri
                                }}/>
                            </TouchableOpacity>

                        </ImageBackground>
                    </View>
                    <Pressable
                        onPress={() => navigation.navigate('location', {
                            uniqueID: uniqueID,
                            phoneNumber: phoneNumber,
                            name: name, 
                            dob: dob, 
                            gender: gender, 
                            occupation: occupation,
                            profilePic: profileFileUri,
                            coverPic: coverFileUri
                        })}
                        style={styles.buttonContainer}>
                        <LinearGradient style={styles.buttonWrapper} colors={['#5E6BFF', '#212FCC']}>
                            <Text style={styles.buttonText}>
                                Continue
                            </Text>
                        </LinearGradient>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
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
        fontSize: 22,
        fontWeight: '600',
        color: '#2C2C2C',
        lineHeight: 28,
        textAlign: 'center',
        paddingTop: 20,
        paddingBottom: 20
    },
    imageContainer: {
        width: 230,
        height: 230,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40
    },
    imageWrapper: {
        width: 104,
        height: 104,
        borderRadius: 50
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50
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

export default UploadPicture;