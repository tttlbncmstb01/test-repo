import React from 'react';
import { TouchableOpacity } from 'react-native';
import Apptext from './Apptext';
 
function HeaderTab({backgroundColor="transparent",color,title,onPress}){
   return (
    <TouchableOpacity style={{backgroundColor:backgroundColor,borderRadius:10,marginHorizontal:5,paddingHorizontal:10,paddingVertical:6}} onPress={onPress}>
        <Apptext style={{fontSize:12,lineHeight:13,color:color}}>{title}</Apptext>
    </TouchableOpacity>
   );
}
export default HeaderTab;