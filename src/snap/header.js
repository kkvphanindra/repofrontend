import React from "react"
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import NewSnap from "../components/snap/NewSnap";
// import { updateFields } from "../redux/Post/actions";
const { height } = Dimensions.get('window');


const profileData =
{
    name: "Raju",
    profilePic: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png'
}


const Header = (props) => {
    const dispatch = useDispatch;
const postState = useSelector((state) => state.postState);


    const { navigation } = props.navigation;

    const checkValidity = (val, fieldId) => {
        let isValid = true;
    
        if (fieldId === 'post' && val.length <= 3) {
            isValid = false;
        }
    
        console.log(val)
    
        dispatch(updateFields(val, fieldId, isValid))
    }
    

    return (
        <View>
            <View style={styles.top}>
                <View style={styles.topBar}>

                </View>
                <View>
                    <View style={styles.profileInformation}>
                        <Image
                            source={{
                                uri:
                                    profileData.profilePic,
                            }}
                            style={styles.profileImage} />
                        <Text style={styles.profileName}>{profileData.name}</Text>
                    </View>
                </View>
            </View>
            <View style={{ marginTop: 30, width: '100%', paddingBottom: 30 }}>
                <TouchableOpacity onPress={() => navigation.navigate("snapDetails")}>
                    <NewSnap
                        editable={false} 
                        navigation={navigation}
                        handleChange={checkValidity}
                        />
                </TouchableOpacity>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    top: {
        alignItems: 'center',
        width: '100%'
    },
    topBar: {
        height: height / 10,
        alignItems: 'flex-end'
    },
    profileInformation: {
        alignItems: 'center'
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 100 / 2
    },
    profileName: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingTop: 10,
        color: 'black'
    },
    thoughts: {
        width: '100%',
        height: 250
    },
    thoughtsHeading: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        color: 'black'
    },
    thoughtsBox: {
        borderColor: 'grey',
        borderRadius: 15,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        width: '100%',

        borderColor: '#DDDDDD',
        backgroundColor: 'white'

    },
    thoughtsBoxInputViewBorder: {
        width: '100%',
        height: 160,
        backgroundColor: '#DDDDDD',
        borderRadius: 15,
        alignItems: 'center'

    },
    thoughtsBoxInputView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 159,
        backgroundColor: 'white',
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15,
        borderTopWidth: 1,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderColor: '#DDDDDD'
    },
    thoughtsBoxInput: {
        width: "98%",
        textAlignVertical: 'top',
        padding: 10,
        fontSize: 15,
        fontWeight: '500'
    },
    thoughtBoxAttachments: {
        flexDirection: 'row',
        height: '30%',
        width: '100%',
        height: height / 15,
    },
    attachmentBox: {
        alignItems: 'center',
        borderColor: 'grey',
        flex: 1,
        height: '100%',
        borderLeftWidth: 1,
        borderColor: '#DDDDDD'
    },
    attachmentBoxLeftCorner: {
        borderColor: 'grey',
        flex: 1,
        height: '100%',
        alignItems: 'center'

    },
    attachmentBoxRightCorner: {
        flex: 1,
        height: '100%',
        borderLeftWidth: 1,
        borderColor: '#DDDDDD',
        alignItems: 'center'
    },
})

export default Header