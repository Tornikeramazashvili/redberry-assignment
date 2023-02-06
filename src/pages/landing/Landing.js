import React from 'react';
import { useNavigate } from "react-router-dom";

import './Landing.css'
import redberryLogo from "../../assets/images/redberry-logo.svg"


const addResumeGeorgianString = "რეზიუმეს დამატება";
const addResumeBtn = addResumeGeorgianString.toUpperCase();

const Landing = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='background-container'>
                <div className='redberry-logo-container'>
                    <img src={redberryLogo} className='redberry-logo' alt='Redberry logo' />
                </div>
                <div className='add-resume-btn-container'>
                    <button className='add-resume-btn'
                        onClick={() => navigate("/personalInformation")}
                    >{addResumeBtn}</button>
                </div>
            </div>
        </>
    )
}

export default Landing