import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { Divider } from 'react-native-paper';
import colors from '../../assets/colors/colors';

function VerifyDocument(url, type){
    const [selectedOrg, setOrg] = useState(null);
    const [open, setOpen] = useState(false);

    const orgs = [
        {value: 'HU', label: 'Habib University', icon: () => <Image style = {styles.image} source={require('../../assets/HU_logo.png')} />},
        // {value: 'KMC', label: 'KMC', icon: () => <Image style = {styles.image} source={require('../../assets/kmc_logo.jpeg')} />}
    ];


    async function sendRequest(org){
        try{
            const name = await AsyncStorage.getItem('username');
            const res = await fetch("http://localhost:8003/requestverification", {
                method: "PATCH",
                headers:{
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify({
                    "email_id": name,
                    "url": url.url,
                    "organization": org})
            })
            const response = await res.json();
            // console.log('response : ',response);
            if(res.status === 404 || res.status === 422){
                console.log("Im in eroorrrrrrrrrrrrrrrrrrrrrr")
                console.log(response);
            }
            else{
                console.log(response);
            }
        }catch(e){
            console.log(e);
        }
        console.log(url.url);
        console.log(org);
    }

    try{
    if (url.type=="Personal Uploads"){
        return(
            <View style={styles.container}>
                <Divider style={{color:colors.black, width:'90%', height:2, marginTop:40}} bold={true}/>
                <View style={{paddingHorizontal:20,paddingVertical:12,flexDirection:'row',justifyContent:'space-between', marginTop:20 }}>
                    <DropDownPicker
                        open={open}
                        dropDownContainerStyle={{overflow:'hidden'}}
                        placeholder="Select Organization"
                        setOpen={()=>{setOpen(!open);}}
                        value={selectedOrg}
                        items={orgs}
                        setValue={val => setOrg(val)}
                        dropDownDirection="BOTTOM"
                    />
                </View>
                <TouchableOpacity
                    style={styles.upldBtn}
                    onPress = {()=>{
                        sendRequest(selectedOrg);
                    }}
                    >
                    <Text>
                        Request Verification
                    </Text>
                </TouchableOpacity>
            </View>);

    }
    else{
        return(
            <View style={styles.container}>
                <Text style={styles.mainText}>
                    {"The file is verified from "}
                    {url.type}
                </Text>
                <FontAwesome5 name="check-circle" size = {80} color={colors.purple}/>
            </View>
        );
    }}
    catch(e){console.log(e);}
}

export default VerifyDocument;

const styles = StyleSheet.create({
    container: {
        width:"80%",
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mainText: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 30,
        margin: 30,
    },
    upldBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10,
        backgroundColor: "lightgrey",
    },
    namebox: {
        margin : 30,
        width: "70%",
        borderBottomWidth: 1,
        borderBottomColor : "purple",
    },
    upldBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom:15,
        backgroundColor: colors.purple,
    },
    image: {
        resizeMode: 'contain',
        width: 50,
        height: 35,
    },
  });
