import React, { useEffect, useState } from 'react';

import User from './User';
import '../css/User.css';



function Authentication() {
    const [authentication, setAuthentication] = useState(true);

    console.log(authentication);

    const handleAuthentication = () => {
        setAuthentication(false);
    };


    //Change form
    const handleChangeForm = () => {
        let authenticationLogin = document.querySelector('.authentication__login');
        let authenticationRegister = document.querySelector('.authentication__register');
        if (authenticationLogin.style.display == '' || authenticationLogin.style.display == 'none') {
            authenticationLogin.style.display = 'block';
            authenticationRegister.style.display = 'none';
        } else {
            authenticationLogin.style.display = 'none';
            authenticationRegister.style.display = 'block';
        }
    }
    if (authentication) {
        return (
            <div className="authentication__container">
                {/* Login */}
                <div className="authentication__login">
                    <div className="authentication__title">Login</div>
                    <div className="authentication__description">Enter your personal details to use all of site features</div>

                    <div className="authentication__form">

                        <div className="authentication__item">
                            <label className="authentication__label">Username</label>
                            <div className="authentication__inputContainer">
                                <input type="text" className="authentication__input" placeholder="Eg. User001" />
                            </div>
                        </div>

                        <div className="authentication__item">
                            <label className="authentication__label">Password</label>
                            <div className="authentication__inputContainer">
                                <input type="password" className="authentication__input" placeholder="Enter password" />
                                <i className="authentication__iconEye fa-solid fa-eye-slash"></i>
                            </div>
                        </div>

                        <div className="login__btn">
                            <button onClick={handleAuthentication}>Login</button>
                        </div>

                        <div className="authentication__footer">
                            Not a member? <a onClick={handleChangeForm} >Register now</a>
                        </div>

                    </div>

                </div>

                {/* Register */}
                <div className="authentication__register">
                    <div className="authentication__title">Register</div>
                    <div className="authentication__description">Enter your personal details to use all of site features</div>

                    <div className="authentication__form">

                        <div className="authentication__item">
                            <label className="authentication__label">Username</label>
                            <div className="authentication__inputContainer">
                                <input type="text" className="authentication__input" placeholder="Eg. User001" />
                            </div>
                        </div>

                        <div className="authentication__item">
                            <label className="authentication__label">Password</label>
                            <div className="authentication__inputContainer">
                                <input type="password" className="authentication__input" placeholder="Enter password" />
                                <i className="authentication__iconEye fa-solid fa-eye-slash"></i>
                            </div>
                        </div>

                        <div className="authentication__item">
                            <label className="authentication__label">Comfirm Password</label>
                            <div className="authentication__inputContainer">
                                <input type="password" className="authentication__input" placeholder="Comfirm password" />
                                <i className="authentication__iconEye fa-solid fa-eye-slash"></i>
                            </div>
                        </div>

                        <div className="login__btn">
                            <button>Register</button>
                        </div>

                        <div className="authentication__footer">
                            Have account? <a onClick={handleChangeForm} >Login now</a>
                        </div>

                    </div>

                </div>
            </div>
        )
    } else {
        return <User />
    }

}

export default Authentication;
