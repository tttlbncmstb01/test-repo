// form.js
import React, { Component } from "react";
import { Formik } from "formik";
import TextField from "./textfield";
import { formData } from "./formData";
import { createYupSchema } from "./yupSchemaCreator";
import * as yup from "yup";

class Form extends Component {
  renderFormElements = props =>
    formData.map((item, index) => {
      const fieldMap = {
        text: TextField
      };
      const Component = fieldMap[item.type];
      let error = props.errors.hasOwnProperty(item.id) && props.errors[item.id];
      if (item.type) {
        return (
          <Component
            key={index}
            label={item.label}
            name={item.id}
            placeholder={item.placeholder}
            value={props.values[item.id]}
            onChange={props.handleChange}
            error={error}
          />
        );
      }
      return "";
    });

  render() {
    const initialValues = {};
    formData.forEach(item => {
      initialValues[item.id] = item.value || "";
    });

    const yepSchema = formData.reduce(createYupSchema, {});
    console.log(yepSchema);
    const validateSchema = yup.object().shape(yepSchema);

    return (
      <div className="form">
        <h1>Form here</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validateSchema}
          onSubmit={(values, actions) => {
            console.log("values", values);
            console.log("actions", actions);
          }}
        >
          {props => (
            <form onSubmit={props.handleSubmit}>
              {this.renderFormElements(props)}
              <button type="submit">Submit</button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default Form;

//formData.js
export const formData = [
    {
      id: "name",
      label: "Full name",
      placeholder: "Enter full name",
      type: "text",
      validationType: "string",
      value: "User name",
      validations: [
        {
          type: "required",
          params: ["this field is required"]
        },
        {
          type: "min",
          params: [5, "name cannot be less than 5 characters"]
        },
        {
          type: "max",
          params: [10, "name cannot be more than 10 characters"]
        }
      ]
    },
    {
      id: "email",
      label: "Email",
      placeholder: "Email",
      type: "text",
      validationType: "string",
      value: "email",
      validations: [
        {
          type: "required",
          params: ["this field is required"]
        },
        {
          type: "min",
          params: [5, "email cannot be less than 5 characters"]
        },
        {
          type: "max",
          params: [10, "email cannot be more than 10 characters"]
        },
        {
          type: "email",
          params: ["please enter a valid email"]
        }
      ]
    },
    {
      id: "phoneNumber",
      label: "phone number",
      type: "text",
      validationType: "number",
      value: "7878787878",
      validations: [
        {
          type: "min",
          params: [10, "phone number cannot be less than 10 characters"]
        },
        {
          type: "max",
          params: [10, "phone number cannot be more than 10 characters"]
        },
        {
          type: "required",
          params: ["phone number is required"]
        }
      ]
    },
    {
      id: "total",
      label: "Total People in Family",
      placeholder: "family members count",
      type: "text",
      validationType: "number",
      required: false,
      value: "1",
      validations: [
        {
          type: "required",
          params: ["this field is required"]
        },
        {
          type: "min",
          params: [1, "there should be atleast 1 family member"]
        },
        {
          type: "max",
          params: [5, "max family members can be 5"]
        }
      ]
    }
  ];
// yupSChemaCreator.js
import * as yup from "yup";

export function createYupSchema(schema, config) {
  const { id, validationType, validations = [] } = config;
  if (!yup[validationType]) {
    return schema;
  }
  let validator = yup[validationType]();
  validations.forEach(validation => {
    const { params, type } = validation;
    if (!validator[type]) {
      return;
    }
    console.log(type, params);
    validator = validator[type](...params);
  });
  schema[id] = validator;
  return schema;
}
