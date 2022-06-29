import React from "react";
import { Link } from "react-router-dom";

function SigninForm({title, buttonTitle, children, onSubmit, isValid}) {
    return(
        <div className="signin">
        <h2 className="signin__enter">{title}</h2>
        <form onSubmit={onSubmit} className="signin__form" noValidate>          
        {children}
        <button className={!isValid ?  "signin__button signin__button_type_disabled" 
            : "signin__button"} type="submit">
            {buttonTitle}
        </button>        
        </form>
        <div className="signin__register">
          <p>Уже зарегистрированы? </p>
          <Link to="login" className="signin__link">Войти</Link>
        </div>       
        </div>
    )
}

export default SigninForm;