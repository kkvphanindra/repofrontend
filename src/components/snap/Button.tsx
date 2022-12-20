import React from 'react';
import {
    StyleSheet,
    Button,
    View,
    SafeAreaView,
    Text,
    Alert,
    Pressable,
} from 'react-native';

interface Props {
    title?: any;

    onClick?: () => void;
}

const CustomButton: React.FC<Props> = ({
    title,

    onClick,
}) => {

    return (
        <Button
            title={title}
            onPress={onClick}
        />
    );
};

const styles = StyleSheet.create({
    container: {
    },

});

export default CustomButton;
