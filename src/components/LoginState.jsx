import { useState } from "react";
import { checkInputsInvalidation } from "../util/validation";
export default function Login() {
  const [inputsData, setInputsData] = useState({
    email: {
      value: "",
      isInvalid: false,
    },
    password: {
      value: "",
      isInvalid: false,
    },
  });
  // собрать введённые данные из двух инпутов и законсолить их

  function handleInputChange(value, typeOfInput) {
    setInputsData((prevState) => {
      const newState = {
        ...prevState,
        [typeOfInput]: {
          value,
          isInvalid: false,
        },
      };
      return newState;
    });
  }
  function validateFn(value, typeOfInput) {
    setInputsData((prevState) => {
      const newState = {
        ...prevState,
        [typeOfInput]: {
          value,
          isInvalid: checkInputsInvalidation(typeOfInput, value),
        },
      };
      return newState;
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(inputsData);
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            onBlur={({ target }) => validateFn(target.value, target.name)}
            onChange={({ target }) =>
              handleInputChange(target.value, target.name)
            }
            id="email"
            type="email"
            name="email"
          />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            onBlur={({ target }) => validateFn(target.value, target.name)}
            onChange={({ target }) =>
              handleInputChange(target.value, target.name)
            }
            id="password"
            type="password"
            name="password"
          />
        </div>
        <div className="control-error">
          {inputsData.email.isInvalid && <p>Email input is invalid</p>}
        </div>
        <div className="control-error">
          {inputsData.password.isInvalid && <p>Password input is invalid</p>}
        </div>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="sumbit" className="button">
          Login
        </button>
      </p>
    </form>
  );
}
