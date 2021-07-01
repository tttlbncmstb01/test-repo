import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Image, Alert } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from '../config/colors';
import * as ImagePicker from 'expo-image-picker';
import {uploadMedia} from '../api/uploadmedia';
import {getBearerToken} from '../api/getBearerToken';
function ImageInput({imageUri, onChangeImage}){
    
    
    const handlePress = async()=>{
        if(!imageUri) selectImage();
        else Alert.alert('Xóa','Bạn có muốn xóa hình ảnh này không?',[
            {text: 'Đồng ý', onPress:()=> onChangeImage(null)},
            {text: 'Không'}
        ])
    };
    const selectImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                quality:0.5,
            });
            if(!result.cancelled) {
                // var bearer_token = '';
                onChangeImage(result.uri);
                // await getBearerToken().then(res=>bearer_token = res.access_token);
                // uploadMedia(result,bearer_token).then(res=>console.log(res));
            }
        } catch (error) {
            console.log("Error reading an image", error);
        }
    };
   return (
      <TouchableWithoutFeedback onPress={handlePress}>
          <View style={styles.container}>
            {!imageUri && (
                <MaterialCommunityIcons color={colors.medium} name="camera" size={40} />
            )}
            {imageUri && <Image source={{uri:imageUri}} style={styles.image} />}
          </View>
      </TouchableWithoutFeedback>
   );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.light,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        overflow:"hidden",
        height:75,
        width:75,
    },
    image:{
        width:75,
        height:75,
    }
});

export default ImageInput;