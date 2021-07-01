import React from 'react';
import { useFormikContext } from "formik";
import ErrorMess from "./ErrorMess";
import AppPicker from "../AppPicker";
function AppFormPicker({ items, name, placeholder }){
    const { setFieldValue, values, errors, touched } = useFormikContext();
    return (
        <>
          <AppPicker
            items={items}
            placeholder={placeholder}
            selectedItem={values[name]}
            onSelectItem={(item) => setFieldValue(name, item)}
          />
          <ErrorMess error={errors[name]} visible={touched[name]} />
        </>
      );
}


export default AppFormPicker;