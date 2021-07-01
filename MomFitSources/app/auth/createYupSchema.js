import * as yup from "yup";

export function createYupSchema(schema, config) {
  const { key, validationType, validations = [] } = config;
  if (!yup[validationType]) {
    return schema;
  }
  let validator = yup[validationType]();
  validations.forEach(validation => {
    const { params, type } = validation;
    if (!validator[type]) {
      return;
    }
    // console.log(type, params);
    validator = validator[type](...params);
  });
  schema[key] = validator;
  return schema;
}
