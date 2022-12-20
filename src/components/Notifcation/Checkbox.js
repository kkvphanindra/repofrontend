import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import { Checkbox } from 'react-native-paper';

const Checkboxs = () => {
    const [checked, setChecked] = useState(false);
  return (
    <View style={styles.Checkbox}>
        <Checkbox
      status={checked ? 'checked' : 'unchecked'}
      onPress={() => {
        setChecked(!checked);
    }}
    />
    {console.log("checked", checked)}
    </View>
  )
}

export default Checkboxs

const styles = StyleSheet.create({
    Checkbox:{
        alignSelf: 'center'
    },
})