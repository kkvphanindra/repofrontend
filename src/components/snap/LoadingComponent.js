import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native'
import { useSelector } from "react-redux";

const LoadingComponet = () => {
    const postState = useSelector((state)=>state.postState)
    return (
        <View>
            {postState.loading? 
            <ActivityIndicator
                color={"black"}
                size="large" />
            :
            <Text style={{color: '#000', alignSelf: 'center'}}>No Previous Post Found</Text>
        }
        </View>
    )
}

export default LoadingComponet;