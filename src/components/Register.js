import React from "react";
import SigninForm from "./SigninForm";
import { Link } from "react-router-dom";
import useValidation from "../hooks/useValidation";

function Register({onRegistration}) {

    const {inputValue, error, formIsValid, setInputValue, setError, setFormIsValid, handleInputsChanges} = useValidation({});

    function handleSubmit(event) {
        event.preventDefault();
        onRegistration(inputValue);
    }
    
    return(
    <>   
        <SigninForm
            title="Регистрация"
            buttonTitle="Зарегистрироваться"
            onSubmit={handleSubmit}
            isValid={formIsValid}
        >
         <input
            type="Email"
            value={inputValue.Email}
            onChange={handleInputsChanges}
            id="mail-input"
            name="Email"
            placeholder="Email"
            className={error.name ? 
                "signin__field edit-form__field_type_error" : "signin__field"} 
            required 
        />
        <span 
            className={error.name ?
            "edit-form__input-error edit-form__input-error_active" :"edit-form__input-error"}>
            {error.name}
        </span>
        <input
            type="text"
            value={inputValue.password}
            onChange={handleInputsChanges}
            id="password-input"
            name="password"
            placeholder="Пароль"
            className={error.name ? 
                "signin__field edit-form__field_type_error" : "signin__field"} 
            required
            minLength="2" 
            maxLength="40"
        />  
        <span 
            className={error.name ?
            "edit-form__input-error edit-form__input-error_active" :"edit-form__input-error"}>
            {error.name}
        </span>
        </SigninForm>     
         
    </>          
    )
}

export default Register