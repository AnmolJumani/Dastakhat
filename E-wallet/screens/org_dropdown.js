// import DropDownPicker from 'react-native-dropdown-picker';

// function OrgDropdown(){
// const [request, setRequest] = useState(false);
//     const [selectedOrg, setOrg] = useState(null);
//     const [open, setOpen] = useState(false);

//     const orgs = [
//         {value: 'HU', label: 'Habib University', icon: () => <Image style = {styles.image} source={require('../assets/HU_logo.png')} />},
//         {value: 'KMC', label: 'KMC', icon: () => <Image style = {styles.image} source={require('../assets/kmc_logo.jpeg')} />}
//     ];
// return(
//     <View>
//         <Modal animationType="slide" transparent={true} visible={request}>
//     <View style={styles.centeredView}>

//         <View style={styles.modalView}>
//             <View style={{ paddingHorizontal: 20, paddingVertical: 12, flexDirection: 'row', justifyContent: 'space-between' }}>
//                 <DropDownPicker
//                     open={open}
//                     dropDownContainerStyle={{ margin: 20, overflow: 'hidden' }}
//                     placeholder="Select Organization"
//                     setOpen={() => { setOpen(!open); } }
//                     value={selectedOrg}
//                     items={orgs}
//                     setValue={val => setOrg(val)}
//                     dropDownDirection="BOTTOM" />
//             </View>

//             <TouchableOpacity
//                 onPress={() => { setRequest(false); } }
//                 style={styles.button}
//             >
//                 <Text>Request</Text>
//             </TouchableOpacity>
//         </View>
//     </View>
// </Modal>
// //Button:::
//     <TouchableOpacity
//         style={styles.upldBtn}
//         onPress={() => {
//             setRequest(true);
//         } }
//     >
//         <Text>
//             Request Credentaials
//         </Text>
//     </TouchableOpacity>

//     </View>

// )
   
// };

// export default OrgDropdown;

// const styles = StyleSheet.create({
//     modalView: {
//         margin: 20,
//         height:200,
//         backgroundColor: 'white',
//         borderRadius: 20,
//         padding: 20,
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: {
//           width: 0,
//           height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5,
//       },
//       centeredView: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     image: {
//         resizeMode: 'contain',
//         width: 50,
//         height: 35,
//     },
// })