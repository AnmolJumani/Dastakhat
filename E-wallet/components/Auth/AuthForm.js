import {useState, useContext} from 'react';
import { Alert, StyleSheet, Text, View, Image, Button, TextInput, TouchableOpacity } from 'react-native';
import CredentialsInput from '../UI/CredentialsInput';
import colors from '../../assets/colors/colors';

import LoadingOverlay from '../UI/LoadingOverlay';
import { AuthContext } from './AuthContext';

const AuthForm = () => {

    // function login(email, password)
    // {
    //     if ((email == "wasiq@gmail.com")&&(password=="12345678")){
    //         return {token: "12345678", username: email};
    //     }
    //     else{
    //         throw "ooof";
    //     }
    // }

    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const authCtx = useContext(AuthContext);

    async function loginHandler({ email, password }) {
        // setIsAuthenticating(true);
        try{
            
            const res = await fetch("http://localhost:8003/loginuser", {
                method: "POST",
                headers:{
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify({
                    "email_id": email,
                    "password": password})
            })
            const response = await res.json();
            // console.log('response : ',response);
            if(res.status === 404 || res.status === 422){
                console.log("Im in eroorrrrrrrrrrrrrrrrrrrrrr")
                console.log(response);
                alert(res.status);
              }else{
                alert(res.status);
                alert(response.message);
                // console.log("Theres no errorrrrrrrr");
                // console.log(response.message);
                console.log(email);
                authCtx.authenticate(email, response.token);           
              }
        }catch(e){
            console.log(e);  // setIsAuthenticating(false);
        }
        // try {
        // let {token, username} = login(email, password);
        // authCtx.authenticate(username,token);
        // }
        //  catch (error) {
        //     console.log(error);
        // Alert.alert(
        //     'Authentication failed!',
        //     'Could not log you in. Please check your credentials or try again later!'
        // );
        // setIsAuthenticating(false);
        // }
    }


    if (isAuthenticating) {
        return <LoadingOverlay message="Logging you in..." />;
    }
        
    const [credentialsInvalid, setCredentialsInvalid] = useState({
        email: false,
        password: false,
      });
    
      function submitHandler(credentials) {
        let { email, password } = credentials;
    
        email = email.trim();
        password = password.trim();
    
        const emailIsValid = email.includes('@');
        const passwordIsValid = password.length > 6;
    
        if (
          !emailIsValid ||
          !passwordIsValid
        ) {
          Alert.alert('Invalid input', 'Please check your entered credentials.');
          setCredentialsInvalid({
            email: !emailIsValid,
            password: !passwordIsValid,
          });
          return;
        }
        else{
            loginHandler({email, password})
            setCredentialsInvalid({
                email: false,
                password: false,
              });
        }
    }

    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    const {
        email: emailIsInvalid,
        password: passwordIsInvalid,
    } = credentialsInvalid;

    function updateInputValueHandler(inputType, enteredValue) {
        switch (inputType) {
        case 'email':
            setEnteredEmail(enteredValue);
            break;
        case 'password':
            setEnteredPassword(enteredValue);
            break;
        }
    }

    function onSubmit() {
        submitHandler({
          email: enteredEmail,
          password: enteredPassword,
        });
    }
    
    return (
        <View style={styles.container}>

            <CredentialsInput 
                label="Invalid Username"
                placeholder="Username"
                onUpdateValue={updateInputValueHandler.bind(this, 'email')}
                keyboardType="email-address"
                secure={false}
                isInvalid={emailIsInvalid}
            />

            <CredentialsInput 
                label="Invalid Password"
                placeholder="Password"
                onUpdateValue={updateInputValueHandler.bind(this, 'password')}
                secure={true}
                isInvalid={passwordIsInvalid}
            />


            <TouchableOpacity>
                <Text style = {styles.forgot_button}>Forget Password? </Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style = {styles.loginBtn} 
            onPress={onSubmit}>
                <Text>LOGIN</Text>
            </TouchableOpacity>
        </View>
    );


}

const styles = StyleSheet.create({
    container:{
        width:"100%", 
        alignItems: "center", 
        justifyContent:"center"
    },
    forgot_button: {
    height: 30,
    marginBottom: 30,
    },
    loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: colors.purple,
    },
  });

export default AuthForm