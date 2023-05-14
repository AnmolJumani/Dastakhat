import {View, FlatList, StyleSheet, Text, ActivityIndicator, TouchableOpacity, Modal} from 'react-native';
import colors from '../../assets/colors/colors';
import { useNavigation } from '@react-navigation/native';
import {firebase} from '../../config/firebase';
import { useState } from 'react';


function CustomList({
    fetching,
    type,
    data
    }){
    
        
    const navigation = useNavigation();
    const [loadingURL, setloadingURL] = useState(false);

    async function getURL(filePath){
        setloadingURL(true);
        const n = await firebase.storage().ref(filePath).name;
        const p = await firebase.storage().ref(filePath).parent.name;
        const u = await firebase.storage().ref(filePath).getDownloadURL();
        console.log(u, p);
        if (!loadingURL){
            setloadingURL(false);
            navigation.navigate('QR Code', { url : u, type: p, name: n})
        };
    }
    
    if (fetching) {return <ActivityIndicator size="large" />}


    return(
        <View style={styles.favItemsWrapper}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={loadingURL}
                >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Loading QR Code</Text>
                    <ActivityIndicator size="large"/>
                </View>
                </View>
            </Modal>
            <FlatList 
            keyExtractor={(key,index) => {
                return key.key
            }}
            data={data} 
            renderItem = {({item}) => {
                let items = [];
                switch(type){
                    case "Verified":
                        if (item.title != "Personal Uploads"){
                            if( item.data) {
                                items = item.data.map(row => {
                                    return (
                                        <TouchableOpacity 
                                        onPress={()=>{
                                            getURL(row.path);
                                        }}>
                                        <Text style={styles.favItemText} numberOfLines={1}> 
                                            {row.text}
                                        </Text>
                                        </TouchableOpacity>);
                                })}
                            return (
                                <View style={{flexDirection:'row'}}>
                                    {items}
                                </View>
                            );
                        }
                        break;
                    case "Not Verified":
                        if (item.title == "Personal Uploads"){
                            if( item.data) {
                                items = item.data.map(row => {
                                    return( 
                                        <TouchableOpacity 
                                            onPress={()=>{
                                                getURL(row.path);
                                            }}>
                                            <Text style={styles.favItemText} numberOfLines={1}> 
                                                {row.text}
                                            </Text>
                                        </TouchableOpacity>);
                                })}
                            return (
                                <View style={{flexDirection:'row'}}>
                                    {items}
                                </View>
                            );
                        }
                        break;
                }}
            }
                
                horizontal
                showsHorizontalScrollIndicator={false}
                />

            </View>);
}

export default CustomList;

const styles = StyleSheet.create({
        favItemsWrapper:{
        textAlign:'right',
        margin:10,
        padding:5,
        height:180,
    },
    favItemText:{
        color: colors.black,
        backgroundColor: colors.yellow,
        paddingTop:100,
        padding:20,
        fontSize:14,
        margin:5,
        textAlign: "left",
        borderRadius:5,
        width:110
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },  
});
