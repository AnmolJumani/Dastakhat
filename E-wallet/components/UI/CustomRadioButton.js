import {View, Text, StyleSheet} from 'react-native';
import {RadioButton} from 'react-native-paper';

function CustomRadioButton({
    title,
    isChecked,
    checkFunction,
    refresh
}){
    
    
    return <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <RadioButton
        value= {title}
        status={ isChecked === title ? 'checked' : 'unchecked' }
        onPress={() => {
            checkFunction(title)
            refresh(oldkey => oldkey+1)
        }}
        />
    </View>
}

export default CustomRadioButton;

const styles = StyleSheet.create({
    container: {
        alignItems: "center", // ignore this - we'll come back to it
        justifyContent: "center", // ignore this - we'll come back to it
        flexDirection: "row"
      },
    title: {
        fontSize:12,
        padding:5
    }
});