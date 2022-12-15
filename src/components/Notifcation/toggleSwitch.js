import React, {useState, useEffect} from 'react';
import { Text, View , StyleSheet, Alert, Pressable} from 'react-native';
import {Switch} from 'react-native-paper' ;

const ToggleSwitch = (props) =>{
	const [switchOn, setSwitchOn] = useState(false)
	const toggleSwitch = (onid) => {setSwitchOn(previousState => !previousState), console.log("onp", onid)}
	return(
		<View style ={styles.container}>
			<Switch 
			value={switchOn} 
			thumbColor='#5d6afe'
			trackColor={{false: '#dbdbdb', true: '#5d6afe'}}
			onValueChange={() => {toggleSwitch(props.id)}}/>
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
		backgroundColor: 'pink',
		marginTop: '15%',
		// width: '75%',
		fontWeight: '500',
		alignSelf: 'center',
	  },
	  pressable:{
		//   backgroundColor: 'red'
	  },
})