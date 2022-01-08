import React from 'react'
import { ProductPage, RelatedProducts } from './../components'

import { getProductApi, getProductsApi } from '../api/product'
const Product = ({ product }) => {
  console.log(product)




  return (
    <div>
      <ProductPage product={product} />
      <RelatedProducts />
    </div>
  )
}

export async function getStaticPaths() {
  const products = await getProductsApi()

  const paths = products.map(product => ({
    params: {
      product: product.title
    },
  }))


  return { paths, fallback: false }


}

export async function getStaticProps({ params }) {

  const product = await getProductApi(params.product)


  return {
    props: {
      product,
    },
  };
}


export default Product
