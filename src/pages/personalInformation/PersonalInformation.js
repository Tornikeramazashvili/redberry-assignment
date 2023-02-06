import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import './PersonalInformation.css'

import checkMark from "../../assets/images/greenCheckmark.svg"
import exclamationMark from '../../assets/images/redExclamationMark.svg'

const PersonalInfoGeorgianString = "პირადი ინფო";
const PersonalInfo = PersonalInfoGeorgianString.toUpperCase();

const buttonGeorgianString = "შემდეგი"
const button = buttonGeorgianString.toUpperCase();


const PersonalInformation = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({

    defaultValues: {
      firstName: "",
      lastName: "",
      aboutMyself: "",
      email: "",
      mobile: "",
      image: ""
    }
  })

  const firstName = watch('firstName');
  const lastName = watch('lastName')
  const aboutMyself = watch('aboutMyself')
  const email = watch('email')
  const mobile = watch('mobile')
  const image = watch('image')


  const [fileName, setFileName] = useState('');

  const handleChange = (event) => {
    setFileName(event.target.files[0].name);
  };


  return (
    <>
      <div className='container'>
        <div className='form-container'>
          <form onSubmit={handleSubmit((data) => {
            console.log(data)
          })}>
            <div className='personal-information-container'>
              <div><span className='personal-information-title'>{PersonalInfo}</span></div>
              <div><span className='personal-information-pages'>1/3</span></div>
            </div>
            <div className='firstName-lastName-container'>
              <div className='firstName-container'>
                <span className={errors.firstName ? 'firstName-error-title' : 'firstName-default-title'}>სახელი</span>
                <div className='firstname-input-and-error-container'>
                  <input type='text' id='FIRST_NAME' className={firstName && !errors.firstName ? "firstName-success-input" : errors.firstName ? "firstName-error-input" : "firstName-default-input"}
                    {...register('firstName', { required: true, minLength: 2, pattern: /^[ა-ჰ]+$/ })} placeholder='ანზორ' />
                  <span className='firstname-input-error'>
                    {firstName && !errors.firstName ? (<img src={checkMark} alt='green checkmark' />) : errors.firstName ? (<img src={exclamationMark} alt='red exclamation mark' />) : ""}
                  </span>
                </div>
                <span className='input-hint'>მინიმუმ 2 ასო, ქართული ასოები</span>
              </div>
              <div className='lastName-container'>
                <span className={errors.firstName ? 'lastName-error-title' : 'lastName-default-title'}>გვარი</span>
                <div className='lastname-input-and-error-container'>
                  <input
                    type='text'
                    id='LAST_NAME'
                    className={lastName && !errors.lastName ? "lastName-success-input" : errors.lastName ? "lastName-error-input" : "lastName-default-input"}
                    {...register('lastName', { required: true, minLength: 2, pattern: /^[ა-ჰ]+$/ })} placeholder='მუმლაძე' />
                  <span className='lastname-input-error'>
                    {lastName && !lastName.firstName ? (<img src={checkMark} alt='green checkmark' />) : errors.lastName ? (<img src={exclamationMark} alt='red exclamation mark' />) : ""}
                  </span>
                </div>
                <span className='input-hint'>მინიმუმ 2 ასო, ქართული ასოები</span>
              </div>
            </div>
            <div className='upload-image-container'>
              <span className='upload-image-title'>პირადი ფოტოს ატვირთვა</span>
              <label className='upload-button-container'>
                <input className='upload-image-input' onChange={handleChange} {...register('image', { required: true, pattern: /\.(jpeg|jpg|png)$/ })} type='file' />
                <p>ატვირთვა</p>
                <span className='upload-image-input-error'>
                  {image && !errors.image ? <img src={checkMark} alt='green checkmark' /> : errors.image && <img src={exclamationMark} alt='red exclamation mark' />}
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
                  className={email && !errors.email ? "email-success-input" : errors.email ? "email-error-input" : "email-default-input "}
                  {...register('email', {
                    required: true, pattern: { value: /^[a-zA-Z]+@redberry.ge$/ }
                  })} />
                <span className='input-error'>
                  {email && !errors.email ? (<img src={checkMark} alt='green checkmark' />) : errors.email ? (<img src={exclamationMark} alt='red exclamation mark' />) : ""}
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
                  className={mobile && !errors.mobile ? "mobile-success-input" : errors.mobile ? "mobile-error-input" : "mobile-default-input"}
                  {...register('mobile', {
                    required: true, pattern: { value: /^\+995\d{9}$/ }
                  })} />
                <span className='input-error'>
                  {mobile && !errors.mobile ? (<img src={checkMark} alt='green checkmark' />) : errors.mobile ? (<img src={exclamationMark} alt='red exclamation mark' />) : ""}
                </span>
              </div>
              <span className='input-hint'>უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს</span>
            </div>
            <div className='button-container'>
              <button className='button' type="submit">{button}</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default PersonalInformation