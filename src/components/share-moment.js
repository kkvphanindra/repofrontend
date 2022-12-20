import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    Pressable,
    TextInput,
    Image,
    ImageBackground,
    View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ShareMoment = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>Share Moments</Text>
                <View>
                    <View>
                        <Image source={require('../assets/images/contact-pic.png')} />
                        <View>
                            <View style={styles.formFlex}>
                                <Text style={styles.formLabel}>Tag Group</Text>
                                <TextInput style={styles.formField} />
                            </View>
                            <View style={styles.formFlex}>
                                <Text style={styles.formLabel}>Select activity</Text>
                                <TextInput style={styles.formField} />
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.formFlex}>
                            <Text style={styles.formLabel}>Your thoughts</Text>
                            <TextInput style={styles.formField} />
                        </View>
                    </View>
                </View>
            </View>
            
            <Pressable
                onPress={() => navigation.navigate('details')}
                style={styles.buttonContainer}>
                <LinearGradient style={styles.buttonWrapper} colors={['#5E6BFF', '#212FCC']}>
                    <Text style={styles.buttonText}>
                        Share Now
                    </Text>
                </LinearGradient>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFEF',
        alignItems: 'center',
    },
    wrapper: {
        maxWidth: '80%'
    },
    title: {
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: '700',
        color: '#2C2C2C',
        lineHeight: 28,
        paddingVertical: 20,
        textAlign: 'left'
    },
    formFlex:{
        width: '80%',
        marginVertical: 10
    },
    formLabel:{
        fontFamily: 'Inter',
        fontSize: 15,
        fontWeight: '400',
        color: '#2C2948',
        lineHeight: 25,
        paddingBottom: 10
    },
    formField:{
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: '700',
        color: '#2C2C2C',
        lineHeight: 30,
        backgroundColor: '#F7F7F7',
        borderRadius: 10,
        height: 50,
        paddingHorizontal: 20
    },
    buttonContainer: {
        width: '80%',
        height: 60,
        alignItems: 'flex-end'
    },
    buttonWrapper: {
        width: 162,
        height: 40,
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

export default ShareMoment;