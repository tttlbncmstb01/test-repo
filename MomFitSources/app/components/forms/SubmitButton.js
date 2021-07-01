import React from 'react';
import { StyleSheet } from 'react-native';
import { useFormikContext } from "formik";
import AppButton from '../AppButton';
function SubmitButton({ title, color = "primary", style, top = 0, bottom = 0, transform="none", fontweight="normal" , ...otherProps}){
    const { handleSubmit } = useFormikContext();
    return (
        <AppButton title={title} onPress={handleSubmit} color={color} style={style} top={top} bottom={bottom} transform={transform} fontweight={fontweight} {...otherProps} />
    );
}

export default SubmitButton;