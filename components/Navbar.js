import { Fragment, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { MenuIcon, SearchIcon, ShoppingBagIcon, XIcon } from '@heroicons/react/outline'
import logo from '../assets/images/projectslogo.svg'
import { BasicModal, RegisterForm, LoginForm } from '../components'
import { useAuth } from '../hooks'
import balon from '../assets/images/balon.jpg'
import zapa from '../assets/images/zapa.jpg'

const navigation = {


  categories: [
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '/allproducts',
          imageSrc: balon,
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '/allproducts',
          imageSrc: zapa,
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'sneakers',
          name: 'Sneakers',
          href: '/sneakers',

        },
        {
          id: 'clothes',
          name: 'Clothes',
          href: '/clothes'

        },
        {
          id: 'accessories',
          name: 'Accessories',
          href: '/accessories'

        },
      ],
    },
    {
      id: 'menw',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '/allproducts',
          imageSrc: balon,
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '/allproducts',
          imageSrc: zapa,
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'sneakersw',
          name: 'Sneakers',
          href: '/sneakers'

        },
        {
          id: 'clothesw',
          name: 'Clothes',
          href: '/clothes'

        },
        {
          id: 'accessoriesw',
          name: 'Accessories',
          href: '/accessories'

        },
      ],
    },
  ],
  pages: [
    { name: 'All products', href: '/allproducts' },



  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
 
  const [open, setOpen] = useState(false)

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const { auth, logout } = useAuth()





  const openCloseModal = () => setShowModal((prev) => !prev);
  const openModal = () => {
    setTitleModal("Log In");
    setContentModal(<LoginForm openCloseModal={openCloseModal} />);
    openCloseModal();
  };
  const openModalTwo = () => {
    setTitleModal("Create Account");
    setContentModal(<RegisterForm openCloseModal={openCloseModal} />);
    openCloseModal();
  };


  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 pt-5 pb-2 flex">
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Links */}
              <Tab.Group as="div" className="mt-2">
                <div className="border-b border-gray-200">
                  <Tab.List className="-mb-px flex px-4 space-x-8">
                    {navigation.categories.map((category) => (
                      <Tab
                        key={category.name}
                        className={({ selected }) =>
                          classNames(
                            selected ? 'text-indigo-600 border-indigo-600' : 'text-gray-900 border-transparent',
                            'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                          )
                        }
                      >
                        {category.name}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                  {navigation.categories.map((category) => (
                    <Tab.Panel key={category.name} className="pt-10 pb-8 px-4 space-y-10">
                      <div className="grid grid-cols-2 gap-x-4">
                        {category.featured.map((item, index) => (
                          <div key={index} className="group relative text-sm">
                            <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75 relative">
                              <Image src={item.imageSrc} alt={item.imageAlt} className="object-center object-cover" layout="fill" />
                            </div>
                            <div>
                              <Link href={item.href}>
                                <a className="mt-6 block font-medium text-gray-900">
                                  <span className="absolute z-10 inset-0" aria-hidden="true" />
                                  {item.name}
                                </a>
                              </Link>
                            </div>
                            <p aria-hidden="true" className="mt-1">
                              Shop now
                            </p>
                          </div>
                        ))}
                      </div>
                      {category.sections.map((section, index) => (
                        <div key={index}>
                          <Link href={section.href}>
                            <p className="font-medium text-gray-900">
                              {section.name}
                            </p>
                          </Link>
                          {/* <ul
                            role="list"
                            aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                            className="mt-6 flex flex-col space-y-6"
                          >
                            {section.items.map((item) => (
                              <li key={item.name} className="flow-root">
                                <a href={item.href} className="-m-2 p-2 block text-gray-500">
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul> */}
                        </div>
                      ))}
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                {navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <Link href={page.href}>
                      <a className="-m-2 p-2 block font-medium text-gray-900">
                        {page.name}
                      </a>
                    </Link>
                  </div>
                ))}
              </div>

              {auth ?
                (
                  <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                    <div className="flow-root">
                      <p className="-m-2 p-2 block font-medium text-gray-900">
                        Welcome, {auth.me.username}
                      </p>
                    </div>
                    <div className="flow-root">
                      <button onClick={logout} className="-m-2 p-2 block font-medium text-gray-900">
                        Logout
                      </button>
                    </div>
                  </div>)
                : (
                  <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                    <div className="flow-root">
                      <button type="button" onClick={() => openModal()} className="-m-2 p-2 block font-medium text-gray-900">
                        Sign in
                      </button>
                    </div>
                    <div className="flow-root">
                      <button type="button" onClick={() => openModalTwo()} className="-m-2 p-2 block font-medium text-gray-900">
                        Create account
                      </button>
                    </div>
                  </div>
                )}


            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <p className="bg-black h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>

        <nav aria-label="Top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200 ">
            <div className="h-16 flex items-center">
              <button
                type="button"
                className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <a >
                    <span className="sr-only">Workflow</span>
                    <Image
                      className=""
                      height={50}
                      width={200}
                      src={logo}
                      alt="logo"
                    />
                  </a>
                </Link>
              </div>

              {/* Flyout menus */}



              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="h-full flex space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-indigo-600 text-indigo-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px'
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>
                         


                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Popover.Panel className="absolute top-full inset-x-0 text-sm text-gray-500 z-20">
                                {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                <div className="relative bg-white">
                                  <div className="max-w-7xl mx-auto px-8">
                                    <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                      <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                        {category.featured.map((item, index) => (
                                          <div key={index} className="group relative text-base sm:text-sm">
                                            <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75 relative">
                                              <Image
                                                src={item.imageSrc}
                                                alt={item.imageAlt}
                                                layout="fill"
                                                className="object-center object-cover"
                                              />
                                            </div>
                                           <Popover.Button>
                                              <Link href={item.href}>
                                                <a className="mt-6 block font-medium text-gray-900">
                                                  <span className="absolute z-10 inset-0" aria-hidden="true" />
                                                  {item.name}
                                                </a>
                                              </Link>
                                           </Popover.Button>
                                            <p aria-hidden="true" className="mt-1">
                                              Shop now
                                            </p>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                        {category.sections.map((section, index) => (
                                          <div key={index}>
                                            <Popover.Button>
                                              <Link href={section.href}>
                                                <p id={`${section.name}-heading`} className="cursor-pointer font-medium text-gray-900">
                                                  {section.name}
                                                </p>
                                              </Link>
                                            </Popover.Button>
                                            {/* <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li key={item.name} className="flex">
                                                <Link href={item.href}>
                                                  <a className="hover:text-gray-800">
                                                    {item.name}
                                                  </a>
                                                </Link>
                                              </li>
                                            ))}
                                          </ul> */}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Popover.Panel>
                            </Transition>
                        </>

                      )}
                    </Popover>
                  ))}


                  {navigation.pages.map((page) => (
                    <Link href={page.href} key={page.name}>

                      <a


                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        {page.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                {auth ?

                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">

                    <p className="text-sm font-medium text-gray-700 hover:text-gray-800">
                      Welcome, {auth.me.username}
                    </p>

                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <button type="button" onClick={logout} >
                      <p className="text-sm font-medium text-gray-700 hover:text-gray-800">
                        Logout
                      </p>
                    </button>
                  </div>

                  : <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <button type="button" onClick={() => openModal()}>
                      <p className="text-sm font-medium text-gray-700 hover:text-gray-800">
                        Sign in
                      </p>
                    </button>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <button type="button" onClick={() => openModalTwo()} >
                      <p className="text-sm font-medium text-gray-700 hover:text-gray-800">
                        Create account
                      </p>
                    </button>
                  </div>}



                {/* Search */}
                <div className="flex lg:ml-6">
                  <Link href="#">
                    <a className="p-2 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Search</span>
                      <SearchIcon className="w-6 h-6" aria-hidden="true" />
                    </a>
                  </Link>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link href="/cart">
                    <a className="group -m-2 p-2 flex items-center">
                      <ShoppingBagIcon
                        className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                      <span className="sr-only">items in cart, view bag</span>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <BasicModal
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        content={contentModal}
      />
    </div>
  )
}