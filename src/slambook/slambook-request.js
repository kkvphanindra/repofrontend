import React, {useRef} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    Pressable,
    View,
    Dimensions,
    ImageBackground,
    Image,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import Carousel from 'react-native-anchor-carousel';
import Carousel from 'react-native-snap-carousel-v4';

const { width, height } = Dimensions.get('window');

const SlambookRequest = ({navigation}) => {
    
    const carouselRef = React.useRef(null);
    const ENTRIES1 = [
        {
            title: 'Clara Fredry',
            subtitle: 'Friends from 20 days 9 mutual groups',
            illustration: require('../assets/images/picture-2.png')
        },
        {
            title: 'Bollo Fredry',
            subtitle: 'Friends from 20 days 9 mutual groups',
            illustration: require('../assets/images/picture-1.png')
        },
        {
            title: 'Hello Fredry',
            subtitle: 'Friends from 20 days 9 mutual groups',
            illustration: require('../assets/images/picture-3.png')
        },
    ];
    const _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity
                 onPress={() => {
                  carouselRef.current.scrollToIndex(index);
                 }}>
                <ImageBackground
                    source={require('../assets/images/slambook-bg.png')}
                    resizeMode="cover"
                    style={styles.background}>
                    <View style={styles.section}>
                        <Image source={item.illustration} style={styles.pic} />
                        <Text style={styles.headTitle}>{item.title}</Text>
                        <Text style={styles.subTitle}>{item.subtitle}</Text>
                        <View style={styles.selectContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('slambookForm')} style={styles.textWrapper}>
                                <Text style={styles.textAction}>No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('slambookForm')} style={styles.textWrapper}>
                                <Text style={styles.textAction}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>    
                </ImageBackground>    
            </TouchableOpacity>
        );
    }

   

    return (
        <View style={styles.container}>
                <ImageBackground
                    source={require('../assets/images/offer-bg-top.png')}
                    resizeMode="cover"
                    style={styles.topContainer}>
                        <View style={styles.wrapper}>
                            <Pressable onPress={() => navigation.navigate('home')}  style={styles.iconWrapper}>
                                <Image style={styles.arrowIcon} source={require('../assets/images/left-arrow.png')}/>
                            </Pressable>    
                            <Pressable onPress={() => navigation.navigate('notifications')}  style={styles.notifyWrapper}>
                                <Image style={styles.notifyIcon} source={require('../assets/images/notify-icon.png')}/>
                            </Pressable>    
                            <Pressable onPress={() => navigation.navigate('giftsHome')}  style={styles.iconWrapper}>
                                <Image style={styles.badgeIcon} source={require('../assets/images/badge.png')}/>
                            </Pressable>    
                        </View>
                        <Text style={styles.title}>Slambook Request</Text>
                </ImageBackground>
                <View style={styles.carouselContainer}>
                    <Carousel
                        ref={carouselRef}
                        data={ENTRIES1}
                        renderItem={_renderItem}
                        itemWidth={312}
                        sliderWidth={width} 
                        loop={true}
                        style={styles.carouselWrapper}
                    />
                </View>
                <Text style={styles.bottomText}>Slambook request can be sent only after completion of minimum 7 days in connection</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EBECFF',
        flex:1
     },
    topContainer: {
        width: width,
        height: 188,
    },
    wrapper:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        marginHorizontal: 20,
    },
    iconWrapper:{
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    notifyWrapper:{
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 20
    },
    notifyIcon:{
        
    },
    badgeIcon:{
        
    },
    title: {
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: '700',
        color: '#2C2C2C',
        lineHeight: 30,
        textAlign: 'center',
        paddingTop: 30
    },
    carouselContainer:{

    },
    carouselWrapper:{
      
    },
    background:{
        width: 312,
        height: 312,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
      
    },
    section:{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pic:{
        width: 80,
        height: 80,
        borderRadius: 50,
        marginVertical: 10
    },
    headTitle:{
        fontFamily: 'Inter',
        fontSize: 22,
        fontWeight: '700',
        color: '#FFF',
        lineHeight: 24,
        textAlign: 'center',
        paddingVertical: 10
    },
    subTitle:{
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: '400',
        color: '#FFF',
        lineHeight: 20,
        textAlign: 'center'
    },
    selectContainer:{
        width: 140,
        flexDirection: 'row',
        marginVertical: 20
    },
    textWrapper:{
        width: 70,
        height: 38,
        backgroundColor: 'rgba(78, 78, 78, 0.2)',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textAction:{
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '600',
        color: '#FFF',
        lineHeight: 26,
        textAlign: 'center'
    },
    bottomText:{
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: '400',
        color: '#000',
        lineHeight: 26,
        textAlign: 'center',
        marginVertical: 20,
        paddingHorizontal: 60
    }
})

export default SlambookRequest;