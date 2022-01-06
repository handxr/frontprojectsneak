import React,{useState} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { loginApi } from '../api/user'
import { useAuth } from '../hooks'
import {Loader } from '../components'


const LoginForm = ({ openCloseModal }) => {
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formValue) => {
            try {
                const response = await loginApi(formValue)
                const { access } = response
                setLoading(true)
                login(access)
                setLoading(false)
                openCloseModal()

            } catch (error) {
                console.log("Error")
                console.log(error)
                toast.error(error.message)
            }
        }
    })
    return (
        <>

            <div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white  px-4 sm:px-10">
                        <form className="space-y-6" onSubmit={formik.handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input

                                        name="email"
                                        placeholder="Email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        required

                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input

                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>



                            <div>
                                
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                   {loading ? <Loader/> : "Sign In"} 
                                </button>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </>
    )
}

function initialValues() {
    return {
        email: "",
        password: "",
    }
}

function validationSchema() {
    return {
        email: Yup.string().email(true).required(true),
        password: Yup.string().required(true)
    }
}

export default LoginForm
