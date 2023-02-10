import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import useFormPersist from 'react-hook-form-persist'

import checkMark from "../assets/images/greenCheckmark.svg"
import exclamationMark from '../assets/images/redExclamationMark.svg'
import arrowLeft from '../assets/images/arrow-left.svg'
import emailIcon from "../assets/images/email.svg"
import mobileIcon from "../assets/images/mobile.svg"

const AddForm = () => {

  const [defaultValues, setDefaultValues] = useState({});
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({ defaultValues });
  ;
  const anotherPosition = watch('anotherPosition')
  const anotherEmployer = watch('anotherEmployer')
  const anotherStartDate = watch('anotherStartDate')
  const anotherEndDate = watch('anotherEndDate')
  const anotherJobDescription = watch('anotherJobDescription')

  const POSITION_EMPLOYER_DESCRIPTION_REGEX = /^[A-Za-zა-ჰ]{2,}( [A-Za-zა-ჰ]+)*$/;
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
      navigate('/personalExperience')
    } else if (setDefaultValues()) {
      console.log(data)
      navigate("/personalExperience");
    } else {
      console.log(Object.keys(errors).length)
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className='add-form-container'>
        <div className='another-position-container-personal-experience'>
          <span className={errors.anotherPosition ? 'email-error-title' : 'email-default-title'}>თანამდებობა</span>
          <div className='email-input-and-error-container'>
            <input
              type='text'
              placeholder='დეველოპერი, დიზაინერი, ა.შ.'
              className={anotherPosition && !errors.anotherPosition && EMAIL_REGEX.test(anotherPosition) ? "email-success-input" : errors.anotherPosition ? "email-error-input" : "email-default-input "}
              {...register('anotherPosition', { required: true, pattern: POSITION_EMPLOYER_DESCRIPTION_REGEX })} />
            <span className='input-error'>
              {anotherPosition && !errors.anotherPosition && POSITION_EMPLOYER_DESCRIPTION_REGEX.test(anotherPosition) ? (<img src={checkMark} alt='green checkmark' />) : errors.anotherPosition ? (<img src={exclamationMark} alt='red exclamation mark' />) : ""}
            </span>
          </div>
          <span className='input-hint'>მინიმუმ 2 სიმბოლო</span>
        </div>
      </div>

      <div className='employer-container-personal-experience'>
        <span className={errors.anotherEmployer ? 'email-error-title' : 'email-default-title'}>დამსაქმებელი</span>
        <div className='email-input-and-error-container'>
          <input
            type='text'
            placeholder='დამსაქმებელი'
            className={anotherEmployer && !errors.anotherEmployer && EMAIL_REGEX.test(anotherEmployer) ? "email-success-input" : errors.anotherEmployer ? "email-error-input" : "email-default-input "}
            {...register('anotherEmployer', { required: true, pattern: POSITION_EMPLOYER_DESCRIPTION_REGEX })} />
          <span className='input-error'>
            {anotherEmployer && !errors.anotherEmployer && POSITION_EMPLOYER_DESCRIPTION_REGEX.test(anotherEmployer) ? (<img src={checkMark} alt='green checkmark' />) : errors.anotherEmployer ? (<img src={exclamationMark} alt='red exclamation mark' />) : ""}
          </span>
        </div>
        <span className='input-hint'>მინიმუმ 2 სიმბოლო</span>
      </div>

      <div className='date-container'>
        <div className='firstName-container'>
          <span className={errors.firstName ? 'firstName-error-title' : 'firstName-default-title'}>დაწყების რიცხვი</span>
          <div className='firstname-input-and-error-container'>
            <input type='date' id='FIRST_NAME'
              {...register('anotherStartDate', { required: true })}
              className={anotherStartDate && !errors.anotherStartDate ? "email-success-input" : errors.anotherStartDate ? "email-error-input" : "email-default-input "}
            />
          </div>
        </div>
        <div className='lastName-container'>
          <span className={errors.lastName ? 'lastName-error-title' : 'lastName-default-title'}>დამთავრების რიცხვი</span>
          <div className='lastname-input-and-error-container'>
            <input type='date' id='FIRST_NAME'
              {...register('anotherEndDate', { required: true })}
              className={anotherEndDate && !errors.anotherEndDate ? "email-success-input" : errors.anotherEndDate ? "email-error-input" : "email-default-input "} />
          </div>
        </div>
      </div>

      <div className='add-form-description-container'>
        <span className='about-myself-title'>აღწერა</span>
        <input
          type='text'
          className={anotherJobDescription && !errors.anotherJobDescription ? "description-success-input" : errors.anotherJobDescription ? "description-error-input" : "description-default-input "}
          placeholder='როლი თანანმდებობაზე და ზოგადი აღწერა'
          {...register('anotherJobDescription', { required: true, pattern: POSITION_EMPLOYER_DESCRIPTION_REGEX })}
        />
      </div>
      <p className='second-form-description-horizontal-line'></p>
      </form>
    </>
  )
}

export default AddForm  