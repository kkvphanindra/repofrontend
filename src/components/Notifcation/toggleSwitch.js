import React, {useState, useEffect} from 'react';
import { Text, View , StyleSheet, Alert} from 'react-native';
import {Switch} from 'react-native-paper' ;

const ToggleSwitch = (props) =>{
	const [switchOn, setSwitchOn] = useState(false)
	const toggleSwitch = () => {setSwitchOn(previousState => !previousState)};
	console.log("object",switchOn)
	return(
		<View style ={styles.container}>
			<Text style={styles.text}>{props.psId}</Text>
			<Text style={styles.text}>{props.psItemId}</Text>
			<Switch 
			value={switchOn} 
			thumbColor='#5d6afe'
			trackColor={{false: '#dbdbdb', true: '#5d6afe'}}
			onValueChange={(e) => toggleSwitch(e)}/>
			{/* onValueChange={props.onValueChange}/> */}
		</View>
	)
}

export default ToggleSwitch ;

const styles = StyleSheet.create({
	container:{
		paddingHorizontal:10,
		flexDirection:'row',
		// backgroundColor:'yellow'
		// justifyContent:'space-around'
	},
	text: {
		fontSize: 15,
		color: '#000',
		// backgroundColor: 'pink',
		margin: '5%',
		// width: '75%',
		fontWeight: '500',
		alignSelf: 'center',
	  },
})