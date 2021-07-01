import React from 'react';
import { TouchableOpacity, StyleSheet, Image, View,Text } from "react-native";
import Apptext from "./Apptext";

function PickerItem({ label, onPress,image,protein,carb,fat,fiber,kcal, serving=false }){
   return (
      <TouchableOpacity onPress={onPress} style={{flexDirection:"row"}}>
      {image ?
        <View style={{flexDirection:"row",marginTop:7,marginHorizontal:10,marginBottom:7}}>
          <Image source={{ uri: image }} style={{width:60,height:60}} />
          <View style={{paddingHorizontal:5}}>
            <Apptext>{label}</Apptext>
            {serving ? <Text style={{fontSize:12,paddingHorizontal:5,paddingTop:5,paddingBottom:2,color:"#222"}}>Thành phần dinh dưỡng trong 1 phần ăn:</Text> : <Text style={{fontSize:12,paddingHorizontal:5,paddingTop:5,paddingBottom:2,color:"#222"}}>Thành phần dinh dưỡng trong 100g:</Text>}
            <View style={{flexDirection:"row",paddingHorizontal:5}}>
              <Text style={{fontSize:10, marginRight:5,color:"grey"}}>- Protein: {protein}g</Text>
              <Text style={{fontSize:10, marginRight:5,color:"grey"}}>- Carb: {carb}g</Text>
              <Text style={{fontSize:10, marginRight:5,color:"grey"}}>- Fat: {fat}g</Text>
              <Text style={{fontSize:10, marginRight:5,color:"grey"}}>- Fiber: {fiber}g</Text>
              <Text style={{fontSize:10, marginRight:5,color:"grey"}}>- Kcal: {kcal}</Text>
            </View>
            
          </View> 
        </View>
        :
        <Apptext style={styles.button}>{label}</Apptext>
      }
    </TouchableOpacity>
   );
}

const styles = StyleSheet.create({
    button: {
        padding: 20,
    },
});

export default PickerItem;