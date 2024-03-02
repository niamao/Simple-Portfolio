"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Link } from 'react-scroll/modules'
import { useTheme } from 'next-themes'
import { RiMoonFill, RiSunLine} from 'react-icons/ri'
import { IoMdMenu, IoMdClose } from 'react-icons/io'

interface NavItem {
  label: string,
  page: string
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Home',
    page: 'home'
  },
  {
    label: 'About',
    page: 'about'
  },
  {
    label: 'Projects',
    page: 'projects'
  }
]

const Navbar = () => {
    const { theme, systemTheme, setTheme } = useTheme()
    const currentTheme =  theme === "system" ? systemTheme : theme;
    const [navbar, setNavbar] = useState(false)
    const isDarkTheme = currentTheme === 'dark'

    // https://github.com/facebook/react/issues/15187#:~:text=Oct%2027%2C%202023-,I%20was%20able%20to%20find%20a%20way%20to%20handle%20this%3A,-%3CButton%20variant
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true);
    }, [setLoaded]);

    const handleNavbar = (item: string, updateNavbar: boolean) => {
        if (item.length > 0) {
            document.title = `Neo | ${item}`;
        }

        if (updateNavbar) {
            setNavbar(!navbar)
        }
    }

    return (
        <header className="w-full mx-auto px-4 sm:px-20 fixed top-0 z-50 shadow bg-white dark:bg-stone-900">
            <div className='justify-between md:items-center md:flex'>
                <div>
                    <div className='flex items-center justify-between py-3'>
                        <Link
                            to='home'
                            spy={true}
                            smooth={true}
                            offset={-100}
                            duration={500}
                            onClick={() => handleNavbar('Home', false)}
                        >
                            <div className='flex space-x-2 md:py-2 cursor-pointer'>
                                <span className="relative group">
                                    <div className='flex space-x-2 cursor-pointer'>
                                        <Image
                                            className='rounded-full shadow-2xl h-8 w-8'
                                            src="/eyeglasses.png"
                                            alt=""
                                            width="0"
                                            height="0"
                                            sizes="100vw"
                                        />
                                        <h2 className='text-2xl font-bold'>Neo</h2>
                                    </div>
                                    <span className="absolute -bottom-1 left-1/2 w-0 h-0.5  bg-teal-600 group-hover:w-1/2 group-hover:transition-all"></span>
                                    <span className="absolute -bottom-1 right-1/2 w-0 h-0.5 bg-teal-600 group-hover:w-1/2 group-hover:transition-all"></span>
                                </span>
                            </div>
                        </Link>

                        <div className='md:hidden'>
                            <button onClick={() => handleNavbar('', true)}>
                                {navbar ? <IoMdClose size={30} /> : <IoMdMenu size={30} />}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={`flex-1 justify-self-center pb-3 mt-4 md:block md:pb-0 md:mt-0 ${navbar ? 'block' : 'hidden'} sm:text-center`}>
                        <div className='items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0'>
                            {NAV_ITEMS.map((item, idx) => {
                                return (
                                    <span className="relative group" key={idx}>
                                        <Link
                                            to={item.page}
                                            className="block lg:inline-block p-1 text-neutral-900 dark:text-neutral-50 cursor-pointer"
                                            activeClass='active'
                                            spy={true}
                                            smooth={true}
                                            offset={-100}
                                            duration={500}
                                            onClick={() => handleNavbar(item.label, false)}
                                        >
                                            {item.label}
                                        </Link>
                                        {!navbar && (
                                            <>
                                                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5  bg-teal-600 group-hover:w-1/2 group-hover:transition-all"></span>
                                                <span className="absolute -bottom-1 right-1/2 w-0 h-0.5 bg-teal-600 group-hover:w-1/2 group-hover:transition-all"></span>
                                            </>
                                        )}
                                    </span>
                                )
                            })}
                            {loaded && (
                                <button
                                    onClick={() => setTheme(isDarkTheme ? 'light' : 'dark')}
                                    className='bg-slate-100 p-2 rounded-xl'
                                >
                                    {isDarkTheme ? <RiSunLine size={25} color='black'/> : <RiMoonFill size={25} color='black' />}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar