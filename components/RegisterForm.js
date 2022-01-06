import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useUser } from '../hooks'
import {toast} from 'react-toastify'

const RegisterForm = ({openCloseModal}) => {
    const { addUser } = useUser()
   
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(newValidationSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                await addUser(formValue)
                toast.success("Account created")
                openCloseModal()
                
            } catch (error) {
                console.log(error)
                toast.error("Invalid data")
            }
        }
    })
    return (
        <div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white  px-4 sm:px-10">
                    <form className="space-y-6" onSubmit={formik.handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <div className="mt-1">
                                <input
                                    name="username"
                                    type="text"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    name="email"
                                    type="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                                Register
                            </button>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    )
}

function initialValues() {
    return {
        username: "",
        email: "",
        password: "",

    }


}

function newValidationSchema() {
    return {
        username: Yup.string().required(true),
        email: Yup.string().email(true).required(true),
        password: Yup.string().required(true),
    }
}

export default RegisterForm
