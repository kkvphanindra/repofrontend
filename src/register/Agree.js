import React from 'react';
import {Image, StyleSheet, Text, Pressable, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Agree = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>Hi Frisles</Text>

            </View>
            <Image style={styles.imageContainer} source={require('../assets/images/list-1.png')}/>
            <Image style={styles.imageContainer} source={require('../assets/images/list-2.png')}/>
            <Image style={styles.imageContainer} source={require('../assets/images/list-3.png')}/>
            <Pressable
                onPress={() => navigation.navigate('details')}
                style={styles.buttonContainer}>
                <LinearGradient style={styles.buttonWrapper} colors={['#5E6BFF', '#212FCC']}>
                    <Text style={styles.buttonText}>
                        I Agree
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
    imageContainer:{
      marginBottom: 20
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

export default Agree;