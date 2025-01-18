import { useFormik } from 'formik';
import { object, ref, string } from 'yup';
import axios from 'axios';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'

export default function Signup() {

  const navigate = useNavigate()

  const [existAccountError, setExistAccountError] = useState(null);
  const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const phoneRegex = /^(02)?01[0125][0-9]{8}$/;

  const validationSchema = object({
    name: string()
      .required('Name is Required')
      .min(3, 'Name Must Be At Least 3 Chars!')
      .max(25, "Name Can't Be More Than 25 Chars!"),
    email: string().required('Email is Required').email('Email is Invalid!'),
    password: string()
      .required('Password is Required!')
      .matches(
        passRegex,
        'Password should be at least 8 characters, include one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    rePassword: string()
      .required('Confirm Password is Required')
      .oneOf([ref('password')], 'Password and Confirm Password must be the Same'),
    phone: string()
      .required('Phone Number is Required!')
      .matches(phoneRegex, 'Only valid Egyptian phone numbers are accepted'),
  });

  async function sendDataToRegister(values) {
    const loadingToastId = toast.loading('Waiting...');
    try {
      const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/signup',
        values
      );
      if (data.message === 'success') {
        toast.success('User Created Successfully!');
        setTimeout(() => {
          navigate("/login")
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message)
      setExistAccountError(error.response?.data?.message);
    }finally{
      toast.dismiss(loadingToastId);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema,
    onSubmit: sendDataToRegister,
  });

  return (
    <>
      <h1 className="text-xl text-slate-700 font-semibold mb-5">
        <i className="fa-regular fa-circle-user"></i> Register Now
      </h1>
      <form className="space-y-3" onSubmit={formik.handleSubmit}>
        {/* Name */}
        <div className="name">
          <input
            type="text"
            className="form-control w-full"
            placeholder="Type your name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="name"
          />
          {formik.errors.name && formik.touched.name && (
            <p className="text-red-500 mt-1 text-sm">*{formik.errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="email">
          <input
            type="email"
            className="form-control w-full"
            placeholder="Email Address"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500 mt-1 text-sm">*{formik.errors.email}</p>
          )}
          {existAccountError && (
            <p className="text-red-500 mt-1 text-sm">*{existAccountError}</p>
          )}
        </div>

        {/* Password */}
        <div className="password">
          <input
            type="password"
            className="form-control w-full"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-500 mt-1 text-sm">*{formik.errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="rePassword">
          <input
            type="password"
            className="form-control w-full"
            placeholder="Confirm your Password"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="rePassword"
          />
          {formik.errors.rePassword && formik.touched.rePassword && (
            <p className="text-red-500 mt-1 text-sm">*{formik.errors.rePassword}</p>
          )}
        </div>

        {/* Phone */}
        <div className="phone">
          <input
            type="tel"
            className="form-control w-full"
            placeholder="Phone Number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="phone"
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className="text-red-500 mt-1 text-sm">*{formik.errors.phone}</p>
          )}
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="btn bg-primary-700 w-full hover:bg-primary-800 text-white"
        >
          Sign Up
        </button>
      </form>
    </>
  );
}
