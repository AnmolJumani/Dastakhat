import { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, TouchableOpacity, Alert, ActivityIndicator, Modal } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import {firebase} from '../config/firebase';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


function UploadScreen(){
    const navigation = useNavigation();
    const [file, setFile] = useState(null);
    const [newName, setnewName] = useState('');
    const [uploading, setUploading] = useState(false);
    const [fileName, setfileName] = useState('File not picked yet!');

    async function getFile() {
        try{
            const res = await DocumentPicker.getDocumentAsync({copyToCacheDirectory: false});
            const source = {uri : res.uri};
            
            setFile(source);
            setfileName(res.name);
            
            console.log(res.type +" "+ res.mimeType);
            console.log(res.uri);
        }
        catch(error){
            console.log(error);
        }
    }

    async function uploadFile(){
        // setUploading(true);
        const response = await fetch(file.uri);
        const blob = await response.blob();
        const name = await AsyncStorage.getItem('username');
        var customName = "";
        if (newName == "") {customName = fileName;}
        else {customName=newName;} 
        var ref = firebase.storage().ref().child(name+ '/Personal Uploads/' + customName).put(blob);
            
        try {
            await ref;
            setUploading(false);
        }
        catch (error) {
            console.log(error);
        }

        if (!uploading){
            const u = await firebase.storage().ref(name+'/Personal Uploads/' + customName).getDownloadURL();
            console.log(u);
            Alert.alert('File Uploaded');
        }
    }

    async function getURL(){
        if(file){
            setUploading(true);
            await uploadFile();
            if (!uploading)
                navigation.goBack();}
        else {Alert.alert('File not Selected!');}
    }


    return (
        <View style={styles.container}>
            <FontAwesome5 name="file-upload" size = {80} color="black"/>
            <Modal
                animationType="slide"
                transparent={true}
                visible={uploading}
                >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Uploading File....</Text>
                    <ActivityIndicator size="large"/>
                </View>
                </View>
            </Modal>

            <TouchableOpacity
                style={styles.upldBtn}
                onPress = {getFile}>
                <Text>
                    Select File from Device
                </Text>
            </TouchableOpacity>
            <TextInput
                placeholder='Give a filename'
                onChangeText={name => setnewName(name)}
                style={styles.namebox}
            />
            <TextInput
                value={fileName}
                style={styles.namebox}
                editable={false}
            />
            <TouchableOpacity
                style={styles.upldBtn}
                onPress = {getURL}
                >
                <Text>
                    Upload
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default UploadScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mainText: {
        fontWeight: 'bold',
        fontSize: 20,
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
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
  });
