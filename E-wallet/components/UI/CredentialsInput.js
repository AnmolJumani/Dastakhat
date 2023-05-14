import { View, Text, TextInput, StyleSheet } from 'react-native';

function CredentialsInput({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  placeholder,
  isInvalid,
}) {
  return (
    <View style={styles.container}>
        <View style={[styles.inputView, isInvalid && styles.inputInvalid]}>
        <TextInput
            style={styles.inputText}
            autoCapitalize={false}
            keyboardType={keyboardType}
            secureTextEntry={secure}
            onChangeText={onUpdateValue}
            placeholder={placeholder}
        />
        </View>
        {isInvalid && (
        <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
            {label}
        </Text>
        )}
    </View>
  );
}

export default CredentialsInput;

const styles = StyleSheet.create({
    container:{
        width:"100%", 
        alignItems: "center", 
        justifyContent:"center"
    },
    label: {
    color: 'white',
    marginBottom: 4,
    },
    labelInvalid: {
    color: "red",
    },
    inputInvalid: {
    borderColor: "red",
    marginBottom: 0
    },
    inputView: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 30,
    marginBottom: 20,
    width: "70%",
    height: 45,
    alignItems: "center",
    },
    inputText: {
    width:"100%",
    height: 50,
    flex: 1,
    padding: 10,
    alignItems: "center",
    }
});