import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native'
import React,{useState} from 'react'
import { Checkbox } from 'react-native-paper';

const Checkboxs = (props) => {
    const [checked, setChecked] = useState(false);
  return (
    <View style={styles.Checkbox}>
      <TouchableOpacity style={styles.iconButton} onPress={()=>{setChecked(!checked)}}>
          {checked?
          <Image 
          source={require('../../assets/icons/png/icon-done.png')}
          style={styles.icon}
          />
          :
          <Image 
          source={require('../../assets/icons/png/icon-done-2.png')}
          style={styles.icon}
          />
        }
        </TouchableOpacity>
    {console.log("checked", checked,props.name)}
    </View>
  )
}

export default Checkboxs

const styles = StyleSheet.create({
  Checkbox:{
    alignSelf: 'center'
  },
  iconButton:{
    alignSelf: 'center',
    marginLeft: '5%',
    marginRight: '5%'
  },
  icon: {
    height: 30,
    width: 30,
    borderRadius: 100/2,
  },
})