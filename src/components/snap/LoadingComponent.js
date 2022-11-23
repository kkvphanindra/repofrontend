import React from "react";
import { View, ActivityIndicator } from 'react-native'

const LoadingComponet = () => {
    return (
        <View>
            <ActivityIndicator
                color={"black"}
                size="large" />
        </View>
    )
}

export default LoadingComponet;