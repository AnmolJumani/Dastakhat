import { StyleSheet, Text, View, Image, Button, TextInput, TouchableOpacity } from 'react-native';
import AuthForm from '../components/Auth/AuthForm';

function LoginScreen(){
    return (
        <View style={styles.container}>
            
            <Image
            source={require("../assets/dt_logo.png")}
            style = {styles.image}
            />
            <View style = {styles.mainView}>
                <Text style = {styles.mainText}>
                    Hi, Welcome!
                </Text>
                <Text style = {styles.mainText}>
                    Login to your Identity Wallet
                </Text>
            </View>

            <AuthForm/>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
        resizeMode: 'contain',
        width: 400,
        height: 300,
        // marginBottom: 40,
    },
    mainView: {
        marginBottom: 40,
    },
    mainText: {
        fontWeight: 'bold',
        fontSize: 20,
    },
  });

export default LoginScreen;