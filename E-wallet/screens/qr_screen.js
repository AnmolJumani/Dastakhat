import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, StyleSheet, View} from 'react-native';
import colors from '../assets/colors/colors';
import VerifyDocument from '../components/UI/VerifyDocument';
import { useState } from 'react';

function QRScreen({route}) {
    const url = route.params.url;
    const type = route.params.type;
    const name = route.params.name;

    
    return(
        <View style={styles.container}>
            <Text style={styles.mainText}>
                {"Filename: "}
                {name}
            </Text>
            <QRCode
                size={250}
                logo={require("../assets/dt_logo.png")}
                logoBackgroundColor="white"
                logoBorderRadius={75}
                value = {url}
                />
            <VerifyDocument url={url} type={type}/>
        </View>
    );
}

export default QRScreen;

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
        marginBottom: 30,
        margin: 30,
    },
});
