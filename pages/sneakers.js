import React from 'react'
import { BASE_API , CLOUDINARY} from '../utils/constants'
import Image from 'next/image'
import Link from 'next/link'

const sneakers = ({ sneakers }) => {
  console.log(sneakers)
  return (
    <div className="bg-white h-full">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {sneakers.map((sneaker) => (
            <Link href={sneaker.title.slice(" ")} key={sneaker.id}>
              <a className="group">
                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 relative">
                  <Image
                  placeholder="blur"
                  blurDataURL
                    priority
                    src={`${CLOUDINARY}${sneaker.image}`}
                    alt="sneaker"
                    layout="fill"
                    className="w-full h-full object-center object-cover group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{sneaker.title}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{sneaker.price}</p>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch(`${BASE_API}/api/products/?category=1`);
  const sneakers = await response.json()

  return {
    props: {
      sneakers,
    },
  }
}

export default sneakers
