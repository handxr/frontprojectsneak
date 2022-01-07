import { BASE_API } from '../utils/constants'

export async function getProductsApi() {
    try {
        const url = `${BASE_API}/api/products/`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}

export async function getProductApi(path) {
    try {
        const url = `${BASE_API}/api/products?title=${path}`
        const response = await fetch(url)
        const result = await response.json()
        return result[0]
    } catch (error) {
        throw error
    }
}