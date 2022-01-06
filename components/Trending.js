import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


function Trending({ products }) {


  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Trending products</h2>
          <Link href="/allproducts">
            <a  className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block">
              Browse all products<span aria-hidden="true"> &rarr;</span> 
            </a>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          {products.slice(0, 4).map((product) => (
            <div key={product.id} className="group relative">
              <div className=" relative w-full h-56 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
                <Image
                  priority
                  src={product.image}
                  alt="product"
                  layout="fill"
                 


                />
              </div>
              <h3 className="mt-4 text-sm font-bold text-gray-900">
                <Link href={product.title.slice(" ")}>
                  <a >
                    <span className="absolute inset-0" />
                    {product.title}
                  </a>
                </Link>
              </h3>

              <p className="mt-1 text-sm font-medium text-gray-900">{product.price}$</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-sm md:hidden">
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            Shop the collection<span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  )
}



export default Trending;
