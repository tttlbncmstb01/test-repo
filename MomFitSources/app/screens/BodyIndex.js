import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import SubmitButton from '../components/forms/SubmitButton';
import Apptext from '../components/Apptext';
import AppForm from '../components/forms/AppForm';
import ImageBackgroundScreen from '../components/ImageBackgroundScreen';
import LogoCenter from '../components/LogoCenter';
import * as Yup from "yup";
import AppFormField from "../components/forms/AppFormField";
import authStorage from '../auth/storage';
import privateInfo from '../api/privateInfo';
const validationSchema = Yup.object().shape({
   chieu_cao: Yup.number().required().label("Chiều cao"),
   can_nang: Yup.number().required().label("Cân nặng"),
   vong_eo: Yup.number().required().label("Vòng eo"),
   vong_mong: Yup.number().required().label("Vòng mông"),
 });

function BodyIndex(props){
   const handleSubmit = async (BodyIndex) => {
      const information = JSON.stringify(BodyIndex);
      await authStorage.storePrivateInfor(information);
      const users = await authStorage.getUser();
      console.log(users);
      const result = await privateInfo.privateInfo({users,BodyIndex});
      if (!result.ok) return console.log("Error !!");
      console.log("Sucess !!");
   };
   return (
      <ImageBackgroundScreen statusBarColor="light">
         <LogoCenter top={30} bottom={50} />
         <Apptext style={styles.text}>Chỉ số cơ thể bạn </Apptext>
         <AppForm
            initialValues={{
               chieu_cao: "",
               can_nang: "",
               vong_eo: "",
               vong_mong: "",
               }}
               onSubmit={handleSubmit}
               validationSchema={validationSchema}
         >
            <AppFormField
               autoCapitalize="none"
               autoCorrect={false}
               keyboardType="numeric"
               placeholder="Chiều cao"
               textContentType="telephoneNumber"
               name="chieu_cao"
               suffix="cms"
            />
            <AppFormField
               autoCapitalize="none"
               autoCorrect={false}
               keyboardType="numeric"
               placeholder="Cân nặng"
               textContentType="telephoneNumber"
               name="can_nang"
               suffix="kg"
            />
            <AppFormField
               autoCapitalize="none"
               autoCorrect={false}
               keyboardType="numeric"
               placeholder="Vòng eo"
               textContentType="telephoneNumber"
               name="vong_eo"
               suffix="cms"
            />
            <AppFormField
               autoCapitalize="none"
               autoCorrect={false}
               keyboardType="numeric"
               placeholder="Vòng mông"
               textContentType="telephoneNumber"
               name="vong_mong"
               suffix="cms"
            />
         <View style={styles.bottom}>
            <SubmitButton title="TIẾP TỤC" />
         </View>
         </AppForm>
      </ImageBackgroundScreen>
   );
}

const styles = StyleSheet.create({
   container:{
   },
   text:{
      color:'#fff',
      fontWeight:"700",
      fontSize:20,
      marginBottom:10,
      letterSpacing:1,
   },
   bottom:{
      position:"absolute",
      width:"100%",
      top:Dimensions.get('window').height - 71,
      left:20,
      right:20,
      alignSelf:'center',
      alignItems:'center',
   }
});
export default BodyIndex;