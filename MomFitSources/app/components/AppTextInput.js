import React from 'react';
import { View, StyleSheet, Text, TextInput, Keyboard } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
import colors from '../config/colors';
function AppTextInput({ icon, title, subtext,suffix,typeSecond,styleSecond, ...otherProps }){
    if(suffix == ""){
      suffix=null;
    }
    return (
        <View>
            {typeSecond == 'yes'?(
              <>
              <View style={[styles.box,styleSecond]}>
                {title && <Text style={[styles.text2,styles.fixPosition]}>{title}</Text>}
                <Text style={[styles.fixPosition,{paddingRight:10}]}>:</Text>
                <View style={styles.container2}>
                  <TextInput style={[styles.startfromtop,defaultStyles.text2]} onSubmitEditing={Keyboard.dismiss} {...otherProps} />
                  {suffix && <Text style={styles.suffix2}>{suffix}</Text>}
                </View>
              </View>
              {subtext && <Text style={styles.subtext}>{subtext}</Text>}
              </>
            ):(
              <>
              {title && <Text style={styles.text}>{title}</Text>}
              <View style={styles.container}>
              <MaterialCommunityIcons
                  name={icon}
                  size={20}
                  color={defaultStyles.colors.medium}
                  style={styles.icon}
              />
              <TextInput style={defaultStyles.text} onSubmitEditing={Keyboard.dismiss} {...otherProps} />
              {suffix && <Text style={styles.suffix}>{suffix}</Text>}
              </View>
              {subtext && <Text style={styles.subtext}>{subtext}</Text>}
              </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    box:{
      flexDirection: "row",
      width: "100%",
      justifyContent:"space-between",
      alignItems:'flex-start',      
    },
    container: {
      flexDirection: "row",
      width: "100%",
      padding: 10,
      marginVertical: 10,
      backgroundColor: "#F1F3F4",
      borderRadius: 10,
      position:"relative",
    },
    container2: {
      flexDirection: "row",
      flex:1,
      paddingVertical: 3,
      paddingHorizontal:10,
      marginVertical: 5,
      backgroundColor: "#F1F3F4",
      borderRadius: 7,
      position:"relative",
    },
    icon: {
      marginRight: 10,
      marginTop: 3,
      marginLeft: 3,
    },
    text: {
      fontSize: 20,
      fontWeight: "600",
    },
    text2: {
      fontSize: 14,
      fontWeight: "600",
      width:100,
    },
    subtext: {
      fontSize: 14,
      marginLeft: 7,
      marginBottom: 10,
      color: "#ee2a7b",
    },
    suffix: {
      position:"absolute",
      right:20,
      top:"45%",
      fontSize:16,
    },
    suffix2: {
      position:"absolute",
      right:10,
      top:7,
      fontSize:14,
      color:colors.medium,
    },
    fixPosition:{
      position:"relative",
      top:10,
    },
    startfromtop:{
      textAlignVertical: 'top',
      position:"relative",
      top:3,
    }
  });

export default AppTextInput;