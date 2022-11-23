import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
const { height } = Dimensions.get('window');
import OptionsMenu from "react-native-option-menu";
import { useDispatch } from "react-redux";
import { addPostLike } from "../../redux/Post/actions";
import LoadingComponet from "./LoadingComponent";

const PostItem = (props) => {
    const dispatch = useDispatch();

    const heart = true;
    const comment = true;
    const mic = true;
    const share = true;



    return (

        <View>
            {props.activityLoading ?
                <View>
                    <LoadingComponet />
                </View>
                :
                <View style={styles.post}>
                    <View style={styles.postHeading}>
                        <View style={styles.postHeadingImageAndInfo}>
                            <View style={styles.postHeadingImage}>
                                <Image
                                    source={{ uri: props.profilePic }}
                                    style={styles.postImage} />

                            </View>
                            <View style={styles.postHeadingInfo}>
                                <View style={styles.postHeadingInfoName}>
                                    <Text style={styles.postNameText}>{props.name}</Text>
                                </View>
                                <View style={styles.postHeadingInfoGroups}>
                                    <Text style={styles.postGroupText}>{props.groupName}</Text>
                                </View>
                            </View>

                        </View>
                        <View style={styles.postHeadingActions}>
                            <TouchableOpacity>
                                <OptionsMenu
                                    button={require('../../assets/icons/png/actions.png')}
                                    buttonStyle={styles.actionButton}
                                    // destructiveIndex={1}
                                    options={[false ? "Follow" : "Unfollow", "Hide post", "Save Post", "Report", "Verify", "Add to ★"]}
                                    actions={[]}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.postBody}>
                        <View style={styles.postBodyTextView}>
                            <Text numberOfLines={2} style={styles.postBodyText}>
                                {props.postText}
                            </Text>
                        </View>
                        <View style={styles.postBodyAttachmentView}>

                        </View>
                    </View>
                    <View style={styles.postActions}>
                        <View style={styles.postActionsMain}>
                            <View style={styles.postMainAction}>
                                <TouchableOpacity
                                    onPress={() => dispatch(addPostLike(props.id, "6dddae20-5925-11ed-a555-c9afc10124e6"))}
                                    style={styles.postActionMainLogo}>
                                    {heart ?
                                        <Image
                                            source={require("../../assets/icons/png/heartClicked.png")}
                                        />
                                        :
                                        <Image
                                            source={require("../../assets/icons/png/heart.png")}
                                        />
                                    }
                                </TouchableOpacity>
                                <View style={styles.postMainActionInfo}>
                                    <Text style={styles.postActionText}>{props.loves}</Text>
                                </View>
                            </View>
                            <View style={styles.postMainAction}>
                                <View style={styles.postActionMainLogo}>
                                    {comment ?
                                        <Image
                                            source={require("../../assets/icons/png/commentClicked.png")}
                                        />
                                        :
                                        <Image
                                            source={require("../../assets/icons/png/comment.png")}
                                        />
                                    }
                                </View>
                                <View style={styles.postMainActionInfo}>
                                    <Text style={styles.postActionText}>{props.comment}</Text>
                                </View>
                            </View>
                            <View style={styles.postMainAction}>
                                <View style={styles.postActionMainLogo}>
                                    {mic ?
                                        <Image
                                            source={require("../../assets/icons/png/micClicked.png")}
                                        />
                                        :
                                        <Image
                                            source={require("../../assets/icons/png/mic.png")}
                                        />
                                    }
                                </View>
                                <View style={styles.postMainActionInfo}>
                                    <Text style={styles.postActionText}>{props.voices}</Text>
                                </View>
                            </View>

                        </View>
                        <View style={styles.postSecondaryAction}>
                            <View style={styles.postSecondaryActionInfo}>
                                <Text style={styles.postActionText}>{props.shares}</Text>
                            </View>
                            <TouchableOpacity style={styles.postSecondaryActionLogo}
                                onPress={() => dispatch(addPostLike(props.id, "6dddae20-5925-11ed-a555-c9afc10124e6"))}>
                                {share ?
                                    <Image
                                        source={require("../../assets/icons/png/shareClicked.png")}
                                    />
                                    :
                                    <Image
                                        source={require("../../assets/icons/png/share.png")}
                                    />
                                }
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

            }

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
    post: {
        width: '100%',
        height: 380,
        elevation: 4,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15,
        marginVertical: 20
    },
    postHeading: {
        flexDirection: 'row',
        height: '23%',
        width: '100%',
        alignContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: "#DDDDDD",
        borderBottomColor: "#DDDDD"
    },
    postHeadingImageAndInfo: {
        flexDirection: 'row',
        flex: 1,

    },
    postHeadingImage: {
        paddingRight: 20
    },
    postImage: {
        width: 60,
        height: 60,
        borderRadius: 100 / 2
    },
    postHeadingInfo: {},
    postHeadingInfoName: {
        paddingBottom: 5,
    },
    postNameText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black'
    },
    postHeadingInfoGroups: {},
    postGroupText: {
        fontSize: 13,
        fontWeight: '400',
        color: "#A5A4A8"
    },
    postHeadingActions: {},
    postBody: {},
    postBodyTextView: {
        paddingVertical: 15,
        height: 70
    },
    postBodyText: {},
    postBodyAttachmentView: {
        height: 150,
        width: '100%',
        backgroundColor: 'green',
        borderRadius: 15,
        color: 'black'
    },
    postBodyAttachment: {},
    postActions: {
        flexDirection: 'row',
        marginVertical: 20,
        alignContent: 'space-between',
        width: '100%',

    },
    postActionsMain: { flexDirection: 'row', flex: 1 },
    postActionText: {
        fontSize: 12,
        color: "#A5A4A8",
        fontWeight: '400'
    },
    postMainAction: { flexDirection: 'row', paddingRight: 20 },
    postActionMainLogo: {
        paddingRight: 10
    },
    postMainActionInfo: {},
    postSecondaryAction: { flexDirection: 'row' },
    postSecondaryActionLogo: {},
    postSecondaryActionInfo: {
        paddingRight: 10,
    },
    actionButton: {
        height: 20,
        width: 20
    }
})

export default PostItem