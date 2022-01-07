import { useState } from 'react'
import { getProductsApi, getProductApi } from '../api/product'

export function useProduct() {
    const [products, setProducts] = useState(null)
    const [product, setProduct] = useState(null)
    const getProducts = async () => {
        try {
            const response = await getProductsApi()
            setProducts(response)
        } catch (error) {
            console.log(error)
        }
    }

    const getProduct = async () => {
        try {
            const response = await getProductApi()
            setProduct(response)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        products,
        product,
        getProducts,
        getProduct,
    }
}