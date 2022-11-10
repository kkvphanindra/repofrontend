import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    Pressable,
    View,
    TouchableHighlight,
    FlatList,
    SectionList
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import data from '../../mock.json';

const Interests = ({navigation}) => {
  const [BtnColor, setBtnColor] = useState("");

  const ListItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.title}</Text>
      </View>)
  }
  const SECTIONS = [
    {
      data: [
        {
          "id": "1",
          "title": "Arts"
         },
         {
          "id": "2",
          "title": "Dancing"
         },
         {
          "id": "3",
          "title": "Playing Games"
         },
         {
          "id": "4",
          "title": "Cricket"
         },
         {
          "id": "5",
          "title": "Singing"
         },
         {
          "id": "6",
          "title": "Reading Books"
         },
         {
          "id": "7",
          "title": "Food"
         },
         {
          "id": "8",
          "title": "Movies"
         },
         {
          "id": "9",
          "title": "Friends"
         },
         {
          "id": "10",
          "title": "Making Friends"
         }
      ]
    }
    
  ]
    return (
        <View style={styles.container}>
          <Pressable
                onPress={() => navigation.navigate('groups')}
                style={styles.skipContainer}>
                <Text style={styles.skipText}>
                    Skip
                </Text>
            </Pressable>
            <View style={styles.wrapper}>
                <Text style={styles.title}>Select 5 Interests</Text>
                <View style={styles.filterContainer}>
                  <SafeAreaView style={{ flex: 1 }}>
                      <SectionList
                        contentContainerStyle={{ paddingHorizontal: 10 }}
                        stickySectionHeadersEnabled={false}
                        sections={SECTIONS}
                        renderSectionHeader={({ section }) => (
                          <FlatList
                            horizontal
                            data={section.data}
                            renderItem={({ item }) => <ListItem item={item} />}
                            showsHorizontalScrollIndicator={true}
                          />
                        )}
                        renderItem={({ item, section }) => {
                          return null;
                        }}
                      />
                  </SafeAreaView>
                </View>
                <View style={styles.listContainer}>
                  {
                    data.interests && data.interests.map((e,i) => {
                      return <TouchableHighlight
                      key={i}
                      style={styles.listBox}
                      activeOpacity={1}
                      underlayColor="#FB8D33"
                      onPress={() => setBtnColor('#FFF')}>
                      <Text style={styles.listText}>{e.title}</Text>
                    </TouchableHighlight>
                    })
                  }
                </View>
            </View>
            <Pressable
                onPress={() => navigation.navigate('groups')}
                style={styles.buttonContainer}>
                <LinearGradient style={styles.buttonWrapper} colors={['#5E6BFF', '#212FCC']}>
                    <Text style={styles.buttonText}>
                        Continue
                    </Text>
                </LinearGradient>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#FFF',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      paddingTop: 60
  },
  wrapper: {
      maxWidth: '80%'
  },
  skipContainer: {
    borderColor: '#505EF4',
    borderWidth: 1,
    borderRadius: 5,
    width: 91,
    height: 34,
    zIndex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFF',
    position: 'absolute',
    right: 35,
    top: 20
},
skipText: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    color: '#5B67CA',
    lineHeight: 20,
    textAlign: 'center'
},
  title: {
      fontFamily: 'Inter',
      fontSize: 32,
      fontWeight: '600',
      color: '#2C2C2C',
      lineHeight: 40,
      textAlign: 'center',
      paddingTop: 20,
      paddingBottom: 20
  },
  filterContainer:{
    height: 60,
    borderBottomColor: '#D2D1D7',
    borderBottomWidth: 0.5,
  },
  itemContainer:{
    backgroundColor: '#8091E6',
    borderRadius: 15,
    height: 31,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    marginHorizontal: 5
  },
  itemText:{
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '600',
    color: '#FFF',
    lineHeight: 18,
    textAlign: 'center',
  },
  listContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 20
  },
  listBox:{
    backgroundColor: '#F7F7F7',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginVertical: 5,
    marginHorizontal: 2

  },
  listText:{
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    lineHeight: 20,
    textAlign: 'center',
  },
  buttonContainer: {
      width: '80%',
      height: 60,
      marginTop: 'auto',
      marginBottom: 40
  },
  buttonWrapper: {
      width: '100%',
      height: '100%',
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center'
  },
  buttonText: {
      fontFamily: 'Inter',
      fontSize: 16,
      fontWeight: '600',
      color: '#FFF',
      lineHeight: 20,
      textAlign: 'center'
  }
})

export default Interests;