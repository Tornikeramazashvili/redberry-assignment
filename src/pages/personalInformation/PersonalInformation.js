import React from 'react'
import { useForm } from 'react-hook-form'
import './PersonalInformation.css'

const PersonalInformation = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      aboutMyself: "",
      email: ""
    }
  })

  const firstName = watch('firstName');
  const lastName = watch('lastName')
  const aboutMyself = watch('aboutMyself')
  const email = watch('email')

  console.log(email)


  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit((data) => {
          console.log(data)
        })}>
          <input {...register('firstName', { required: true, minLength: 2 })} placeholder='ანზორ' />
          <br />
          <span style={{ fontSize: 12 }}>მინიმუმ 2 ასო, ქართული ასოები</span>
          <br />
          <br />
          <input {...register('lastName', { required: true, minLength: 2 })} placeholder='მუმლაძე' />
          <br />
          <span style={{ fontSize: 12 }}>მინიმუმ 2 ასო, ქართული ასოები</span>
          <br />
          <br />
          <label>
            <p className='zaza'>        ჩემს შესახებ (არასავალდებულო)</p>
            <br />
            <br />
            <input
              type="text"
              {...register('aboutMyself')}
            />
            <br />
          </label>
          <br />
          <span className={errors.email ? 'email-error-title' : 'email-no-error-title'}>ელფოსტა</span> <br />
          <input
            className={errors.email ? "email-error-input" : "email-no-error-input "}
            {...register('email', {
              required: true, pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              }
            })} />
          <br />
          <input type="submit" />
        </form>
        <div className='displaying-information'>
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
        </div>
      </div>
    </>
  )
}

export default PersonalInformation