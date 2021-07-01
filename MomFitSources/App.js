import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import AppButton from './app/components/AppButton';
import AppPicker from './app/components/AppPicker';
import AppTextInput from './app/components/AppTextInput';
import ImageBackgroundScreen from './app/components/ImageBackgroundScreen';
import LogoCenter from './app/components/LogoCenter';
import Screen from './app/components/Screen';
import BodyIndex from './app/screens/BodyIndex';
import Signup from './app/screens/Signup';
import Welcome from './app/screens/Welcome';
import Signin from './app/screens/Signin';
import { NavigationContainer, navigationTheme } from "@react-navigation/native";
import AuthNavigator from './app/Navigations/AuthNavigator';
import TabNavigator from './app/Navigations/TabNavigator';
import HomeNavigator from './app/Navigations/HomeNavigator'
import * as ImagePicker from 'expo-image-picker';
import ImageInput from './app/components/ImageInput';
import ImageInputList from './app/components/ImageInputList';
export default function App() {
  const requestPermission = async ()=>{
    const {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(!granted)
      Alert.alert('Cảnh báo','Bạn cần phải "bật" cho phép truy cập vào thư viện ảnh và camera.');
  }
  useEffect(()=>{
    requestPermission();
  },[]);
  return (
      <NavigationContainer theme={navigationTheme}>
          <TabNavigator />
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // zIndex:2,
  },
});
