import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import useFormPersist from 'react-hook-form-persist'

import './PersonalInformation.css'
import checkMark from "../../assets/images/greenCheckmark.svg"
import exclamationMark from '../../assets/images/redExclamationMark.svg'
import arrowLeft from '../../assets/images/arrow-left.svg'
import emailIcon from "../../assets/images/email.svg"
import mobileIcon from "../../assets/images/mobile.svg"

const PersonalInfo = "პირადი ინფო".toUpperCase();
const button = "შემდეგი".toUpperCase();

const PersonalInformation = () => {

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

  const handleChange = (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewUrl(event.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    setImg(e.target.files[0]);
  };

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
      <div className='container'>
        <div className="arrow-left-container" >
          <img src={arrowLeft} className='arrow-left' alt='arrow left logo' onClick={() => navigate(-1)} />
        </div>
        <div className='form-container'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='personal-information-container'>
              <div><span className='personal-information-title'>{PersonalInfo}</span></div>
              <div><span className='personal-information-pages'>1/3</span></div>
            </div>
            <div className='firstName-lastName-container'>
              <div className='firstName-container'>
                <span className={errors.firstName ? 'firstName-error-title' : 'firstName-default-title'}>სახელი</span>
                <div className='firstname-input-and-error-container'>
                  <input type='text' id='FIRST_NAME' className={firstName && !errors.firstName && NAMES_REGEX.test(firstName) ? "firstName-success-input" : errors.firstName ? "firstName-error-input" : "firstName-default-input"}
                    {...register('firstName', { required: true, minLength: 2, pattern: NAMES_REGEX })} placeholder='ანზორ' />
                  <span className='firstname-input-error'>
                    {firstName && !errors.firstName && NAMES_REGEX.test(firstName) ? (<img src={checkMark} alt='green checkmark' />) : errors.firstName ? (<img src={exclamationMark} alt='red exclamation mark' />) : ""}
                  </span>
                </div>
                <span className='input-hint'>მინიმუმ 2 ასო, ქართული ასოები</span>
              </div>
              <div className='lastName-container'>
                <span className={errors.lastName ? 'lastName-error-title' : 'lastName-default-title'}>გვარი</span>
                <div className='lastname-input-and-error-container'>
                  <input
                    type='text'
                    id='LAST_NAME'
                    className={lastName && !errors.lastName && NAMES_REGEX.test(lastName) ? "lastName-success-input" : errors.lastName ? "lastName-error-input" : "lastName-default-input"}
                    {...register('lastName', { required: true, minLength: 2, pattern: NAMES_REGEX })} placeholder='მუმლაძე' />
                  <span className='lastname-input-error'>
                    {lastName && !errors.lastName && NAMES_REGEX.test(lastName) ? (<img src={checkMark} alt='green checkmark' />) : errors.lastName ? (<img src={exclamationMark} alt='red exclamation mark' />) : ""}
                  </span>
                </div>
                <span className='input-hint'>მინიმუმ 2 ასო, ქართული ასოები</span>
              </div>
            </div>
            <div className='upload-image-container'>
              <span className='upload-image-title'>პირადი ფოტოს ატვირთვა</span>
              <label className='upload-button-container'>
                <input type="file" onChange={handleChange} className='upload-image-input' {...register('image', { required: true, pattern: /\.(jpeg|jpg|png)$/ })} />
                <p>ატვირთვა</p>
                <span className='upload-image-input-error'>
                  {image?.length > 0 && !errors.image ? <img src={checkMark} alt='green checkmark' /> : errors.image && <img src={exclamationMark} alt='red exclamation mark' />}
                </span>
              </label>
            </div>
            <div className='about-myself-container'>
              <span className='about-myself-title'>ჩემ შესახებ (არასავალდებულო)</span>
              <input
                type='text'
                className='about-myself-input'
                placeholder='ზოგადი ინფო შენ შესახებ'
                {...register('aboutMyself')}
              />
            </div>
            <div className='email-container'>
              <span className={errors.email ? 'email-error-title' : 'email-default-title'}>ელ.ფოსტა</span>
              <div className='email-input-and-error-container'>
                <input
                  type='email'
                  placeholder='anzorr666@redberry.ge'
                  className={email && !errors.email && EMAIL_REGEX.test(email) ? "email-success-input" : errors.email ? "email-error-input" : "email-default-input "}
                  {...register('email', { required: true, pattern: EMAIL_REGEX })} />
                <span className='input-error'>
                  {email && !errors.email && EMAIL_REGEX.test(email) ? (<img src={checkMark} alt='green checkmark' />) : errors.email ? (<img src={exclamationMark} alt='red exclamation mark' />) : ""}
                </span>
              </div>
              <span className='input-hint'>უნდა მთავრდებოდეს @redberry.ge-ით</span>
            </div>
            <div className='mobile-container'>
              <span className={errors.mobile ? 'mobile-error-title' : 'mobile-default-title'}>მობილურის ნომერი</span>
              <div className='mobile-input-and-error-container'>
                <input
                  placeholder='+995 551 12 34 56'
                  type='tel'
                  className={mobile && !errors.mobile && MOBILE_REGEX.test(mobile) ? "mobile-success-input" : errors.mobile ? "mobile-error-input" : "mobile-default-input"}
                  {...register('mobile', { required: true, pattern: MOBILE_REGEX })} />
                <span className='input-error'>
                  {mobile && !errors.mobile && MOBILE_REGEX.test(mobile) ? (<img src={checkMark} alt='green checkmark' />) : errors.mobile ? (<img src={exclamationMark} alt='red exclamation mark' />) : ""}
                </span>
              </div>
              <span className='input-hint'>უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს</span>
            </div>
            <div className='button-container'>
              <button className='button' type="submit" >{button}</button>
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
              {/* როცა მეორე გვერდზე გადახვალ, მერე მიამატე ეს */}
              {/* {aboutMyself ? <p className='second-form-about-myself-line'></p> : ""} */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PersonalInformation