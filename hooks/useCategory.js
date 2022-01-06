import { useState } from 'react'
import { getCategoriesApi } from '../api/category'

export function useCategory() {
    const [categorias, setCategorias] = useState(null)


    const getCategories = async () => {
        try {
            const response = await getCategoriesApi()
            setCategorias(response)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        categorias,
        getCategories,
    }

}