import React, { useState, useEffect, Fragment } from 'react'
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import useFormPersist from 'react-hook-form-persist'

import '../personalExperience/PersonalExperience.css'

import checkMark from "../../assets/images/greenCheckmark.svg"
import exclamationMark from '../../assets/images/redExclamationMark.svg'
import arrowLeft from '../../assets/images/arrow-left.svg'
import emailIcon from "../../assets/images/email.svg"
import mobileIcon from "../../assets/images/mobile.svg"

const personalEducation = "განათლება".toUpperCase();
const nextButton = "შემდეგი".toUpperCase();
const backButton = "უკან".toUpperCase()

const PersonalEducation = () => {

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
            <div className='container'>
                <div className="arrow-left-container" >
                    <img src={arrowLeft} className='arrow-left' alt='arrow left logo' onClick={() => navigate('/')} />
                </div>
                <div className='form-container'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='personal-information-container'>
                            <div><span className='personal-information-title'>{personalEducation}</span></div>
                            <div><span className='personal-information-pages'>3/3</span></div>
                        </div>
                        <div className='position-container-personal-experience'>
                            <span className={errors.university ? 'email-error-title' : 'email-default-title'}>სასწავლებელი</span>
                            <div className='email-input-and-error-container'>
                                <input
                                    type='text'
                                    placeholder='სასწავლებელი'
                                    className={university && !errors.university && POSITION_EMPLOYER_DESCRIPTION_REGEX.test(university) ? "email-success-input" : errors.university ? "email-error-input" : "email-default-input "}
                                    {...register('university', { required: true, pattern: POSITION_EMPLOYER_DESCRIPTION_REGEX })} />
                                <span className='input-error'>
                                    {university && !errors.university && POSITION_EMPLOYER_DESCRIPTION_REGEX.test(university) ? (<img src={checkMark} alt='green checkmark' />) : errors.university ? (<img src={exclamationMark} alt='red exclamation mark' />) : ""}
                                </span>
                            </div>
                            <span className='input-hint'>მინიმუმ 2 სიმბოლო</span>
                        </div>
                        <div className='date-container'>

                            <div className='firstName-container'>
                                <span className={errors.degree ? 'firstName-error-title' : 'firstName-default-title'}>ხარისხი</span>
                                <div className='firstname-input-and-error-container'>
                                    <input type='text' id='FIRST_NAME' placeholder='აირჩიეთ ხარისხი'
                                        {...register('degree', { required: true })}
                                        className={degree && !errors.degree ? "email-success-input" : errors.degree ? "email-error-input" : "email-default-input "}
                                    />
                                </div>
                            </div>
                            <div className='lastName-container'>
                                <span className={errors.graduationDate ? 'lastName-error-title' : 'lastName-default-title'}>დამთავრების რიცხვი</span>
                                <div className='lastname-input-and-error-container'>
                                    <input type='date' id='FIRST_NAME'
                                        {...register('graduationDate', { required: true })}
                                        className={graduationDate && !errors.graduationDate ? "email-success-input" : errors.graduationDate ? "email-error-input" : "email-default-input "} />
                                </div>
                            </div>
                        </div>
                        <div className='description-container'>
                            <span className={errors.universityDescription ? 'lastName-error-title' : 'lastName-default-title'}>აღწერა</span>
                            <input
                                type='text'
                                className={universityDescription && !errors.universityDescription ? "description-success-input" : errors.universityDescription ? "description-error-input" : "description-default-input "}
                                placeholder='განათლების აღწერა'
                                {...register('universityDescription', { required: true, pattern: POSITION_EMPLOYER_DESCRIPTION_REGEX })}
                            />
                        </div>
                        <p className='second-form-description-horizontal-line'></p>
                        <div>
                            {showComponent ?
                                <>
                                    <div>
                                        <span className={errors.university ? 'email-error-title' : 'email-default-title'}>სასწავლებელი</span>
                                        <div className='email-input-and-error-container'>
                                            <input
                                                type='text'
                                                placeholder='სასწავლებელი'
                                                className={anotherUniversity && !errors.anotherUniversity && POSITION_EMPLOYER_DESCRIPTION_REGEX.test(anotherUniversity) ? "email-success-input" : errors.anotherUniversity ? "email-error-input" : "email-default-input "}
                                                {...register('anotherUniversity', { required: true, pattern: POSITION_EMPLOYER_DESCRIPTION_REGEX })} />
                                            <span className='input-error'>
                                                {anotherUniversity && !errors.anotherUniversity && POSITION_EMPLOYER_DESCRIPTION_REGEX.test(anotherUniversity) ? (<img src={checkMark} alt='green checkmark' />) : errors.anotherUniversity ? (<img src={exclamationMark} alt='red exclamation mark' />) : ""}
                                            </span>
                                        </div>
                                        <span className='input-hint'>მინიმუმ 2 სიმბოლო</span>
                                    </div>
                                    <div className='date-container'>
                                        <div className='firstName-container'>
                                            <span className={errors.degree ? 'firstName-error-title' : 'firstName-default-title'}>ხარისხი</span>
                                            <div className='firstname-input-and-error-container'>
                                                <input type='text' id='FIRST_NAME' placeholder='აირჩიეთ ხარისხი'
                                                    {...register('anotherDegree', { required: true })}
                                                    className={anotherDegree && !errors.anotherDegree ? "email-success-input" : errors.anotherDegree ? "email-error-input" : "email-default-input "}
                                                />
                                            </div>
                                        </div>
                                        <div className='lastName-container'>
                                            <span className={errors.anotherGraduationDate ? 'lastName-error-title' : 'lastName-default-title'}>დამთავრების რიცხვი</span>
                                            <div className='lastname-input-and-error-container'>
                                                <input type='date' id='FIRST_NAME'
                                                    {...register('anotherGraduationDate', { required: true })}
                                                    className={anotherGraduationDate && !errors.anotherGraduationDate ? "email-success-input" : errors.anotherGraduationDate ? "email-error-input" : "email-default-input "} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='add-university-description-container'>
                                        <span className={errors.anotherUniversityDescription ? 'lastName-error-title' : 'lastName-default-title'}>აღწერა</span>
                                        <input
                                            type='text'
                                            className={anotherUniversityDescription && !errors.anotherUniversityDescription ? "description-success-input" : errors.anotherUniversityDescription ? "description-error-input" : "description-default-input "}
                                            placeholder='განათლების აღწერა'
                                            {...register('anotherUniversityDescription', { required: true, pattern: POSITION_EMPLOYER_DESCRIPTION_REGEX })} />
                                    </div>
                                </> : null}
                        </div>
                        <div>
                            <button type='button' className='second-form-more-experience-button' onClick={() => setShowComponent(!showComponent)} >მეტი სასწავლებლის დამატება</button>
                        </div>
                        <div className='button-container-personal-experience'>
                            <button className='button' onClick={() => navigate('/personalExperience')} >{backButton}</button>
                            <button className='button'>{nextButton}</button>
                        </div>
                    </form>
                </div>
                <div>
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
                        {/* ......................................................................... */}
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
                        {/* ................................. */}
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
                        <div className='second-form-description-container'>
                            <p className='second-form-description-text'>{anotherJobDescription}</p>
                        </div>
                        {aboutMyself ? <p className='second-form-about-myself-line'></p> : ""}
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
            </div>
        </>
    )
}

export default PersonalEducation