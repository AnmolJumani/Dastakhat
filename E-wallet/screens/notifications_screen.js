import React from 'react';
import {View, Text, Button, StyleSheet, Image, ScrollView, ImageBackground} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../assets/colors/colors';

const Notifications = () => {
    return (
        <View>
            <Text style={styles.profileText}> Notifcatons</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    profileImage:{
        alignSelf:"center",
        margin:20,
        marginTop: 70,
        padding:5,
    },
    profileText:{
        alignSelf:"center",
        margin:20,
        marginTop: 10,
        padding:5,
        // fontFamily:'Lato'
        
    }
})

export default Notifications;