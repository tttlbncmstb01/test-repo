import React from 'react';
import {useFormikContext} from "formik";
import AppTextInput from "../AppTextInput";
import ErrorMess from "./ErrorMess";
function AppFormField({ name, ...otherProps }){
    const {
        setFieldTouched,
        setFieldValue,
        errors,
        touched,
        values,
    } = useFormikContext();
   return (
    <>
        <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        {...otherProps}
        />
        <ErrorMess error={errors[name]} visible={touched[name]} />
    </>
   );
}
export default AppFormField;