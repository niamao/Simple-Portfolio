"use client"
import React from 'react'
import Image from 'next/image'
import { Link } from 'react-scroll/modules'
import { HiArrowDown } from 'react-icons/hi'

const BlockContent = require('@sanity/block-content-to-react')

interface HeroSectionProps {
  profile: any;
  loading: boolean;
}

const serializers = {
  marks: {
    color: ({ children, mark }: { children: any; mark: any }) => {
      const { hex } = mark;
      return <span style={{ color: hex }}>{children}</span>;
    },
  },
  types: {
    block: ({ node, children }: { node: any; children: any }) => {
      const style = node.style || 'normal';

      switch (style) {
        case 'h1':
          return <h1 className='font-bold text-4xl mt-6 md:text-7xl md:mt-0'>{children}</h1>;

        case 'normal':
          return <p className='text-lg mt-4 mb-6 md:text-2xl'>{children}</p>;

        // Handle other block styles as needed
        default:
          return <p>{children}</p>;
      }
    },
  },
  listItem: ({ children }: { children: any }) => <li>{children}</li>,
};

const HeroSection: React.FC<HeroSectionProps> = ({ profile, loading }) => {
  // https://github.com/recharts/recharts/issues/3615#:~:text=leaving%20this%20here%3A-,const%20error%20%3D%20console.error%3B%0Aconsole.error%20%3D%20(...args%3A%20any)%20%3D%3E%20%7B%0A%20%20if%20(/defaultProps/.test(args%5B0%5D))%20return%3B%0A%20%20error(...args)%3B%0A%7D%3B,-%F0%9F%91%8D
  const error = console.error;
    console.error = (...args: any) => {
      if (/defaultProps/.test(args[0])) return;
      error(...args);
  };

  if (loading) {
    return <LoadingSkeleton />;
  }
  
  return (
    <section id='home'>
        <div className='flex flex-col text-center items-center justify-center mb-10 my-32 mt-20 sm:py-32 md:flex-row md:space-x-4 md:text-left md:my-9'>
            <div className='md:w-1/2 md:mt-2'>
                <Image
                    className='rounded-full shadow-2xl w-60 h-60'
                    src={profile.profile_picture}
                    alt=""
                    width="0"
                    height="0"
                    sizes="100vw"
                    priority
                />
            </div>
            <div className='md:mt-2 md:w-3/5 mb-1'>
                <BlockContent blocks={profile.intro} serializers={serializers} />
                <Link 
                    to="projects"
                    className='text-neutral-100 font-semibold px-6 py-3 bg-teal-600 rounded shadow hover:bg-teal-700'
                    activeClass='active'
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                >
                    Projects
                </Link>
            </div>
        </div>
        <div className='flex flex-row justify-center'>
            <Link
                to="about"
                activeClass='active'
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
            >
                <HiArrowDown size={35} className='animate-bounce'/>
            </Link>
        </div>
    </section>
  )
}

const LoadingSkeleton = () => (
  <div className='flex flex-col text-center items-center justify-center my-10 py-16 sm:py-32 md:flex-row md:space-x-4 md:text-left md:py-52'>
    <div className='md:w-1/2 md:mt-2'>
      <div className='rounded-full shadow-2xl w-32 h-32 bg-gray-300 animate-pulse'></div>
    </div>
    <div className='md:mt-2 md:w-3/5'>
    <div className='animate-pulse'>
      <div className='w-40 h-6 mt-5 rounded-md bg-gray-300 mb-2'></div>
      <div className='w-full h-4 rounded-md bg-gray-300 mb-2'></div>
      <div className='w-full h-4 rounded-md bg-gray-300 mb-2'></div>
      <div className='w-1/2 h-4 rounded-md bg-gray-300 mb-4'></div>
      <div className='w-32 h-10 rounded-md bg-gray-300'></div>
    </div>
    </div>
  </div>
);

export default HeroSection