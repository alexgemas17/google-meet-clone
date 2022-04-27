import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { StartLoginWithGithub } from '../../store/Actions/Auth'
import { isLoading } from '../../store/appSlices'

import './styles.css'


export const LoginComponent = () => {
    
    const loading = useSelector(isLoading)

    const handleInputLoginWithGithub = () => {

    }

    const handleInputLoginWithGoogle = () => {

    }

    return (
        <div className='social-networks'>
            <p> <b>Is loading? {loading}</b></p>
            <p> <b>Login with:</b></p>

            <div
                className="btn-login github"
                role="button"
                aria-label='github icon'
                onClick={StartLoginWithGithub}
            >

                <div className="icon-wrapper">
                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1024px-Octicons-mark-github.svg.png" alt="github icon" />
                </div>

                <p className="btn-text">
                    <b>Sign in with Github</b>
                </p>
            </div>

            <div
                className="btn-login linkedin"
                role="button"
                aria-label='linkedin icon'
                onClick={handleInputLoginWithGoogle}
            >
                <div className="icon-wrapper">
                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png" alt="linkedin icon" />
                </div>

                <p className="btn-text">
                    <b>Sign in with Google</b>
                </p>
            </div>
        </div>
    )
}
