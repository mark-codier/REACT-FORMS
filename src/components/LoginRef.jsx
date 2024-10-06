import { useRef, useState } from "react";
import { checkInputsInvalidation} from "../util/validation"; 
export default function Login() {
    const [isValid, setIsValid] = useState({
        email:true,
        password: true,
    })
    const emailRef = useRef()
    const passwordRef = useRef()
  function validateFn(typeOfInput,valueOfInput){
    setIsValid(prevState=>{
        const isValid = !checkInputsInvalidation(typeOfInput,valueOfInput)
        const newState = {
            ...prevState,
            [typeOfInput]: isValid
        }
        return newState;
    })
  }
  function handleSubmit(e){
    e.preventDefault()
    const emailValue = emailRef.current.value
    const passwordValue = emailRef.current.value
    const newObjOfData = {
        emailValue, passwordValue
    }
    console.log(newObjOfData)
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input onBlur={()=>validateFn('email', emailRef.current.value)} ref={emailRef} id="email" type="email" name="email"/>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input onBlur={()=>validateFn('password', passwordRef.current.value)} ref={passwordRef} id="password" type="password" name="password" />
        </div>
        <div className="control-error">{!(isValid.email) && <p>Email input is invalid</p>}</div>
        <div className="control-error">{!(isValid.password) && <p>Password input is invalid</p>}</div>
      </div>

      <p className="form-actions">
        <button type='reset' className="button button-flat">Reset</button>
        <button type='submit' className="button">Login</button>
      </p>
    </form>
  );
}
