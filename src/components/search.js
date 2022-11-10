import React, {useState, useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    Pressable,
    View,
    Image,
    TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SearchComponent = ({searchPhrase, setSearchPhrase, placeHolder, filter}) => {
    // console.log('searchPhrase', searchPhrase, 'setSearchPhrase', setSearchPhrase)
    const getFilter = () => {

    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
            <Image
                source={require('../assets/images/search-icon.png')}/>
            </View>
            <TextInput
                style={styles.inputContainer}
                placeholder={placeHolder}
                value={searchPhrase}
                onChangeText={setSearchPhrase}/>
                {
                    filter && 
                    <Pressable onPress={getFilter}  style={styles.filterIconWrapper}>
                        <Image style={styles.filterIcon} source={require('../assets/images/filter.png')} />
                    </Pressable>      
                }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7F7',
        width: '100%',
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#B8B8D2',
        borderWidth: 0.5
    },
    imageContainer:{
        width: 50,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer:{
        width: '85%'
    },
    filterIconWrapper:{
        width: 50,
        height: 50,
        position: 'relative',
        right: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    filterIcon:{

    }
})

export default SearchComponent;