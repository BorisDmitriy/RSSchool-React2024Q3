import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { addFormData } from './store/formSlice';
import { RootState } from './store/store';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter'),
  age: yup.number().positive().integer().required('Age is required'),
  email: yup.string().email().required('Email is required'),
  passwords: yup.object().shape({
    password: yup
      .string()
      .required('Password is required')
      .matches(/\d/, 'Password must contain a number')
      .matches(/[a-z]/, 'Password must contain a lowercase letter')
      .matches(/[A-Z]/, 'Password must contain an uppercase letter')
      .matches(/[\W_]+/, 'Password must contain a special character'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match'),
  }),
  gender: yup.string().required('Gender is required'),
  termsAccepted: yup
    .bool()
    .oneOf([true], 'You must accept the terms and conditions'),
  picture: yup
    .mixed()
    .required('Please upload a picture')
    .test('is-empty', 'Please upload a picture', (value) => value !== '')
    .test(
      'fileSize',
      'File Size is too large, select file less than 4 MB',
      (value) => {
        if (!value || typeof value !== 'string') return false;

        // Calculate the approximate size of the uploaded file based on base64 string
        const base64StringLength =
          value.length - 'data:image/png;base64,'.length;
        const fileSizeInBytes = (base64StringLength * 3) / 4;

        return fileSizeInBytes <= 4000000; // Check if the file size is within the 4MB limit
      },
    )
    .test(
      'fileType',
      'Unsupported File Format, select png or jpeg files',
      (value) => {
        if (!value || typeof value !== 'string') return false;

        // Check if the value is a base64 string with the correct MIME type
        const matches = /^data:image\/(jpeg|png);base64,/.test(value);
        return matches;
      },
    ),
  country: yup.string().required(),
});

export default function UncontroledFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const countries = useSelector(
    (state: RootState) => state.countries.allCountries,
  );

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = formRef.current;
    const formData = new FormData(form!);

    const data = {
      name: formData.get('name') as string,
      age: Number(formData.get('age')),
      email: formData.get('email') as string,
      passwords: {
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirmPassword') as string,
      },
      gender: formData.get('gender') as string,
      termsAccepted: formData.get('termsAccepted') === 'on',
      picture:
        (formData.get('picture') as File).size > 0
          ? await toBase64(formData.get('picture') as File)
          : '',
      country: formData.get('country') as string,
    };

    try {
      // Validate using Yup schema
      await schema.validate(data, { abortEarly: false });

      // Dispatch action to store data in Redux
      dispatch(
        addFormData({
          ...data,
          password: data.passwords.password,
        }),
      );

      // Clear errors if validation is successful
      setErrors({});

      // go to main
      navigate('/');
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors = err.inner.reduce(
          (acc, curr) => {
            if (curr.path) {
              acc[curr.path] = curr.message;
            }
            return acc;
          },
          {} as { [key: string]: string },
        );
        setErrors(newErrors);
      }
    }
  };

  return (
    <>
      <form className="form" ref={formRef} onSubmit={handleSubmit}>
        <h2>Uncontroled Form Page</h2>
        {/* Name Field */}
        <label htmlFor="name">
          Name
          <input type="text" id="name" name="name" />
        </label>
        {errors.name && <div className="error">{errors.name}</div>}

        {/* Age Field */}
        <label htmlFor="age">
          Age
          <input type="number" id="age" name="age" />
        </label>
        {errors.age && <div className="error">{errors.age}</div>}

        {/* Email Field */}
        <label htmlFor="email">
          Email
          <input type="email" id="email" name="email" />
        </label>
        {errors.email && <div className="error">{errors.email}</div>}

        {/* Password Fields */}
        <label htmlFor="password">
          Password
          <input type="password" id="password" name="password" />
        </label>
        {errors['passwords.password'] && (
          <div className="error">{errors['passwords.password']}</div>
        )}

        <label htmlFor="confirmPassword">
          Confirm Password
          <input type="password" id="confirmPassword" name="confirmPassword" />
        </label>
        {errors['passwords.confirmPassword'] && (
          <div className="error">{errors['passwords.confirmPassword']}</div>
        )}

        {/* Gender Radio Buttons */}
        <p>Gender</p>
        <label htmlFor="male">
          Male
          <input type="radio" id="male" name="gender" value="male" />
        </label>
        <label htmlFor="female">
          Female
          <input type="radio" id="female" name="gender" value="female" />
        </label>
        {errors.gender && <div className="error">{errors.gender}</div>}

        {/* Terms and Conditions Checkbox */}
        <label htmlFor="termsAccepted">
          Accept Terms and Conditions
          <input type="checkbox" id="termsAccepted" name="termsAccepted" />
        </label>
        {errors.termsAccepted && (
          <div className="error">{errors.termsAccepted}</div>
        )}

        {/* Picture Upload */}
        <label htmlFor="picture">
          Upload Picture
          <input
            type="file"
            id="picture"
            name="picture"
            accept=".png,.jpeg,.jpg"
          />
        </label>
        {errors.picture && <div className="error">{errors.picture}</div>}

        {/* Country Autocomplete */}
        <label htmlFor="country">
          Country
          <select id="country" name="country">
            {countries.map((country: string) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>
        {errors.country && <div className="error">{errors.country}</div>}

        {/* Submit Button */}
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
      <div className="btn-control">
        <Link className="btn" to="/">
          Back to main
        </Link>
      </div>
    </>
  );
}
