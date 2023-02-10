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

const personalExperience = "გამოცდილება".toUpperCase();
const nextButton = "შემდეგი".toUpperCase();
const backButton = "უკან".toUpperCase()

const PersonalExperience = () => {

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

  const POSITION_EMPLOYER_DESCRIPTION_REGEX = /^[A-Za-zა-ჰ.,;:!?'"0-9]{2,}( [A-Za-zა-ჰ.,;:!?'"0-9]+)*$/;
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
      navigate('/personalEducation')
    } else if (setDefaultValues()) {
      console.log(data)
      navigate("/personalEducation");
    } else {
      console.log(Object.keys(errors).length)
    }
  };

  const [showComponent, setShowComponent] = useState(
    JSON.parse(localStorage.getItem("showComponent")) || false
  );

  useEffect(() => {
    localStorage.setItem("showComponent", JSON.stringify(showComponent));
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
              <div><span className='personal-information-title'>{personalExperience}</span></div>
              <div><span className='personal-information-pages'>2/3</span></div>
            </div>
            <div className='position-container-personal-experience'>
              <span className={errors.position ? 'email-error-title' : 'email-default-title'}>თანამდებობა</span>
              <div className='email-input-and-error-container'>
                <input
                  type='text'
                  placeholder='დეველოპერი, დიზაინერი, ა.შ.'
                  className={position && !errors.position && POSITION_EMPLOYER_DESCRIPTION_REGEX.test(position) ? "email-success-input" : errors.position ? "email-error-input" : "email-default-input "}
                  {...register('position', { required: true, pattern: POSITION_EMPLOYER_DESCRIPTION_REGEX })} />
                <span className='input-error'>
                  {position && !errors.position && POSITION_EMPLOYER_DESCRIPTION_REGEX.test(position) ? (<img src={checkMark} alt='green checkmark' />) : errors.position ? (<img src={exclamationMark} alt='red exclamation mark' />) : ""}
                </span>
              </div>
              <span className='input-hint'>მინიმუმ 2 სიმბოლო</span>
            </div>
            <div className='employer-container-personal-experience'>
              <span className={errors.position ? 'email-error-title' : 'email-default-title'}>დამსაქმებელი</span>
              <div className='email-input-and-error-container'>
                <input
                  type='text'
                  placeholder='დამსაქმებელი'
                  className={employer && !errors.employer && POSITION_EMPLOYER_DESCRIPTION_REGEX.test(employer) ? "email-success-input" : errors.employer ? "email-error-input" : "email-default-input "}
                  {...register('employer', { required: true, pattern: POSITION_EMPLOYER_DESCRIPTION_REGEX })} />
                <span className='input-error'>
                  {employer && !errors.employer && POSITION_EMPLOYER_DESCRIPTION_REGEX.test(employer) ? (<img src={checkMark} alt='green checkmark' />) : errors.employer ? (<img src={exclamationMark} alt='red exclamation mark' />) : ""}
                </span>
              </div>
              <span className='input-hint'>მინიმუმ 2 სიმბოლო</span>
            </div>
            <div className='date-container'>
              <div className='firstName-container'>
                <span className={errors.firstName ? 'firstName-error-title' : 'firstName-default-title'}>დაწყების რიცხვი</span>
                <div className='firstname-input-and-error-container'>
                  <input type='date' id='FIRST_NAME'
                    {...register('startDate', { required: true })}
                    className={startDate && !errors.startDate ? "email-success-input" : errors.startDate ? "email-error-input" : "email-default-input "}
                  />
                </div>
              </div>
              <div className='lastName-container'>
                <span className={errors.lastName ? 'lastName-error-title' : 'lastName-default-title'}>დამთავრების რიცხვი</span>
                <div className='lastname-input-and-error-container'>
                  <input type='date' id='FIRST_NAME'
                    {...register('endDate', { required: true })}
                    className={endDate && !errors.endDate ? "email-success-input" : errors.endDate ? "email-error-input" : "email-default-input "} />
                </div>
              </div>
            </div>
            <div className='description-container'>
              <span className='about-myself-title'>აღწერა</span>
              <input
                type='text'
                className={jobDescription && !errors.jobDescription ? "description-success-input" : errors.jobDescription ? "description-error-input" : "description-default-input "}
                placeholder='როლი თანანმდებობაზე და ზოგადი აღწერა'
                {...register('jobDescription', { required: true, pattern: POSITION_EMPLOYER_DESCRIPTION_REGEX })}
              />
            </div>
            <p className='second-form-description-horizontal-line'></p>
            <div>
              {/* ....................................................... */}
              {showComponent ?
                <>
                  <div className='another-position-container-personal-experience'>
                    <span className={errors.anotherPosition ? 'email-error-title' : 'email-default-title'}>თანამდებობა</span>
                    <div className='email-input-and-error-container'>
                      <input
                        type='text'
                        placeholder='დეველოპერი, დიზაინერი, ა.შ.'
                        className={errors.anotherPosition ? "email-error-input" : "email-default-input "}
                        {...register('anotherPosition', { required: true, pattern: POSITION_EMPLOYER_DESCRIPTION_REGEX })} />
                      <span className='input-error'>
                        {anotherPosition && !errors.anotherPosition && POSITION_EMPLOYER_DESCRIPTION_REGEX.test(anotherPosition) ?
                          (<img src={checkMark} alt='green checkmark' />) : errors.anotherPosition ? (<img src={exclamationMark} alt='red exclamation mark' />) : ""}
                      </span>
                    </div>
                    <span className='input-hint'>მინიმუმ 2 სიმბოლო</span>
                  </div>

                  <div className='another-position-container-personal-experience'>
                    <span className={errors.anotherEmployer ? 'email-error-title' : 'email-default-title'}>დამსაქმებელი</span>
                    <div className='email-input-and-error-container'>
                      <input
                        type='text'
                        placeholder='დამსაქმებელი'
                        className={errors.anotherEmployer ? "email-error-input" : "email-default-input "}
                        {...register('anotherEmployer', { required: true, pattern: POSITION_EMPLOYER_DESCRIPTION_REGEX })} />
                      <span className='input-error'>
                        {anotherEmployer && !errors.anotherEmployer && POSITION_EMPLOYER_DESCRIPTION_REGEX.test(anotherEmployer) ?
                          (<img src={checkMark} alt='green checkmark' />) : errors.anotherEmployer ? (<img src={exclamationMark} alt='red exclamation mark' />) : ""}
                      </span>
                    </div>
                    <span className='input-hint'>მინიმუმ 2 სიმბოლო</span>
                  </div>
                  <div className='date-container'>
                    <div className='firstName-container'>
                      <span className={errors.anotherStartDate ? 'firstName-error-title' : 'firstName-default-title'}>დაწყების რიცხვი</span>
                      <div className='firstname-input-and-error-container'>
                        <input type='date' id='FIRST_NAME'
                          {...register('anotherStartDate', { required: true })}
                          className={anotherStartDate && !errors.anotherStartDate ? "email-success-input" : errors.anotherStartDate ? "email-error-input" : "email-default-input "}
                        />
                      </div>
                    </div>
                    <div className='lastName-container'>
                      <span className={errors.anotherEndDate ? 'lastName-error-title' : 'lastName-default-title'}>დამთავრების რიცხვი</span>
                      <div className='lastname-input-and-error-container'>
                        <input type='date' id='FIRST_NAME'
                          {...register('anotherEndDate', { required: true })}
                          className={anotherEndDate && !errors.anotherEndDate ? "email-success-input" : errors.anotherEndDate ? "email-error-input" : "email-default-input "} />
                      </div>
                    </div>
                  </div>
                  <div className='another-description-container'>
                    <span className='about-myself-title'>აღწერა</span>
                    <input
                      type='text'
                      className={anotherJobDescription && !errors.anotherJobDescription ? "description-success-input" : errors.anotherJobDescription ? "description-error-input" : "description-default-input "}
                      placeholder='როლი თანანმდებობაზე და ზოგადი აღწერა'
                      {...register('anotherJobDescription', { required: true, pattern: POSITION_EMPLOYER_DESCRIPTION_REGEX })}
                    />
                  </div>
                </> : null}
            </div>
            {/* ..................................................................... */}
            <div>
              <button type='button' className='second-form-more-experience-button' onClick={() => setShowComponent(!showComponent)} >მეტი გამოცდილების დამატება</button>
            </div>
            <div className='button-container-personal-experience'>
              <button className='button' onClick={() => navigate('/personalInformation')} >{backButton}</button>
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
          </div>
        </div>
      </div>
    </>
  )
}

export default PersonalExperience