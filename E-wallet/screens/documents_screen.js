import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, StyleSheet, Text, View, Touchable, TouchableOpacity, Modal, ActivityIndicator, SectionList} from "react-native";
import {firebase} from '../config/firebase';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import colors from "../assets/colors/colors";

function DocumentScreen() {

    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [newdata, setnewData] = useState([]);
    const [selectedDoc, setSelectedDoc] = useState();
    const [fetching, setFetching] = useState(true);
    const [loadingURL, setloadingURL] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {

        async function listFiles(){
            setData([]);
            setnewData([]);  
            const name = await AsyncStorage.getItem('username');
            const l = await firebase.storage().ref(name+'/').list();
            l.prefixes.forEach(async (item) => {
              const z = await firebase.storage().ref(item.fullPath+'/').list();
              var lst = [];
              z.items.forEach((file) => {
                lst.push({key: Math.random().toString(), text: file.name, path:file.fullPath});
                });
              setnewData((currentData) => [...currentData, 
                  {title: item.name, data:lst}]);
              });
            // l.items.forEach((item) => {
            //     setData((currentData) => [...currentData, 
            //         {key: Math.random().toString(), text: item.name}]);
            //     });
            
            setFetching(false);
        }
        listFiles();

    }, [refreshKey]);



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

    const myItemSeparator = () => {
        return <View style={{ height: 1, backgroundColor: colors.yellow, marginHorizontal:10}} />;
        };
    
    const myListEmpty = () => {
        return (
        <View style={{ flex:1, justifyContent:"center", alignItems: "center" }}>
        <Text style={styles.item}>Fetching Data.....</Text>
        </View>
        );
    };

    // if(fetching) return <LoadingOverlay message={'Fetching Docments'}/>
    // console.log(newdata[0]);
    return (
    <SafeAreaView style={styles.container}>
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
        <SectionList
        sections={newdata}
        refreshing={fetching}
        onRefresh={()=>setRefreshKey(oldkey => oldkey+1)}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={()=>{
                setSelectedDoc(item.text);
                getURL(item.path);
            }}>
            <Text >{item.text}</Text>
          </TouchableOpacity>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
        ItemSeparatorComponent={myItemSeparator}
        ListEmptyComponent={myListEmpty}
        />
    </SafeAreaView>
    );
    }

//styles to see the data more clearly

const styles = StyleSheet.create({
  container: {
    padding: 25,
    marginTop: 50,
    flex: 1,
  },
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  header: {
    fontSize: 24,
    color: colors.purple
  },
  title: {
    fontSize: 24,
  },
});

export default DocumentScreen;