import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TextInput,
    ImageBackground,
    Button,
    Pressable
} from 'react-native';
const SearchBar = (props) => {
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.icon} source={require('../assets/images/search-icon.png')} />
            <TextInput
                style={styles.input}
                placeholder={props.placeholder}
            />
        </View>
    )
}

export default SearchBar;
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        backgroundColor: '#F7F7F7',
        borderRadius: 10,
        height: 50,
        paddingLeft: 20,
        borderColor: '#979797',
        borderWidth: 0.3
    },
    icon: {
        width: 19,
        height: 19
    },
    input: {
        width: "85%",
        fontFamily: 'Inter',
        fontSize: 14,
        paddingLeft: 10,
        lineHeight: 20,
        color: '#9EA6BE',

    }
})