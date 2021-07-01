import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppButton from '../components/AppButton';
import Apptext from '../components/Apptext';
import ImageBackgroundScreen from '../components/ImageBackgroundScreen';
import LogoCenter from '../components/LogoCenter';
import colors from '../config/colors';
function Welcome({navigation}){
   return (
      <ImageBackgroundScreen statusBarColor="light">
         <LogoCenter top={30} bottom={50} />
         <View style={styles.textbox}>
            <Apptext style={styles.text}>Tái Sinh Nhan Sắc {"\n"} Lấy Lại Vóc Dáng Hoàn Hảo</Apptext>
            <View style={styles.line}></View>
         </View>
         <View style={styles.bottom}>
            <AppButton title="BẮT ĐẦU !!" onPress={()=>navigation.navigate('Signup')} />
            <AppButton style2={{fontSize:14,margin:3,}} title="Tôi đã có tài khoản" color={colors.transparent} onPress={()=>navigation.navigate('Signin')} />
         </View>
      </ImageBackgroundScreen>
   );
}

const styles = StyleSheet.create({
   container:{
   },
   textbox:{
      position:"absolute",
      top:'38%',
      alignSelf:'center',
      alignItems:'center',
   },
   text:{
      width:'100%',
      textAlign:'center',
      fontSize:24,
      color:'#fff',
      fontWeight:"700",
      letterSpacing:1,
      lineHeight:35,
   },
   line:{
      width:'50%',
      height:4,
      backgroundColor:"white",
      textAlign:'center',
      marginTop:25,
   },
   bottom:{
      position:"absolute",
      width:"100%",
      bottom:0,
      left:20,
      right:20,
      alignSelf:'center',
      alignItems:'center',
   }
});

export default Welcome;