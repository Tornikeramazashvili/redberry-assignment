import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import './PersonalInformation.css'

const PersonalInformation = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({

    defaultValues: {
      firstName: "",
      lastName: "",
      aboutMyself: "",
      email: "",
      mobile: "",
    }
  })

  const firstName = watch('firstName');
  const lastName = watch('lastName')
  const aboutMyself = watch('aboutMyself')
  const email = watch('email')
  const mobile = watch('mobile')

  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit((data) => {
          console.log(data)
        })}>
          <div className='firstName-lastName-container'>
            <div className='firstName-container'>
              <span className={errors.firstName ? 'firstName-error-title' : 'firstName-default-title'}>სახელი</span>
              <input id='FIRST_NAME' className={firstName && !errors.firstName ? "firstName-success-input" : errors.firstName ? "firstName-error-input" : "firstName-default-input"}
                {...register('firstName', { required: true, minLength: 2, pattern: /^[ა-ჰ]+$/ })} placeholder='ანზორ' />
              <span className='input-hint'>მინიმუმ 2 ასო, ქართული ასოები</span>
            </div>
            <div className='lastName-container'>
              <span className={errors.firstName ? 'lastName-error-title' : 'lastName-default-title'}>გვარი</span>
              <input
                id='LAST_NAME'
                className={errors.lastName ? "lastName-error-input" : "lastName-default-input"}
                {...register('lastName', { required: true, minLength: 2, pattern: /^[ა-ჰ]+$/ })} placeholder='მუმლაძე' />
              <span className='input-hint'>მინიმუმ 2 ასო, ქართული ასოები</span>
            </div>
          </div>
          <div className='textarea-container'>
            <span className='textarea-default'>ჩემ შესახებ (არასავალდებულო)</span>
            <input
              placeholder='ზოგადი ინფო შენ შესახებ'
              {...register('aboutMyself')}
            />
          </div>
          <div className='email-container'>
            <span className={errors.email ? 'email-error-title' : 'email-default-title'}>ელფოსტა</span>
            <input
              placeholder='anzorr666@redberry.ge'
              className={errors.email ? "email-error-input" : "email-default-input "}
              {...register('email', {
                required: true, pattern: { value: /^[a-z0-9._%+-]+@redberry.ge$/ }
              })} />
            <span className='input-hint'>უნდა მთავრდებოდეს @redberry.ge-ით</span>
          </div>
          <div className='mobile-container'>
            <span className={errors.mobile ? 'mobile-error-title' : 'mobile-default-title'}>მობილური</span>
            <input
              placeholder='+995 551 12 34 56'
              className={errors.mobile ? "mobile-error-input" : "mobile-default-input "}
              {...register('mobile', {
                required: true, pattern: { value: /^\+995\d{9}$/ }
              })} />
            <span className='input-hint'>უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს</span>
          </div>
          <button type="submit">submit</button>
        </form>
        {/* <div className='displaying-information'>
          <p>{firstName}</p>
          <br />
          <br />
          <p>{lastName}</p>
          <br />
          <br />
          <br />
          <br />
          <p>{aboutMyself}</p>
          <br />
          <p>{email}</p>
          <br />
          <p>{mobile}</p>
          <br />
          {errors.file && <span>This field is required</span>}
        </div> */}
      </div>
    </>
  )
}

export default PersonalInformation