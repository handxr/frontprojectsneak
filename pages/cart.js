import React, { useState, useEffect } from 'react'
import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useProduct } from '../hooks/'
import { getProductsCart } from '../api/cart'
import Image from 'next/image'
import { removeProductCartApi } from '../api/cart'
import { forEach } from 'lodash'
import{CLOUDINARY} from '../utils/constants'


export default function Cart() {
  const [products, setProducts] = useState(null)
  const [total, setTotal] = useState(0)
  const [reloadCart, setReloadCart] = useState(false)
  const { getProductById } = useProduct()
  useEffect(() => {
    (async () => {
      const idProductsCart = getProductsCart()

      const productsArray = []
      for await (const idProduct of idProductsCart) {

        const response = await getProductById(idProduct)
        productsArray.push(response)
      }
      setProducts(productsArray)
    })()
  }, [reloadCart])

  const onReloadCart = () => setReloadCart((prev) => !prev)

  const removeProduct = (index) => {
    removeProductCartApi(index)
    onReloadCart()
  }

  useEffect(() => {
    let totalTemp = 0;
    forEach(products, (product) => {
      totalTemp += Number(product.price)
    })
    setTotal(totalTemp.toFixed(2))
  }, [products])


  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            {!products ? (
              <p>Loading...</p>
            ) : products.length < 1 ? (
              <p>No products in the cart</p>
            ) : (

              <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
                {products.map((product, index) => (
                  <li key={index} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <Image
                        alt="product"
                        src={`${CLOUDINARY}${product.image}`}
                        className="rounded-md "
                        width={150}
                        height={150}
                      />
                    </div>

                    <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <a className="font-medium text-gray-700 hover:text-gray-800">
                                {product.title}
                              </a>
                            </h3>
                          </div>

                          <p className="mt-1 text-sm font-medium text-gray-900">{product.price}$</p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">


                          <div className="absolute top-0 right-0">
                            <button type="button" className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500">
                              <span className="sr-only">Remove</span>
                              <XIcon className="h-5 w-5" aria-hidden="true" onClick={() => removeProduct(index)} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <p className="mt-4 flex text-sm text-gray-700 space-x-2">
                        {product.inStock ? (
                          <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                        ) : (
                          <ClockIcon className="flex-shrink-0 h-5 w-5 text-gray-300" aria-hidden="true" />
                        )}

                        <span>{product.active ? 'In stock' : `Ships in 48h`}</span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">

              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt className="text-base font-medium text-gray-900">Order total</dt>
                <dd className="text-base font-medium text-gray-900">{total}$</dd>
              </div>
            </dl>

            <div className="mt-6">
              <Link href="/checkout">
                <button
                  type="button"
                  as="a"
                  className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                >
                  Checkout
                </button>
              </Link>
            </div>
          </section>
        </form>
      </div>
    </div>
  )
}
