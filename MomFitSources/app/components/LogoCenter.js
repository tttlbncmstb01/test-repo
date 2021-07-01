import React from 'react';
import { View, StyleSheet, Image} from 'react-native';
function LogoCenter({typeLogo = null,top = 0,bottom = 0}){
   return (
      <View style={[styles.container,{marginBottom:bottom,marginTop:top}]}>
        {typeLogo == "2" ? 
            <Image style={styles.image2} source={require('../assets/logo2.png')}/>
            :
            <Image style={styles.image1} source={require('../assets/logo.png')}/>
        }
      </View>
   );
}

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        justifyContent:"center",
    },
    image1:{
        width:200,
        height:50,
    },
    image2:{
        width:150,
        height:35,
    }
});

export default LogoCenter;