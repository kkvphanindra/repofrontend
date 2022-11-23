import React, {useState, useEffect} from 'react';
import { Text, View , StyleSheet, Alert} from 'react-native';
import { Switch} from 'react-native-paper' ;

const ToggleSwitch = ({title}) =>{
	const [switchOn, setSwitchOn] = useState(false)

	return(
		<View style ={styles.container}>
			<Text>{title}</Text>
			<Switch value={switchOn} onValueChange={() => {
				setSwitchOn(!switchOn)
				Alert.alert("Switch on : " + !switchOn)} }/>
		</View>
	)
}

export default ToggleSwitch ;

const styles = StyleSheet.create({
	container:{
		padding:45,
		flexDirection:'row',
		justifyContent:'space-around'
	}
})