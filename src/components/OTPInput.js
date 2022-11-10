import React, {useRef, useState, useEffect} from "react";
import {
    StyleSheet,
    Text,
    Pressable,
    TextInput,
    View,
    KeyboardAvoidingView
} from 'react-native';
import {CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell} from 'react-native-confirmation-code-field';

const OTPInput = ({maximumLength, onChange}) => {
    const [value, setValue] = useState('');
    const [code, setCode] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: maximumLength});
    const [props,
        getCellOnLayoutHandler] = useClearByFocusCell({value, setValue});
    
        useEffect(() =>{
            // console.log('OTPInput Component data', data)
            // confirmCode(data)
            onChange(value)
        }, [value])
        console.log('OTPInput value', value)
    return (
        <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={maximumLength}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
            <Text
                key={index}
                style={[
                styles.cell, styles.cellText, isFocused && styles.focusCell
            ]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused
                    ? <Cursor/>
                    : null)}
            </Text>
        )}/>
    );
};

const styles = StyleSheet.create({
    codeFieldRoot: {
        // marginTop: 20
    },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderBottomWidth: 2,
        borderBottomColor: '#1C1939',
        textAlign: 'center',
        marginHorizontal: 5
    },
    cellText: {
        color: '#1C1939',
        fontSize: 32,
        textAlign: 'center'
    },
    focusCell: {
        borderBottomColor: '#2E3CD7',
        color: '#2E3CD7',
        borderBottomWidth: 2
    }
})

export default OTPInput;