import React, { useContext, useState } from 'react';
import { View, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import LogoCenter from './LogoCenter';
import Constants from 'expo-constants';
import HeaderTab from './HeaderTab';
import colors from '../config/colors';
import AuthContext from '../auth/context';
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Header({data,style}){
    const [active,setActive]=useState(1);
    const authContext = useContext(AuthContext);
    return (
        <View style={[styles.header,{overflow:"hidden",paddingBottom:0,marginBottom:-24,backgroundColor:colors.transparent}]}>
            <View style={[styles.header,styles.shadow,style]}>
                <LogoCenter typeLogo="2" top={10} bottom={20} />
                <TouchableOpacity style={styles.user} onPress={()=>console.log("click")}>
                    <MaterialCommunityIcons name="account-circle" size={40} color={colors.grey} />
                </TouchableOpacity>
                <FlatList
                style={{marginLeft:10}}
                scrollEnabled={false}
                contentContainerStyle={{
                alignSelf: 'flex-start',
                }}
                numColumns={data.length}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={({ item }) => (
                <>
                    {item.id == active ? (
                        <HeaderTab title={item.tab} onPress={()=>{setActive(item.id);authContext.setTabNumber(item.id)}} color={colors.white} backgroundColor={colors.medium} />
                    ):(
                        <HeaderTab title={item.tab} onPress={()=>{setActive(item.id);authContext.setTabNumber(item.id)}} color={colors.medium}/>
                    )}
                </>
                )}
                keyExtractor={(item) => item.id}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header:{
        position:"relative",
        width:Dimensions.get('window').width,
        backgroundColor:"#fff",
        paddingTop:Constants.statusBarHeight,
        top:-Constants.statusBarHeight,
        left:0,
        paddingBottom:10,
        marginBottom:-5,
        zIndex:2,
    },
    shadow:{
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.3,
        shadowRadius: 3,
        elevation: 3,
    },
    user:{
        position:"absolute",
        right:20,
        top:31,
    }
});

export default Header;