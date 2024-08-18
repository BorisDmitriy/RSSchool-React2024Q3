import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { addFormData } from './store/formSlice';
import { RootState } from './store/store';
import { IFormInput } from '../types/types';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter'),
  age: yup
    .number()
    .typeError('Age must be a number')
    .positive('Must be positive number')
    .required('Age is required')
    .integer('Must be integer'),
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
    .required('A picture is required')
    .test(
      'filePresence',
      'Please upload a picture', // Error message if the test fails
      (value) =>
        // Check if value is a FileList with at least one file
        value instanceof FileList && value.length > 0,
    )
    .test(
      'fileSize',
      'File Size is too large, select a file less than 4 MB',
      (value) => {
        // Only perform this test if value is a FileList with at least one file
        if (value instanceof FileList && value.length > 0) {
          const file = value[0];
          return file.size <= 4000000; // 4MB limit
        }
        return true; // Skip test if no file is present
      },
    )
    .test(
      'fileType',
      'Unsupported File Format, select PNG or JPEG files',
      (value) => {
        // Only perform this test if value is a FileList with at least one file
        if (value instanceof FileList && value.length > 0) {
          const file = value[0];
          return /image\/(jpeg|png)/.test(file.type);
        }
        return true; // Skip test if no file is present
      },
    ),
  country: yup.string().required(),
});

export default function ControledFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector(
    (state: RootState) => state.countries.allCountries,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema) as unknown as Resolver<IFormInput>,
    mode: 'onChange', // Live validation
  });

  // Helper function to convert file to base64
  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    try {
      const pictureBase64 = await toBase64(data.picture[0]);

      const formData = {
        ...data,
        picture: pictureBase64,
        password: data.passwords.password,
        confirmPassword: data.passwords.confirmPassword,
        termsAccepted: data.termsAccepted,
      };

      dispatch(addFormData(formData));

      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Controled Form Page</h2>
        {/* Name Field */}
        <label htmlFor="name">
          Name
          <input {...register('name')} type="text" id="name" />
        </label>
        {errors.name && <div className="error">{errors.name.message}</div>}

        {/* Age Field */}
        <label htmlFor="age">
          Age
          <input {...register('age')} type="number" id="age" name="age" />
        </label>
        {errors.age && <div className="error">{errors.age.message}</div>}

        {/* Email Field */}
        <label htmlFor="email">
          Email
          <input {...register('email')} type="email" id="email" name="email" />
        </label>
        {errors.email && <div className="error">{errors.email.message}</div>}

        {/* Password Fields */}
        <label htmlFor="password">
          Password
          <input
            {...register('passwords.password')}
            type="password"
            id="password"
          />
        </label>
        {errors.passwords?.password && (
          <div className="error">{errors.passwords.password.message}</div>
        )}

        <label htmlFor="confirmPassword">
          Confirm Password
          <input
            {...register('passwords.confirmPassword')}
            type="password"
            id="confirmPassword"
          />
        </label>
        {errors.passwords?.confirmPassword && (
          <div className="error">
            {errors.passwords.confirmPassword.message}
          </div>
        )}

        {/* Gender Radio Buttons */}
        <p>Gender</p>
        <label htmlFor="male">
          Male
          <input
            {...register('gender')}
            type="radio"
            id="male"
            name="gender"
            value="male"
          />
        </label>
        <label htmlFor="female">
          Female
          <input
            {...register('gender')}
            type="radio"
            id="female"
            name="gender"
            value="female"
          />
        </label>
        {errors.gender && <div className="error">{errors.gender.message}</div>}

        {/* Terms and Conditions Checkbox */}
        <label htmlFor="termsAccepted">
          Accept Terms and Conditions
          <input
            {...register('termsAccepted')}
            type="checkbox"
            id="termsAccepted"
            name="termsAccepted"
          />
        </label>
        {errors.termsAccepted && (
          <div className="error">{errors.termsAccepted.message}</div>
        )}

        {/* Picture Upload */}
        <label htmlFor="picture">
          Upload Picture
          <input
            {...register('picture')}
            type="file"
            id="picture"
            name="picture"
            accept=".png,.jpeg,.jpg"
          />
        </label>
        {errors.picture && (
          <div className="error">{errors.picture.message}</div>
        )}

        {/* Country Autocomplete */}
        <label htmlFor="country">
          Country
          <select {...register('country')} id="country">
            {countries.map((country: string) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>
        {errors.country && (
          <div className="error">{errors.country.message}</div>
        )}

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
