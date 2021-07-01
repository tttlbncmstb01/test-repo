import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight } from 'react-native';
import Apptext from '../components/Apptext';
import AppForm from '../components/forms/AppForm';
import AppFormField from '../components/forms/AppFormField';
import SubmitButton from '../components/forms/SubmitButton';
import ImageBackgroundScreen from '../components/ImageBackgroundScreen';
import * as Yup from "yup";
import LogoCenter from '../components/LogoCenter';
import ErrorMess from '../components/forms/ErrorMess';
import colors from '../config/colors';
import SocialButton from '../components/SocialButton';
const validationSchema = Yup.object().shape({
    phone: Yup.string().required().min(10).label("Số điện thoại"),
    password: Yup.string().required().min(6).label("Mật khẩu"),
  });
function Signin({navigation}){
    const [loading, setLoading] = useState(false);
    const [loginFailded, setLoginFailed] = useState(false);
    const handleSubmit = async ({ email, password })=>{
        console.log({ email, password })
    };
    return (
        <ImageBackgroundScreen statusBarColor="light" Indicator={loading}>
            <LogoCenter top={60} bottom={50} />
            <Apptext style={styles.text}>Đăng nhập</Apptext>
            <Apptext style={{color:colors.white,marginBottom:15,marginTop:5,}}>Xin chào !!</Apptext>
            <ErrorMess
                error="Email hoặc mật khẩu là không hợp lệ."
                visible={loginFailded}
            />
            <AppForm
            initialValues={{ phone: "", password: "", }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            >
                <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="phone"
                keyboardType="numeric"
                placeholder="Số điện thoại"
                textContentType="telephoneNumber"
                name="phone"
                />
                <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="lock"
                placeholder="Mật khẩu"
                textContentType="password"
                name="password"
                secureTextEntry
                />
                <SubmitButton title="ĐĂNG NHẬP" top={35} bottom={25} />
                <Apptext style={styles.mediatext}>Sử dụng tài khoản social media</Apptext>
                <View style={{ width: "100%", flexDirection: "row" }}>
                    <SocialButton
                        style={styles.text2}
                        name="google"
                        title="Đăng nhập với Google"
                        color="google"
                        onPress={() => console.log("click")}
                    />
                    <SocialButton
                        style={styles.text2}
                        name="facebook-f"
                        title="Đăng nhập với Facebook"
                        color="facebook"
                        onPress={() => console.log("click")}
                    />
                </View>
                <View style={{ width: "100%", flexDirection: "row", justifyContent:"space-between", marginTop:20, }}>
                    <TouchableOpacity onPress={()=>console.log("click")}>
                        <Apptext style={{fontWeight:"700",color:colors.white}}>Quên mật khẩu?</Apptext>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate("Signup")}>
                        <Apptext style={{fontWeight:"700",color:colors.white}}>Đăng ký</Apptext>
                    </TouchableOpacity>
                </View>
            </AppForm>
        </ImageBackgroundScreen>
    );
}

const styles = StyleSheet.create({
    text:{
         color:"#fff",
         fontSize:24,
         fontWeight:"700",
         marginTop:20,
         marginBottom:10,
    },
    mediatext:{
        width:"100%",
        textAlign:"center",
        color:colors.white,
        marginBottom:25,
    },
    text2: {
        marginLeft: 40,
        lineHeight: 18,
        color: "white",
      },
 });

export default Signin;