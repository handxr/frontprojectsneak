import { useState } from 'react'
import { getProductsApi, getProductApi, getProductByIdApi } from '../api/product'

export function useProduct() {
    const [products, setProducts] = useState(null)
    
    const getProducts = async () => {
        try {
            const response = await getProductsApi()
            setProducts(response)
        } catch (error) {
            console.log(error)
        }
    }

    // const getProduct = async () => {
    //     try {
    //         const response = await getProductApi()
    //         setProduct(response)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const getProductById = async (id) => {
        try {
          const product = await getProductByIdApi(id);
          return product;
        } catch (error) {
          setError(error);
        }
      };

    return {
        products,
        
        getProducts,
        getProductById,
    }
}