import React, { useState } from 'react';
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
    Button,
    TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SearchComponent from '../components/search';
import Modal from "react-native-modal";

const { width, height } = Dimensions.get('window');

const ConnectHome = ({navigation}) => {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);
    
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const data = [
        {
            'profilePic': require('../assets/images/picture-2.png'),
            'name': 'Abinav jain',
            'distance': '3kms away',
            'like': '6.2k',
            'comment': '6.2k',
            'gallery': [
                {'item': require('../assets/images/gallery-pic-1.png')},
                {'item': require('../assets/images/gallery-pic-2.png')},
                {'item': require('../assets/images/gallery-pic-3.png')},
                {'item': require('../assets/images/gallery-pic-4.png')},
            ]
        },
        {
            'profilePic': require('../assets/images/picture-2.png'),
            'name': 'Crystal Merlin',
            'distance': '3kms away',
            'like': '6.2k',
            'comment': '6.2k',
            'gallery': [],
            'content': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            'coverPic': require('../assets/images/cover-pic.png')
        },
        {
            'profilePic': require('../assets/images/picture-2.png'),
            'name': 'Abinav jain',
            'distance': '3kms away',
            'like': '6.2k',
            'comment': '6.2k',
            'gallery': [
                {'item': require('../assets/images/gallery-pic-1.png')},
                {'item': require('../assets/images/gallery-pic-2.png')},
                {'item': require('../assets/images/gallery-pic-3.png')},
                {'item': require('../assets/images/gallery-pic-4.png')},
            ]
        },
        {
            'profilePic': require('../assets/images/picture-2.png'),
            'name': 'Crystal Merlin',
            'distance': '3kms away',
            'like': '6.2k',
            'comment': '6.2k',
            'gallery': [],
            'content': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            'coverPic': require('../assets/images/cover-pic.png')
        },
    ];

    const modalList = [
        {
            "icon": require('../assets/images/group-icon-1.png'),
            "title": "Invite to Group",
            "label": "inviteToGroup"
        },
        {
            "icon": require('../assets/images/group-icon-2.png'),
            "title": "Hide"
        },
        {
            "icon": require('../assets/images/group-icon-3.png'),
            "title": "Send Message"
        },
        {
            "icon": require('../assets/images/group-icon-4.png'),
            "title": "Send Link"
        },
        {
            "icon": require('../assets/images/group-icon-5.png'),
            "title": "Follow"
        },
        {
            "icon": require('../assets/images/group-icon-6.png'),
            "title": "Shortlist"
        },
        {
            "icon": require('../assets/images/group-icon-7.png'),
            "title": "Block"
        },
        {
            "icon": require('../assets/images/group-icon-8.png'),
            "title": "Report"
        },
        {
            "icon": require('../assets/images/group-icon-9.png'),
            "title": "Create Group"
        },
    ]

    return (
        <ScrollView showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>
                <ImageBackground
                    source={require('../assets/images/offer-bg-top.png')}
                    resizeMode="cover"
                    style={styles.topContainer}>
                        <View style={styles.wrapper}>
                            <Pressable onPress={() => navigation.navigate('home')}  style={[styles.iconWrapper, {marginLeft: 'auto'}]}>
                                <Image style={styles.arrowIcon} source={require('../assets/images/left-arrow.png')}/>
                            </Pressable>    
                            <Text style={styles.title}>Huddle Connect</Text>
                            <View style={styles.notifyWrapper}></View>    
                        </View>
                </ImageBackground>
                <View style={styles.searchWrapper}>
                    <SearchComponent placeHolder={'Search here'}      
                        searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} filter={true} />
                </View>
                <View style={styles.mainContainer}>
                    {
                        data.length && data.map((e,i) => {
                        return <View style={styles.mainWrapper} key={i}>
                                <View style={styles.contentContainer}>
                                    <Image style={styles.profileImage} source={e?.profilePic}/>
                                    <View style={styles.titleContainer}>
                                        <Text style={styles.H2Title}>{e?.name}</Text>
                                        <Text style={styles.H3Title}>{e?.distance}</Text>
                                    </View>
                                    <View style={styles.likeContainer}>
                                        <Text style={styles.like}>{e?.like}</Text>
                                        <Text style={styles.comment}>{e?.comment}</Text>
                                    </View>
                                    <Pressable onPress={toggleModal} style={styles.iconWrapper}>
                                        <Image style={styles.menuIcon} source={require('../assets/images/dot-menu.png')}/>
                                    </Pressable>
                                </View>
                                <View style={styles.galleryContainer}>
                                    {
                                        e?.gallery.length > 0 && e?.gallery.map((ele,index)=>{
                                            return <Image key={index} style={styles.    
                                                galleryImage} source={ele?.item}/>
                                        })
                                    }
                                </View>
                                {
                                e?.content && <View style={styles.coverContainer}>
                                    <Text style={styles.coverContent}>{e?.content}</Text>
                                    <Image style={styles.coverImage} source={e?.coverPic}/>
                                </View>

                                }
                            </View>
                        })
                    }
                </View>
            </View>
            <Modal isVisible={isModalVisible} style={styles.modalContainer}>
                <View style={styles.modalWrapper}>
                    {
                        modalList.length > 0 && modalList.map((e,i) => {
                            return(
                                <Pressable key={i} onPress={() => navigation.navigate(e?.label)} style={styles.modalList}>
                                    <Image style={styles.groupIcon} source={e?.icon}/>
                                    <Text style={styles.groupTitle}>{e.title}</Text>
                                </Pressable>
                            )
                        })
                    }
                    <Button title="Hide modal" onPress={toggleModal} />
                </View>
            </Modal>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topContainer: {
        width: width,
        height: 170,
        alignItems: 'center',
        position: 'relative'
    },
    wrapper:{
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: 60,
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
    title: {
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: '700',
        color: '#2C2C2C',
        lineHeight: 30,
        textAlign: 'center',
        paddingTop: 10,
        marginLeft: 'auto'
    },
    searchWrapper:{
        width: '80%',
        position: 'relative',
        backgroundColor: 'transparent',
        top: -25
    },
    mainContainer:{
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center'
    },
    mainWrapper:{
        width: '80%',
        flexDirection: 'column',
        borderBottomColor: '#979797',
        borderBottomWidth: 0.5,
    },
    contentContainer:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        borderBottomColor: '#979797',
        borderBottomWidth: 0.5,
        paddingVertical: 10
    },
    profileImage:{
        width: 70,
        height: 70,
        borderRadius:50
    },
    titleContainer:{
        flexDirection: 'column',
        marginBottom: 'auto',
        justifyContent:'flex-start',
        width: 100
    },
    H2Title:{
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '400',
        color: '#2C2C2C',
        lineHeight: 20,
        paddingTop: 10,
        textAlign: 'left'
    },
    H3Title:{
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: '400',
        color: '#858597',
        lineHeight: 16,
        paddingTop: 5
    },
    likeContainer:{
        flexDirection: 'column'
    },
    like:{
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: '400',
        color: '#1F83A2',
        lineHeight: 16,
        height:30,
        paddingHorizontal: 20,
        borderRadius: 14,
        textAlignVertical: 'center',
        backgroundColor: 'rgba(100, 203, 235, 0.3)',
        marginVertical: 5
    },
    comment:{
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: '400',
        color: '#BC2F32',
        lineHeight: 16,
        height:30,
        paddingHorizontal: 20,
        borderRadius: 14,
        textAlignVertical: 'center',
        backgroundColor: 'rgba(255, 90, 90, 0.2)',
        marginVertical: 5
    },
    galleryContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20
    },
    galleryImage:{
        width: 70,
        height: 70,
        borderRadius: 10
    },
    coverContainer:{
        flexDirection: 'column',
        marginBottom: 20
    },
    coverContent:{
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: '400',
        color: '#858597',
        lineHeight: 22,
    },
    coverImage:{
        width: '100%',
        height: 145,
        borderRadius: 12,
        marginVertical: 12
    },
    modalContainer:{
        alignItems: 'center',
    },
    modalWrapper:{
        width: 206,
        backgroundColor: '#FFF',
        alignItems: 'center',
        flexDirection: 'column',
        paddingVertical: 20,
        borderRadius: 14,
    },
    modalList:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '80%',
        marginVertical: 10
    },
    groupIcon:{
        width: 22,
        height: 22
    },
    groupTitle:{
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '400',
        color: '#000',
        lineHeight: 22,
        textAlign: 'left',
        paddingLeft: 14
    }
})

export default ConnectHome;