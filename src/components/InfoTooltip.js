import React from "react";
import success from '../images/register-success.svg';

function InfoTooltip({isOpen, onClose}) {

    function handleOverlayClick(e) {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return(
        <div className={`pop-up ${isOpen && "pop-up_opened"}`} onClick={handleOverlayClick}>
        <div className="pop-up__container">
            <div className="tooltip__wrapper">
                <img className="tooltip__image" src={success} />
                <p className="tooltip__text">Вы успешно зарегистрировались!</p>
                <button type="button" className="pop-up__close" onClick={onClose}></button>
            </div>
        </div>
    </div>  
    )
}

export default InfoTooltip;