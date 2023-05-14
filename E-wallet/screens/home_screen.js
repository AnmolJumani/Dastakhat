import { StyleSheet, Text, TouchableOpacity, View, Modal, Image, FlatList} from 'react-native';
import { Divider } from 'react-native-paper';
import { Link, useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-web';
import Docs from '../assets/data/docs_list';
import colors from '../assets/colors/colors';
import {firebase} from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomList from '../components/UI/CustomList';
import CustomRadioButton from '../components/UI/CustomRadioButton';

function HomeScreen(){
    const navigation = useNavigation();
    const [request, setRequest] = useState(false);
    const [selectedOrg, setOrg] = useState(null);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [selectedDoc, setSelectedDoc] = useState();
    const [fetching, setFetching] = useState(true);
    const [checked, setChecked] = useState("Verified");
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {

        async function listFiles(){
            setData([]);  
            const name = await AsyncStorage.getItem('username');
            const l = await firebase.storage().ref(name+'/').list();
            l.prefixes.forEach(async (item) => {
                const z = await firebase.storage().ref(item.fullPath+'/').list();
                var lst = [];
                z.items.forEach((file) => {
                    lst.push({key: Math.random().toString(), text: file.name, path:file.fullPath});
                });
                setData((currentData) => [...currentData, 
                    {title: item.name, data:lst}]);
                });
            setFetching(false);
        }
        
        setFetching(true);
        listFiles();

    }, [refreshKey]);


    const orgs = [
        {value: 'HU', label: 'Habib University', icon: () => <Image style = {styles.image} source={require('../assets/HU_logo.png')} />},
        // {value: 'KMC', label: 'KMC', icon: () => <Image style = {styles.image} source={require('../assets/kmc_logo.jpeg')} />}
    ];


    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={request}
                onRequestClose={()=>setRequest(false)}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <View style={{paddingHorizontal:20,paddingVertical:12,flexDirection:'row',justifyContent:'space-between' }}>
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
                        onPress={async ()=>{
                            const name = await AsyncStorage.getItem('username');
                            console.log(name);
                            try{
                                const name = await AsyncStorage.getItem('username');
                                const res = await fetch("http://localhost:8003/requestcredentials", {
                                    method: "PATCH",
                                    headers:{
                                        "Content-Type": 'application/json',
                                    },
                                    body: JSON.stringify({
                                        "email_id": name})
                                })
                                const response = await res.json();
                                console.log(name)
                                console.log('response : ',response);
                                if(res.status === 404 || res.status === 422){
                                    console.log("Im in eroorrrrrrrrrrrrrrrrrrrrrr")
                                    console.log(response.status);
                                }
                                else{
                                    console.log(response);
                                    setRequest(false);
                                }
                            }catch(e){
                                 console.log(e);
                            }
                            
                            setRequest(false);}}
                        style={styles.button}
                        >
                        <Text>Request</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View>
            <Image
            source={require("../assets/dt_logo.png")}
            style = {styles.LogoImage}
            />
            </View>

            <View>
            <View style = {styles.introWrapper}>
                    <Text styles={styles.introTitle}> Hello there!</Text>

                    {/* //COMPLETE HEREEE */}

                </View>
            </View>
            <Divider style={{color:colors.black, width:'90%', height:2, marginTop:20}} bold={true}/>
            <View style={{width:'100%',paddingTop:5, paddingRight:15,flexDirection:'row', justifyContent:'flex-end'}}>
                <CustomRadioButton refresh = {setRefreshKey} isChecked={checked} checkFunction={setChecked} title={"Not Verified"}/>
                <CustomRadioButton refresh = {setRefreshKey} isChecked={checked} checkFunction={setChecked} title={"Verified"}/>
            </View>
            <CustomList fetching={fetching} data={data} type={checked}/>
            <Divider style={{color:colors.black, width:'90%', height:2}} bold={true}/>
            <TouchableOpacity
                style={styles.upldBtn}
                onPress = {()=>{navigation.navigate("Upload Documents");}}
                >
                <Text>
                    Upload Documents
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.upldBtn}
                onPress = {()=>{
                    setRequest(true);
                }}
                >
                <Text>
                    Request Credentials
                </Text>
            </TouchableOpacity>
            
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    favItemsWrapper:{
        textAlign:'right',
        margin:15,
        padding:5,
        height:180,
    },

    favItemText:{
        color: colors.black,
        paddingTop:100,
        padding:20,
        fontSize:14,
        margin:5,
        backgroundColor: colors.yellow,
        textAlign: "left",
        borderRadius:5,
        width:110
    },
    mainText:{
        fontWeight: 'bold',
        fontSize: 20,
    },


    upldBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom:15,
        backgroundColor: colors.purple,


    },

    modalView: {
        margin: 20,
        height:200,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
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
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        resizeMode: 'contain',
        width: 50,
        height: 35,
    },

    introWrapper:{
        marginHorizontal: 20,
        marginTop: 0,
        flexDirection: 'row',
        height: 150,
        width: 300,
        padding:20,
        backgroundColor: colors.purple,
        // flex:1,
        borderRadius:20,
        fontFamily:'Lato'
    },

    introTitle:{
        fontSize: 32,
        flexDirection: 'row',
        height: 100,
        padding:20,
        backgroundColor: colors.purple,
        // flex:1
    },
    LogoImage:{
        resizeMode:'contain',
        height: 150,
        width:150

    }
  });
