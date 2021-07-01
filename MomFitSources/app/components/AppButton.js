import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import colors from "../config/colors";
function AppButton({ title, onPress, color = "primary", style,style2, top = 0, bottom = 0, transform="none", fontweight="normal" }){
   return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors[color] }, style, {marginTop:top,marginBottom:bottom}]}
        onPress={onPress}
      >
        <Text style={[styles.text,style2,{textTransform:transform,fontWeight:fontweight}]}>{title}</Text>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
   button: {
     borderRadius: 10,
     width: "100%",
     justifyContent: "center",
     alignItems: "center",
   },
   text: {
     color: "#fff",
     padding: 12,
     fontSize: 20,
     letterSpacing:1,
   },
 });

export default AppButton;