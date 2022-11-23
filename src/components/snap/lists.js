import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Image,
    Dimensions,
    TextInput,
    ImageBackground,
    Pressable,
    FlatList,

} from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Lists = (props) => {
    console.log('props', props.data)
    const navigation = useNavigation();
    return (
        <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            {
                props.data.map((e, i) => {
                    return <Pressable key={i} style={styles.listContainer} onPress={() => navigation.navigate('interest')}>
                        <Text style={styles.label}>{e.label}</Text>
                    </Pressable>

                })
            }
        </View>
    )
}

export default Lists;

const styles = StyleSheet.create({
    listContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: '#FB8D33',
        // backgroundColor: '#F7F7F7',
        borderRadius: 25,
        minWidth: 100,
        marginBottom: 10,
        height: 50,
        marginRight: 10,
        // borderBottomColor: '#D2D1D7',
        // borderBottomWidth: 0.5
        paddingLeft: 10,
        paddingRight: 10
    },
    label: {
        textAlign: 'center',
        fontFamily: 'Inter',
        fontSize: 16,
        paddingLeft: 10,
        paddingRight: 10,
        lineHeight: 50,
        color: '#FFF',
    },
})