import React, { useEffect, useState } from 'react'
import { ProductPage, RelatedProducts } from './../components'

import { useRouter } from 'next/router'
import { getProductApi } from '../api/product'
const Product = () => {
  const [product, setProduct] = useState(null)
  const { query } = useRouter()

  useEffect( () => {
    (async () => {
      const response = await getProductApi(query.product);
      setProduct(response);
    })();
  }, [query])
  if(!product) return null;
 

  return (
    <div>
      <ProductPage product={product}/>
      <RelatedProducts />
    </div>
  )
}




export default Product
