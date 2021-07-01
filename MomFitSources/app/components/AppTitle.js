import React from 'react';
import { View, StyleSheet } from 'react-native';
import Apptext from './Apptext';
import colors from '../config/colors';
function AppTitle({children}){
   return (
    <View style={styles.container}>
        <Apptext style={styles.title}>{children}</Apptext>
    </View>
   );
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row', 
        flexWrap:'wrap',
        marginBottom:10,
    },
    title:{
        backgroundColor:colors.white,
        color:colors.primary,
        borderRadius:10,
        paddingVertical:7,
        paddingHorizontal:10,
        fontWeight:'700',
        borderColor:colors.light,
        borderWidth:1,
    }
});

export default AppTitle;