import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import AppTitle from '../AppTitle';
import defaultStyle from '../../config/styles';
import Apptext from '../Apptext';
import SingleTask from './SingleTask';
const data = [
    {
        id:"1",
        title:"Uống 2 lít nước",
        status:"no",
        achievement: {liter:2,description:"mô tả"},
        image: [],
        hlv:{evaluate:'',point:'',feedback:''}
    },
    {
        id:"2",
        title:"Chạy bộ 5 Km",
        status:"yes",
        achievement: {distance:5,speed:5,description:"mô tả"},
        image: [],
        hlv:{evaluate:'good',point:'9',feedback:'Very good'}
    },
    {
        id:"3",
        title:"Cập nhật chỉ số cơ thể",
        status:"yes",
        achievement: {can_nang:45,vong_eo:40,vong_mong:80,description:"mô tả"},
        image: [],
        hlv:{evaluate:'good',point:'10',feedback:''}
    },
    {
        id:"4",
        title:"Ngủ đủ 7 giờ",
        status:"yes",
        achievement: {sleep:7,description:"mô tả"},
        image: [],
        hlv:{evaluate:'good',point:'9',feedback:'mô tả'}
    },
];
function HomeToday(props){
   return (
        <>
        <AppTitle>LỊCH TẬP LUYỆN HÔM NAY</AppTitle>
        <View style={styles.container}>
            <Apptext style={defaultStyle.subtitle}>Tasks</Apptext>
        </View>
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <>
                    <SingleTask item={item} />
                </>
            )}
        />
        </>
   );
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row', 
        flexWrap:'wrap',
    },
});

export default HomeToday;