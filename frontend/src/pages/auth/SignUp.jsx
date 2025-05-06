import { useContext, useState } from 'react';
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { assets } from '../../assets/assete';
import axios from "axios";
import { AppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const SignUp = () => {
  const { backend_url, setToken } = useContext(AppContext);
  const [image, setImage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoging, setIsLoging] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const navigate = useNavigate();

  // Schema 
  const schema = z.object({
    username: z.string({ required_error: "Username Is Required" }).min(2, { message: "Username Must Be At Least 2 Characters" }).max(100),
    email: z.string({ required_error: "Email Is Required" }).email({ message: "Please Enter a Valid Email." }),
    password: z.string({ required_error: "Password Is Requried" }).min(6, { message: "Password Must Be At Least 6 Characters" }).max(600)
  });


  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(schema)
  });


  // OnSubmit Handler
  const onSubmitHandler = async (data) => {
    setIsLoging(true);
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("image", image);
      const response = await axios.post(backend_url + "/api/user/signup", formData);
      if (response.data.success) {
        window.localStorage.setItem("token", response.data.user.token);
        setToken(response.data.user.token);
        toast.success(response.data.message);
        navigate("/");
      }
      setIsLoging(false);
    } catch (error) {
      setIsLoging(false);
      setSubmitError(error.response.data.message || error.message);
    }
  };

  return (
    <div className='min-h-[70vh] py-20 px-[3vw] sm:px-[4vw] md:px-[5vw] lg:px-[7vw] flex items-center justify-center'>

      <div className='w-full md:w-[600px] p-10 border border-gray-200 shadow-lg'>
        <h2 className='text-center text-3xl font-semibold text-gray-800'>Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmitHandler)} className='flex flex-col gap-5'>

          {/* Username */}
          <div>
            <label htmlFor='username' className='block text-gray-700 font-medium mb-1 ml-1'>Username</label>
            <input type="text" placeholder='Type Here ...' id='username'
              {...register("username")}
              className='block w-full py-2 px-3 rounded-md border border-gray-400 outline-primary'
            ></input>
            {errors.username && <p className='text-sm mt-1 ml-1 text-red-600 font-medium'>{errors.username.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor='email' className='block text-gray-700 font-medium mb-1 ml-1'>Email</label>
            <input type="text" placeholder='Type Here ...' id='email'
              {...register("email")}
              className='block w-full py-2 px-3 rounded-md border border-gray-400 outline-primary'
            ></input>
            {errors.email && <p className='text-sm mt-1 ml-1 text-red-600 font-medium'>{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor='password' className='block text-gray-700 font-medium mb-1 ml-1'>password</label>
            <div className='relative'>
              <input type={showPassword ? "text" : "password"} placeholder='Type Here ...' id='password'
                {...register("password")}
                className='block w-full py-2 px-3 rounded-md border border-gray-400 outline-primary'></input>
              {
                showPassword
                  ?
                  <FaRegEyeSlash onClick={() => { setShowPassword(false); }} className='absolute top-[50%] -translate-y-[50%] right-[20px] text-2xl text-gray-800 cursor-pointer' />
                  :
                  <IoEyeOutline onClick={() => { setShowPassword(true); }} className='absolute top-[50%] -translate-y-[50%] right-[20px] text-2xl text-gray-800 cursor-pointer' />
              }
            </div>
            {errors.password && <p className='text-sm mt-1 ml-1 text-red-600 font-medium'>{errors.password.message}</p>}
          </div>

          {/* Image */}
          <div>
            <p className='block text-gray-700 font-medium mb-1'>Upload Image</p>
            <label htmlFor='image' className='block w-full py-2 px-3 rounded-md border border-gray-400 cursor-pointer'>
              <img src={image ? URL.createObjectURL(image) : assets.upload_area} className='w-20 h-20 rounded-full border border-primary mx-auto p-1 bg-grag-400' />
              <input type="file" id='image' hidden onChange={(event) => { setImage(event.target.files[0]); }} />
            </label>
          </div>
          {/* Button Sign up */}
          <button type="submit"
            disabled={isLoging ? true : false}
            className={`bg-primary text-white block w-full py-2 px-4 rounded-md font-medium ${isLoging ? "cursor-not-allowed" : "transition-all duration-300 hover:bg-blue-700 cursor-pointer"}`}>
            {isLoging ? "Loading ..." : "Sign Up"}
          </button>
        </form>

        {/* Already Have An Acc */}
        <div className='pt-8 text-gray-600 font-medium flex items-center gap-2'>
          <p>Already Have An Account?</p>
          <span className='font-semibold text-primary underline cursor-pointer'
            onClick={() => { navigate("/login"); }}
          >Login</span>
        </div>

        {/* Show Submit Error */}
        {
          submitError &&
          <div className='mt-5 bg-gray-200 py-2 px-3 text-center text-red-600'>
            <p>{submitError}</p>
          </div>
        }

      </div>

    </div>
  );
};

export default SignUp;
