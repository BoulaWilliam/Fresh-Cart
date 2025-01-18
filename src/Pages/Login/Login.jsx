import { useFormik } from 'formik';
import { object, string } from 'yup';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { userContext } from '../../context/UserContext/User.context';

export default function Login() {
  let { setToken } = useContext(userContext);
  const navigate = useNavigate();
  const [wrongEmailOrPassword, setWrongEmailOrPassword] = useState(null);
  const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const validationSchema = object({
    email: string().required('Email is Required').email('Email is Invalid!'),
    password: string()
      .required('Password is Required!')
      .matches(
        passRegex,
        'Password should be at least 8 characters, include one uppercase letter, one lowercase letter, one number, and one special character'
      ),
  });

  async function sendDataToLogin(values) {
    const loadingToastId = toast.loading('Waiting...');
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
      if (data.message === "success") {
        localStorage.setItem("userToken", data.token);
        setToken(data.token);
        toast.success("User Logged In Successfully");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      setWrongEmailOrPassword(error.response?.data?.message);
    } finally {
      toast.dismiss(loadingToastId);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: sendDataToLogin,
  });

  return (
    <>
      <h1 className="text-xl text-slate-700 font-semibold mb-5">
        <i className="fa-regular fa-circle-user"></i> Login
      </h1>
      <form className="space-y-3 mb-3" onSubmit={formik.handleSubmit}>

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

          {wrongEmailOrPassword && (
            <p className="text-red-500 mt-1 text-sm">*{wrongEmailOrPassword}</p>
          )}
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="btn bg-primary-700 w-full hover:bg-primary-800 text-white"
        >
          Login
        </button>
      </form>

      {/* Register NavLink */}
      <NavLink
        to={'/signup'}
        className="btn  bg-primary-700 w-full hover:bg-primary-800 text-white text-center block"
      >
        Don't Have An Account?
      </NavLink>

    </>
  );
}
