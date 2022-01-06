import React from 'react'


import { Hero, Categories, Incentives, Trending, Cta } from '../components'
import {getProductsApi} from '../api/product'

const Home = ({products}) => {




  return (
    <div>
      
      <Hero />
      <Categories />
      <Incentives />
      <Trending products={products}/>
      <Cta />

    </div>
  )
}

export async function getStaticProps() {
  
  const products = await getProductsApi()
  

  return {
    props: {
      products,
    },
  }
}



export default Home
