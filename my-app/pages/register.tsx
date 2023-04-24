import { useRouter } from 'next/navigation'
import Link from 'next/link'
import React, { useEffect } from 'react'
import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Layout from '@/components/Layout'
import { getError } from '@/utils/error'

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function RegisterScreen() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = parseInt(router.query as string);
  //const redirect = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router,session, redirect])

  const { handleSubmit, register, getValues, formState: { errors }, } = useForm<LoginFormInputs>();

  const submitHandler = async ({ name, email, password }: LoginFormInputs) => {
    try {
      await axios.post('/api/auth/signup', {
        name,
        email,
        password
      });
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        toast.error(result?.error);
      }
    } catch(err) {
      toast.error(getError(err));
    }
  } 
  return (
    <Layout title="Create Account">
      <form
        className="mt-20 mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-2xl text-slate-500">Create Account</h1>
        
        <div className="mb-4">
          <label htmlFor="name">name</label>
          <input type="text"
            {...register('name', {required: "Please enter name"})}
            className="w-full" id="name" autoFocus />
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
            className="w-full" id="email" />
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
              required: "Please confirm password",
              validate: (value) => value === getValues('password'),
              minLength: {
                value: 6,
                message: "password is more than 5 chars"
              },
            })}
            className="w-full" id="password" autoFocus
          />
          {errors.confirmPassword && (
            <div className="text-red-500">
              {errors.confirmPassword.message}
            </div>
          )}
            {errors.confirmPassword && errors.confirmPassword.type === 'validate' && (
              <div className="text-red-500">
                Password do not match
              </div>
            )}
        </div>


        <div className="mb-4">
          <button
            type="submit"
            className="secondary-button"
          >
            Register
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
