import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import Screen from '../components/Screen';
import colors from '../config/colors';
import Header from '../components/Header';
import AuthContext from '../auth/context';
import AppTitle from '../components/AppTitle';
import Apptext from '../components/Apptext';
import SingleTask from '../components/home/SingleTask';
import defaultStyle from '../config/styles';
import HeightSpace from '../components/HeightSpace';
const DATA = [
   {
     id: "1",
     tab: "Hôm nay",
   },
   {
     id: "2",
     tab: "Lịch trình",
   },
];
const data = [
   {
       id:"1",
       title:"Uống 2 lít nước",
       status:"no",
       achievement: [
          {title:"Nước",value:"2",key:"liter",validationType:"number",unit:"lít",validations:[{type: "required",params: ["Vui lòng nhập !!"]}]},
          {title:"Mô tả",value:"",key:"description",validationType:"textarea",unit:""},
         ],
       image: [],
       hlv:{evaluate:'',point:'',feedback:''}
   },
   {
       id:"2",
       title:"Chạy bộ 5 Km",
       status:"yes",
       achievement: [
         {title:"Khoảng cách",value:"5",key:"distance",validationType:"number",unit:"km",validations:[{type: "required",params: ["Vui lòng nhập !!"]}]},
         {title:"tốc độ",value:"5",key:"speed",validationType:"number",unit:"km/h",validations:[{type: "required",params: ["Vui lòng nhập !!"]}]},
         {title:"Mô tả",value:"",key:"description",validationType:"textarea",unit:""},
      ],
       image: [],
       hlv:{evaluate:'good',point:'9',feedback:'Very good'}
   },
   {
       id:"3",
       title:"Cập nhật chỉ số cơ thể",
       status:"yes",
       achievement: [
         {title:"Cân nặng",value:"45",key:"can_nang",validationType:"number",unit:"kg",validations:[{type: "required",params: ["Vui lòng nhập !!"]}]},
         {title:"Vòng eo",value:"40",key:"vong_eo",validationType:"number",unit:"cms",validations:[{type: "required",params: ["Vui lòng nhập !!"]}]},
         {title:"Vòng Mông",value:"80",key:"vong_mong",validationType:"number",unit:"cms",validations:[{type: "required",params: ["Vui lòng nhập !!"]}]},
         {title:"Mô tả",value:"",key:"description",validationType:"textarea",unit:""},
      ],
       image: [],
       hlv:{evaluate:'good',point:'10',feedback:''}
   },
   {
       id:"4",
       title:"Ngủ đủ 7 giờ",
       status:"yes",
       achievement: [
         {title:"Thời gian",value:"45",key:"sleep",validationType:"number",unit:"giờ",validations:[{type: "required",params: ["Vui lòng nhập !!"]}]},
         {title:"Mô tả",value:"",key:"description",validationType:"textarea",unit:""},
      ],
       image: [],
       hlv:{evaluate:'good',point:'9',feedback:'mô tả'}
   },
];
function Home(){
   const [tabNumber,setTabNumber]=useState(1);
   return (
      <Screen style={styles.container} statusBarColor="black" paddingHorizontal={0} paddingVertical={0}>
         <AuthContext.Provider value={{ tabNumber, setTabNumber }}>
            <Header data={DATA} />
            {tabNumber == 1 ? (
               <>
               <FlatList
                     ListHeaderComponent={
                        <>
                        <AppTitle>LỊCH TẬP LUYỆN HÔM NAY</AppTitle>
                        <View style={styles.title}>
                              <Apptext style={defaultStyle.subtitle}>Tasks</Apptext>
                        </View>
                        </>
                     }
                     style={styles.scrollView}
                     data={data}
                     keyExtractor={(item) => item.id}
                     renderItem={({ item }) => (
                        <>
                           <SingleTask item={item} />
                        </>
                     )}
                     ListFooterComponent={
                        <>
                        <HeightSpace height={10}/>
                        <View style={styles.title}>
                              <Apptext style={defaultStyle.subtitle}>Workouts</Apptext>
                        </View>
                        <HeightSpace height={60}/>
                        </>
                     }
               />
               </>
            ):(
               <Text>456</Text>
            )}
         </AuthContext.Provider>
      </Screen>
   );
}

const styles = StyleSheet.create({
   container:{
      backgroundColor:colors.secondary,
      flex:1, 
   },
   title:{
      flexDirection:'row', 
      flexWrap:'wrap',
   },
   scrollView:{
      padding:15,
      marginTop:-20,
      marginBottom:-20,
   }
});

export default Home;