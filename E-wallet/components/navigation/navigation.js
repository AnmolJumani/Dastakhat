import {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';


import LoginScreen from '../../screens/login_screen';
import HomeScreen from '../../screens/home_screen';
import IconButton from '../UI/IconButton';
import { AuthContext } from '../Auth/AuthContext';
import UploadScreen from '../../screens/upload_screen';
import QRScreen from '../../screens/qr_screen';
import DocumentScreen from '../../screens/documents_screen';
import Profile from '../../screens/profile_screen';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../assets/colors/colors';
import Notifications from '../../screens/notifications_screen';
import OrgDropdown from '../../screens/org_dropdown';




Entypo.loadFont();
MaterialCommunityIcons.loadFont();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

async function save(key, value) 
{
    await SecureStore.setItemAsync(key, value);
}
  
async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
    } else {
    alert('No values stored under that key.');
    }
}

function AuthStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen name="LogIn" component={LoginScreen} options={{headerShown: false}} />
        </Stack.Navigator>
    );
}

// function HomeStack(){
//     const authCtx = useContext(AuthContext);

//     return (
//         <Stack.Navigator>
//             <Stack.Screen name="Home" 
//             component={HomeScreen}
//             options={{
//                 headerTitle: "",
//                 headerTransparent: true,
//                 headerRight: ({ tintColor }) => (
//                   <IconButton
//                     icon="exit"
//                     color={tintColor}
//                     size={24}
//                     onPress={authCtx.logout}
//                   />
//                 ),
//               }} />
//               <Stack.Screen name="Upload Documents" 
//                 component={UploadScreen} 
//                 options={
//                     {
//                         headerTransparent:true,
//                         animation: 'slide_from_bottom',
//                     }
//                     }/>
//             <Stack.Screen name="QR_Code" 
//                 component={QRScreen} 
//                 options={
//                     {
//                         headerTransparent:true,
//                         animation: 'flip',
//                     }
//                     }/>
//             <Stack.Screen name="Documents" 
//                 component={DocumentScreen} 
//                 options={
//                     {
//                         headerTitle: "My Documents",
//                         headerTransparent:true,
//                         animation: 'flip',
//                     }
//                     }/>
//         </Stack.Navigator>
//     );
// }


const HomeStack = createNativeStackNavigator();

function HomeScreenStack(){
    const authCtx = useContext(AuthContext);
    const navigation = useNavigation();

    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" 
            component={HomeScreen}
            options={{
                headerTitle: "",
                headerTransparent: true,
                headerRight: ({ tintColor }) => (
                  <IconButton
                    icon="notifications"
                    color={tintColor}
                    size={24}
                    // onPress={()=>{navigation.navigate("Upload Documents");}}
                  />
                ),
              }} />
              <HomeStack.Screen name="Upload Documents" 
                component={UploadScreen} 
                options={
                    {
                        headerTransparent:true,
                        animation: 'slide_from_bottom',
                    }
                    }/>
                <HomeStack.Screen name="Request Credentials" 
                    component={UploadScreen} 
                    options={
                    {
                        headerTransparent:true,
                        animation: 'slide_from_bottom',
                    }
                    }/>

            <HomeStack.Screen name="QR Code" 
                component={QRScreen} 
                options={
                    {
                        headerTransparent:true,
                        headerTitle:"",
                        animation: 'flip',
                    }
                    }/>
            <HomeStack.Screen name="Documents" 
                component={DocumentScreen} 
                options={
                    {
                        headerTitle: "My Documents",
                        headerTransparent:true,
                        animation: 'flip',
                    }
                    }/>
        </HomeStack.Navigator>
    );
}

const ProfileStack = createNativeStackNavigator();

function ProfileScreenStack(){
    const authCtx = useContext(AuthContext);

    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name="Profile_Screen" 
            component={Profile}
            options={{
                headerTitle: "",
                headerTransparent: true,
                headerRight: ({ tintColor }) => (
                  <IconButton
                    icon="exit"
                    color={tintColor}
                    size={24}
                    onPress={authCtx.logout}
                  />
                ),
              }} />
              
        </ProfileStack.Navigator>
    );
}



function MainTabStack() {
    const authCtx = useContext(AuthContext);
    return (
      <Tab.Navigator 
    //   screenOptions={ {headerShown:false, headerTitle:false}}
      tabBarOptions={{
        activeTintColor: colors.purple,
        inactiveTintColor: colors.yellow,
        showLabel: false,
        
      }}>


        <Tab.Screen 
            name=" " 
            options={{tabBarIcon: ({color}) => (<Entypo name="home" size={32} color={color} />),headerShown: false}}
            screenOptions={{ headerShown: false }}
            component={HomeScreenStack} />

        <Tab.Screen 
            name="Documents" 
            options={{tabBarIcon: ({color}) => (<Entypo name="grid" size={32} color={color} />),headerShown: false}} 
            component={DocumentScreen} />
        <Tab.Screen 
            name="Profile" 
            component={ProfileScreenStack} 
            options={{tabBarIcon: ({color}) => (<MaterialCommunityIcons name="account" size={32} color={color} />),headerShown: false}}
            screenOptions={{ headerShown: false }}/>
      </Tab.Navigator>
    );
  }


function Navigation() {
    const authCtx = useContext(AuthContext);
  
    return (
        <NavigationContainer>
            {!authCtx.isAuthenticated && <AuthStack />}
            {authCtx.isAuthenticated && <MainTabStack /> }
        </NavigationContainer>
    );
}

export default Navigation;