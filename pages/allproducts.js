import React from 'react'
import { getProductsApi } from '../api/product'
import Image from 'next/image'
import Link from 'next/link'
import { CLOUDINARY }from '../utils/constants'



const allproducts = ({ products }) => {



    return (
        <div className="bg-white ">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>

                <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
                    {products.map((product) => (
                        <Link href={product.title.slice(" ")} key={product.id}>
                            <a className="group ">
                                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 z-2 ">
                                    <Image
                                        placeholder="blur"
                                        blurDataURL
                                        priority
                                        src={`${CLOUDINARY}${product.image}`}
                                        alt="producto"
                                        className="w-full h-full object-center object-cover group-hover:opacity-75 cursor-pointer "
                                        layout="fill"
                                    />
                                </div>
                                <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                                <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
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

export default allproducts
