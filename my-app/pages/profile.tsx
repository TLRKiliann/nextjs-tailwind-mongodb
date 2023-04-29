import React, { useEffect } from 'react';
import { signin, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getError } from '@/utils/error';
import axios from 'axios';
import Layout from '@/components/Layout';

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function ProfileScreen = () => {
  const { data: session } = useSession()

  const { handleSubmit, register, getValues, setValue, formState } = useForm<FormValues>();
  const { errors } = formState;

  useEffect(() => {
    setValue("name", session.user.name)
    setValue("email", session.user.email)
  }, [session.user, setValue]);

  const handleSubmit = async ({name, email, password}: FormValues) => {
    try {
      await axios.put('/api/auth/update', {
        redirect: false,
        email,
        password,
      });
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      toast.success("Profile updated successfully")
      if (result?.error) {
        toast.error(result?.error);
      }
    } catch(err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Profile">

      <form onSubmit={() => handleSubmit(submitHandler)}
        className="mx-auto max-w-screen-md">

        <h1 className="mb-4 text-xl">Update Profile</h1>


        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input type="text" 
            {...register("name", {
              required: "Please enter name"})}
            className="w-full" id="name" autoFocus
          />
            {errors.name && (
              <div className="text-red-500">
                {errors.name.message}
              </div>
            )}
        </div>

        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input type="email"
            {...register('email', {required: "Please enter email",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
              message: "Please enter valid email",
            },
          })}
            className="w-full" id="email" autoFocus />
            {errors.email && (
              <div className="text-red-500">
                {errors.email.message}
              </div>
            )}
        </div>

        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input type="password" 
            {...register("password", {
              required: "Please enter password",
              minLength: {
                value: 6,
                message: "password is more than 5 chars"
              },
            })}
            className="w-full" id="password" autoFocus
          />
            {errors.password && (
              <div className="text-red-500">
                {errors.password.message}
              </div>
            )}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" 
            {...register("confirmPassword", {
              required: "Please enter confirmPassword",
              validate: (value) => value === getValues('password'),
              minLength: {
                value: 6,
                message: "confirmPassword is more than 5 chars"
              },
            })}
            className="w-full" id="confirmPassword" autoFocus
          />
            {errors.confirmPassword ? (
              <div className="text-red-500">
                {errors.confirmPassword.message}
              </div>
              ) : null
            }

            {errors.confirmPassword && 
              errors.confirmPassword.type === "validate" ? (
              <div className="text-red-500">
                Password do not match
              </div>
              ) : null
            }
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="secondary-button"
          >
            Update
          </button>
        </div>
        
        <div className="flex items-center justify-start">
          <p className="text-orange-400">
            Don't have an account ?
          </p>
          <Link 
            href={`/register?redirect=${redirect || '/'}`}
            className="px-4 text-lg text-red-400 hover:text-green-400"
          >
            Register
          </Link>
        </div>

      </form>
    </Layout>
  )
}
ProfileScreen.auth = true;
