import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import AppIndicator from './AppIndicator';
function Screen({children,style, statusBarColor="light", Indicator,paddingHorizontal=20,paddingVertical=20}){
   return (
       <>
        <StatusBar style={statusBarColor}/>
        <View style={[styles.screen,style,{paddingHorizontal:paddingHorizontal,paddingVertical:paddingVertical}]}>
            {children}
        </View>
        <AppIndicator visible={Indicator} />
      </>
   );
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: Constants.statusBarHeight,
    },
});

export default Screen;