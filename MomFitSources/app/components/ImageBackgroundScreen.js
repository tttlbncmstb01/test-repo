import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import Screen from './Screen';
 
function ImageBackgroundScreen({children,style,statusBarColor,Indicator,image="https://moigioi.hoieothon.com/wp-content/uploads/2021/05/f_gymer1.jpg"}){
   return (
    <View style={{flex:1,position:"relative"}}>
        <Image style={styles.image} source={{uri:image}} />
        <View style={styles.layer}></View>
        <Screen style={[style,{flex:1}]} statusBarColor={statusBarColor} Indicator={Indicator}>
            {children}
        </Screen>
    </View>
   );
}

const styles = StyleSheet.create({
    image:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        position:"absolute",
        top:0,
        left:0,
    },
    layer:{
        width:"100%",
        height:"100%",
        position:"absolute",
        top:0,
        left:0,
        right:0,
        backgroundColor:'#200000',
        opacity:0.6,
    }
});

export default ImageBackgroundScreen;