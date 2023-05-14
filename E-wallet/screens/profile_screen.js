import React from 'react';
import {View, Text, Button, StyleSheet, Image, ScrollView, ImageBackground} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../assets/colors/colors';
// import styles from './assets/styles/styles/styles'

const Profile = () => {
    return (
        <View>
            <FontAwesome name="user-circle-o" size={150} color={colors.purple}  style={styles.profileImage}/>
            <Text style={styles.profileText}> Wasiq Memon</Text>
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

export default Profile;