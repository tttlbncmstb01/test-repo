import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import colors from "../config/colors"
function AppIndicator({visible=false, style}){
   if(!visible) return null;
   return (
      <View style={[style,styles.container]}>
         <ActivityIndicator style={styles.indicator} color={colors.primary} animating={visible} size='large' />
      </View>
   );
}
const styles = StyleSheet.create({
   container:{
      width:"100%",
      height:"100%",
      position:"absolute",
      top:0,
      left:0,
      right:0,
      backgroundColor:'#fffc',
      justifyContent:"center",
      alignContent:"center",
   },
   indicator:{

   }
})

export default AppIndicator;