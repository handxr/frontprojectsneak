
import { getMeApi, addUserApi } from '../api/user'

export function useUser() {
    const getMe = async (token) => {
        try {
            const response = await getMeApi(token)
            return response
        } catch (error) {
            throw error
        }
    }

    const addUser = async (data) => {
        try {
            await addUserApi(data)
        } catch (error) {
            throw error
        }
    }

    return {
        getMe,
        addUser
    }
}