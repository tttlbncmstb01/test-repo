import React from 'react';
import { View } from 'react-native';
 
function HeightSpace({height=0,style}){
   return (
      <View style={[style,{height:height}]}></View>
   );
}
export default HeightSpace;