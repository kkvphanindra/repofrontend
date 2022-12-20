import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    Pressable,
    View,
    Dimensions,
    Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const height = Dimensions
    .get('window')
    .height;

const ContactList = ({data}) => {
    // console.log("item", item)
    
    return (
        <ScrollView style={styles.container}>
<View style={styles.container}>
                    {data.length && data.map((e, i) => {
                        // console.log("item", e.phoneNumbers)
                        return (
                            <View
                                style={styles.listContainer}
                                key={e
                                ?.recordID}>
                                <Image
                                    style={styles.imageContainer}
                                    source={{
                                    uri: e
                                        ?.thumbnailPath
                                }}/>
                                <View style={styles.contactWrapper}>
                                <Text style={styles.contactName}>{e?.displayName ? e?.displayName: ''}</Text>
                        
                                </View>
                                <Pressable onPress={() => navigation.navigate('')} style={styles.smallButton}>
                                    <Text style={styles.smallButtonText}>Invite</Text>
                                </Pressable>
                            </View>
                        )
                    })
                }
                </View>
        </ScrollView>
                
            
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
        
    },
    
});

export default ContactList;