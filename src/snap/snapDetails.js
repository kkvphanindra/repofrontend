import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity ,View,Image, TextInput} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import NewSnap from "../components/snap/NewSnap";
import { addNewPost } from "../redux/Post/actions";

const SnapDetails = ({navigation}) => {
    const dispatch = useDispatch;
    const postState = useSelector((state) => state.postState);

    return (
        <SafeAreaView style={styles.constainer}>
                        <View style={styles.header}>
                <View style={styles.backView}>
                    <TouchableOpacity onPress={()=> navigation.goBack()}>
                        <Text>B</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.pageTitleView}>
                    <Text style={styles.pageTitleText}>Snap</Text>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>

            <View style={styles.body}>
                <View style={styles.bodyMainView}>
                    <View style={styles.bodyImageColumn}>
                        <View style={styles.profileImageView}>
                            <Image style={styles.profileImage}
                            source={{
                                uri:
                                    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
                            }}/>
                        </View>
                    </View>
                    <View style={styles.bodyInputColumn}>
                        <View style={styles.inputView}>
                            <View style={styles.inputHeaderView}>
                                <Text style={styles.inputHeaderText}>
                                    Tag Group
                                </Text>
                            </View>
                            <View style={styles.inputTextInputView}>
                                <TextInput style={styles.inputTextInput} />
                            </View>
                        </View>
                        <View style={styles.inputView}>
                            <View style={styles.inputHeaderView}>
                                <Text style={styles.inputHeaderText}>
                                    Select activity
                                </Text>
                            </View>
                            <View style={styles.inputTextInputView}>
                                <TextInput style={styles.inputTextInput} />
                            </View>
                        </View>
                        <View style={styles.inputView}>
                            <View style={styles.inputHeaderView}>
                                <Text style={styles.inputHeaderText}>
                                    Select  for Approval
                                </Text>
                            </View>
                            <View style={styles.inputTextInputView}>
                                <TextInput style={styles.inputTextInput} />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.bodyThoughtsView}>
                    <NewSnap
                    editable ={true}
                    navigation={navigation}
                    postButton={true}
                    />
                </View>
            </View>
        
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    constainer:{
        flex:1,
        paddingHorizontal:30,
        backgroundColor:'#FFFFFF'
    },
    header:{
        flexDirection:'row',
        height:60,
        alignContent:'center'
    },
    backView:{
        width:'12%',
        alignItems:'center',
        justifyContent:'center'
    },
    pageTitleView:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    pageTitleText:{
        fontWeight:'600',
        fontSize:25,
        color:'black',
        transform:([{
            translateX:-45
        }])
    },
    body:{
        flex:1,
        width:'100%',
        marginTop:40
    },
    bodyMainView:{
        flexDirection:'row',
        width:'100%',
    },
    bodyImageColumn:{
        width:'20%'
    },
    profileImageView:{},
    profileImage:{
        width: 60,
        height: 60,
        borderRadius: 100 / 2
    },
    bodyInputColumn:{
        width:'80%',
    },
    inputView:{
        width:"100%",
        paddingBottom:20
    },
    inputHeaderView:{},
    inputHeaderText:{
        fontWeight:'600',
        fontSize:16,
        color:'black',
        marginBottom:5
    },
    inputTextInputView:{
        height:50,
    },
    inputTextInput:{
        borderWidth:1,
        borderColor:'#DDDDDD',
        borderRadius:10
    },
    inputDropdown:{},
    bodyThoughtsView:{},

})
export default SnapDetails;