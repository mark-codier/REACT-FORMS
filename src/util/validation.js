function isNotEmail(value) {
  const isEmail = value.includes("@") && hasMinLength(value, 10) && lastSymbolsChecking(value);
  return !(isEmail);
}
function lastSymbolsChecking(str){
  return str.endsWith('.com')
}
function isEmpty(value) {
  return value.trim() === "";
}
function isNotEmpty(value) {
  return value.trim() !== "";
}
function hasNotMinLength(value, minLength) {
  return value.length < minLength;
}
function hasMinLength(value, minLength) {
  return value.length >= minLength;
}
export function isEqualsToOtherValue(value, otherValue) {
  return value === otherValue;
}
function isName(value) {
  return /^[^0-9 =+';/.",!@#$%^&*()]+$/.test(value);
}
export function checkInputsInvalidation(typeOfInput, value) {
  let type = typeOfInput.toLowerCase();
  let isInvalid = false;
  if(type.includes('name')){
    type = 'name'
  }else if(type.includes('password')){
    type = 'password'
  }
  if (isEmpty(value)) {
    return isInvalid;
  }
  switch (type) {
    case "email":
      isInvalid = isNotEmail(value);
      break;
    case "password":
      isInvalid = hasNotMinLength(value, 4);
      break;
    case "name":
      isInvalid = !(isName(value));
      break;
    default:
      break;
  }
  return isInvalid;
}
