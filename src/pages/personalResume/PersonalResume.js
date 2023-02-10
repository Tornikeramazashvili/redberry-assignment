import React, { useState, useEffect, Fragment } from 'react'
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import useFormPersist from 'react-hook-form-persist'

import '../personalResume/PersonalResume.css'

import emailIcon from "../../assets/images/email.svg"
import mobileIcon from "../../assets/images/mobile.svg"

const PersonalResume = () => {

    const [defaultValues, setDefaultValues] = useState({});
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({ defaultValues });
    const [img, setImg] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const firstName = watch('firstName');
    const lastName = watch('lastName')
    const aboutMyself = watch('aboutMyself')
    const email = watch('email')
    const mobile = watch('mobile')
    const image = watch('image')

    const position = watch('position')
    const employer = watch('employer')
    const startDate = watch('startDate')
    const endDate = watch('endDate')
    const jobDescription = watch('jobDescription')

    const anotherPosition = watch('anotherPosition')
    const anotherEmployer = watch('anotherEmployer')
    const anotherStartDate = watch('anotherStartDate')
    const anotherEndDate = watch('anotherEndDate')
    const anotherJobDescription = watch('anotherJobDescription')

    const university = watch('university')
    const degree = watch('degree')
    const graduationDate = watch('graduationDate')
    const universityDescription = watch('universityDescription')

    const anotherUniversity = watch('anotherUniversity')
    const anotherDegree = watch('anotherDegree')
    const anotherGraduationDate = watch('anotherGraduationDate')
    const anotherUniversityDescription = watch('anotherUniversityDescription')

    const POSITION_EMPLOYER_DESCRIPTION_REGEX = /^[A-Za-zა-ჰ.,;:!-?'"0-9]{2,}( [A-Za-zა-ჰ.,;:!-?'"0-9]+)*$/;
    const NAMES_REGEX = /^[ა-ჰ]+$/;
    const EMAIL_REGEX = /^[a-zA-Z]+@redberry.ge$/;
    const MOBILE_REGEX = /^\+995\d{9}$/;
    const navigate = useNavigate();

    useEffect(() => {
        const storedData = window.localStorage.getItem("storageKey");
        if (storedData) {
            setDefaultValues(JSON.parse(storedData));
        }
    }, []);

    useFormPersist("storageKey", {
        watch,
        setValue,
        storage: window.localStorage,
    });

    const onSubmit = (data) => {
        if (Object.keys(errors).length === 0) {
            console.log(data)
            navigate('/personalResume')
        } else if (setDefaultValues()) {
            console.log(data)
            navigate("/personalResume");
        } else {
            console.log(Object.keys(errors).length)
        }
    };

    const [showComponent, setShowComponent] = useState(
        JSON.parse(localStorage.getItem("addEducation")) || false
    );

    useEffect(() => {
        localStorage.setItem("addEducation", JSON.stringify(showComponent));
    }, [showComponent]);

    return (
        <>
            <div className='personal-resume-container'>
                <div className='second-form-container'>
                    <div className='second-form-firstname-lastname-container'>
                        <span className='second-form-firstname-title'>{firstName}</span>
                        <span className='second-form-lastname-title'>{lastName}</span>
                    </div>
                    <div className='second-form-email-container'>
                        {email ? <img src={emailIcon} alt='email' /> : ""}
                        <span className='second-form-email-title'>{email}</span>
                    </div>
                    <div className='second-form-mobile-container'>
                        {mobile ? <img src={mobileIcon} alt='email' /> : ""}
                        <span className='second-form-email-title'>{mobile}</span>
                    </div>
                    <div className='second-form-about-myself-container'>
                        {aboutMyself ? <span className='second-form-about-myself-title'>ჩემს შესახებ</span> : ""}
                        <p className='second-form-about-myself-text'>{aboutMyself}</p>
                        {aboutMyself ? <p className='second-form-about-myself-line'></p> : ""}
                    </div>
                    <div className='second-form-experience-container'>
                        {position ? <span className='second-form-about-myself-title'>გამოცდილება</span> : ""}
                        <div style={{ marginTop: "15px" }}>
                            <span className='second-form-position-text'>{position}</span>
                            {employer ? <span>, </span> : ""}
                            <span className='second-form-position-text'>{employer}</span>
                        </div>
                    </div>
                    <div className='second-form-date-container'>
                        <span className='second-form-date-text'>{startDate}</span>
                        {endDate ? <span className='second-form-date-text'> - </span> : ""}
                        <span className='second-form-date-text'>{endDate}</span>
                    </div>
                    <div className='second-form-description-container'>
                        <p className='second-form-description-text'>{jobDescription}</p>
                    </div>
                    <div className='second-form-experience-container'>
                        <div style={{ marginTop: "15px" }}>
                            <span className='second-form-position-text'>{anotherPosition}</span>
                            {anotherEmployer ? <span>, </span> : ""}
                            <span className='second-form-position-text'>{anotherEmployer}</span>
                        </div>
                    </div>
                    <div className='second-form-date-container'>
                        <span className='second-form-date-text'>{anotherStartDate}</span>
                        {anotherEndDate ? <span className='second-form-date-text'> - </span> : ""}
                        <span className='second-form-date-text'>{anotherEndDate}</span>
                    </div>
                    {aboutMyself ? <p className='second-form-about-myself-line'></p> : ""}
                    <div className='second-form-description-container'>
                        <p className='second-form-description-text'>{anotherJobDescription}</p>
                    </div>
                    <div className='second-form-experience-container'>
                        {university ? <span className='second-form-about-myself-title'>განათლება</span> : ""}
                        <div style={{ marginTop: "15px" }}>
                            <span className='second-form-position-text'>{university}</span>
                            {degree ? <span>, </span> : ""}
                            <span className='second-form-position-text'>{degree}</span>
                        </div>
                    </div>
                    <div className='second-form-date-container'>
                        <span className='second-form-date-text'>{graduationDate}</span>
                    </div>
                    <div className='second-form-description-container'>
                        <p className='second-form-description-text'>{universityDescription}</p>
                    </div>
                    <div className='second-form-experience-container'>
                        <div style={{ marginTop: "15px" }}>
                            <span className='second-form-position-text'>{anotherUniversity}</span>
                            {anotherDegree ? <span>, </span> : ""}
                            <span className='second-form-position-text'>{anotherDegree}</span>
                        </div>
                    </div>
                    <div className='second-form-date-container'>
                        <span className='second-form-date-text'>{anotherGraduationDate}</span>
                    </div>
                    <div className='second-form-description-container'>
                        <p className='second-form-description-text'>{anotherUniversityDescription}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PersonalResume