import React, { useContext, useState } from 'react';
import { View,StyleSheet, TouchableOpacity, Text } from 'react-native';
import Apptext from '../components/Apptext';
import AppForm from '../components/forms/AppForm';
import AppFormField from '../components/forms/AppFormField';
import SubmitButton from '../components/forms/SubmitButton';
import ImageBackgroundScreen from '../components/ImageBackgroundScreen';
import AuthContext from '../auth/context';
import usersApi from '../api/users';
import authApi from '../api/auth';
import ErrorMess from '../components/forms/ErrorMess';
import jwtDecode from "jwt-decode";
import authStorage from '../auth/storage';
import * as Yup from "yup";
import colors from "../config/colors";

function equalTo(ref, msg) {
    return Yup.mixed().test({
        name: "equalTo",
        exclusive: false,
        message: msg || "Password must be the same as PasswordConfirm",
        params: {
        reference: ref.path,
        },
        test: function (value) {
        return value === this.resolve(ref);
        },
    });
}
Yup.addMethod(Yup.string, "equalTo", equalTo);
const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Họ và Tên"),
  phone: Yup.string().required().min(10).label("Số điện thoại"),
  password: Yup.string().required().min(6).label("Mật khẩu"),
  passwordConfirm: Yup.string()
    .equalTo(Yup.ref("password"), "Xác nhận mật khẩu phải khớp với mật khẩu")
    .required()
    .label("Xác nhận lại mật khẩu"),
});
function Signup({navigation}){
    const [loading, setLoading] = useState(false);
    const authContext = useContext(AuthContext);
    const [registerFailded, setRegisterFailed] = useState(false);
    const [error, setError] = useState();
    const handleSubmit = async (userInfo) => {
        setLoading(true);
        const result = await usersApi.register(userInfo);
        console.log(result);
        setLoading(false);
        if (!result.ok) {
            if (result.data) setError(result.data);
            else {
                setError("Sự cố không mong muốn đã xảy ra.");
            }
            return setRegisterFailed(true);
        }
        setRegisterFailed(false);
        const { data: authToken } = await authApi.login(
            userInfo.phone,
            userInfo.password
        );
        const user = jwtDecode(authToken);
        // authContext.setUser(user);
        // authContext.setFirstTime(true);
        authStorage.storeToken(authToken);
        };
   return (
      <ImageBackgroundScreen statusBarColor="light" Indicator={loading}>
        <Apptext style={styles.text}>Đăng ký</Apptext>
        <ErrorMess error={error} visible={registerFailded} />
        <AppForm 
            initialValues={{
            name: "",
            phone: "",
            password: "",
            passwordConfirm: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="account"
            keyboardType="default"
            placeholder="Họ và Tên"
            textContentType="name"
            name="name"
            />
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
            <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            placeholder="Xác nhận mật khẩu"
            textContentType="password"
            name="passwordConfirm"
            secureTextEntry
            />
            <SubmitButton title="ĐĂNG KÝ" top={20} bottom={20} fontweight="bold" />
            <View style={styles.questionBox}>
                <Apptext style={styles.question}>Đã có tài khoản?</Apptext>
                <TouchableOpacity onPress={()=>navigation.navigate("Signin")}><Text style={styles.signin}>Đăng nhập</Text></TouchableOpacity>
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
        marginTop:50,
        marginBottom:10,
   },
   questionBox:{
        flexDirection:'row',
        justifyContent:"center",
   },
   question:{
        color:colors.white,
        fontWeight:"700",
   },
   signin:{
        color:colors.primary,
        fontWeight:"700",
   }
});

export default Signup;