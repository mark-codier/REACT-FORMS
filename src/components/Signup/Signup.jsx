import { useEffect, useState } from "react";
import { checkInputsInvalidation } from "../../util/validation";
import ControlInput from "./ControlInput";
export default function Signup() {
  const [isInvalid, setIsInvalid] = useState({
    email: false,
    password: false,
    firstName: false,
    lastName: false,
    confirmPassword: false,
  });
    function validateInput(typeOfInput, valueOfInput) {
    const invalid = checkInputsInvalidation(typeOfInput, valueOfInput)
    setIsInvalid((prevState) => {
      const newState = {
        ...prevState,
        [typeOfInput]: invalid,
      };
      return newState;
    });
    return !(invalid)
  }
  function getInputValue(name) {
    const signForm = new FormData(document.getElementById("form_sign_up"));
    return signForm.get(name);
  }
  function getFormsData(Form) {
    const data = Object.fromEntries(Form.entries());
    data.acquisition = Form.getAll("acquisition");
    console.log('Data that is sent - ',data);
    return data;
  }

  function checkPasswordsMatches(data) {
    const pass = data.password || null;
    const confPass = data.confirmPassword || null;
    if (pass == confPass && pass !== null) {
      console.log("Inputs are matched");
      return true;
    }else{
    alert("PASSWORDS DON'T MATCH EACH OTHER!")
    return false;
    }
  }
  function validateAllInputs(Form){
    let flagBool = true;
    Form.forEach((value,key)=>{
      validateInput(key,value) ? null :  flagBool = false;
    })
    return flagBool
  }
  function handleFormsData(target){
    const signForm = new FormData(target);
    const data = getFormsData(signForm);
    const validationOfInputs = validateAllInputs(signForm)
    return {data,validationOfInputs};
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    const {data, validationOfInputs} = handleFormsData(event.target);
    const matchOfPasswords = checkPasswordsMatches(data);
    if(matchOfPasswords && validationOfInputs){
      alert('Data is sent succesfully');
    }
  }
  const onBlur = (name) => {
    validateInput(
      name,
      getInputValue(name)
    );
  }
  return (
    <form id="form_sign_up" onSubmit={handleSubmit}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <ControlInput onBlur={()=>onBlur('email')} defaultValue='mwegener547@gmail.com' type='email' name='email' labelName='Email*' id='email'/>
      {isInvalid.email && (
        <div className="control-error">Enter email correctly</div>
      )}
      <div className="control-row">
      <ControlInput onBlur={()=>onBlur('password')} defaultValue='12345' type='password' name='password' labelName='Password*' id='password'>
          {isInvalid.password && (
            <div className="control-error">Enter password correctly</div>
          )}
      </ControlInput>
      <ControlInput onBlur={()=>onBlur('confirmPassword')} defaultValue='12345' type='password' name='confirmPassword' labelName='Confirm password*' id='confirm-password'>
          {isInvalid.confirmPassword && (
            <div className="control-error">Enter password correctly</div>
          )}
      </ControlInput>
      </div>
      <hr />
      <div className="control-row">
      <ControlInput onBlur={()=>onBlur('firstName')} defaultValue='Groß' type='text' name='firstName' labelName='Enter your first name*' id='first-name'>
          {isInvalid.firstName && (
            <div className="control-error">
              Enter your first name correctly. The symbols except letters are
              not allowed
            </div>
          )}
      </ControlInput>
      <ControlInput onBlur={()=>onBlur('lastName')} defaultValue='Arslan' type='text' name='lastName' labelName='Enter your last name*' id='last-name'>
      {isInvalid.lastName && (
        <div className="control-error">Enter your last name correctly</div>
      )}
      </ControlInput>
      </div>
      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role">
          <option defaultValue="student">Student</option>
          <option defaultValue="teacher">Teacher</option>
          <option defaultValue="employee">Employee</option>
          <option defaultValue="founder">Founder</option>
          <option defaultValue="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" />I
          agree to the terms and conditions
        </label>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button">
          Sign up
        </button>
      </p>
    </form>
  );
}
