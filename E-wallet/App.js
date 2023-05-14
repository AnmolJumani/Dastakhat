import { StyleSheet } from 'react-native';
import Navigation from './components/navigation/navigation';
import AuthContextProvider from './components/Auth/AuthContext';
// import styles from './assets/styles'

export default function App() {
    return (
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider> 
    );
}

const styles = StyleSheet.create({});

