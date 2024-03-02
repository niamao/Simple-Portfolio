import React, { useEffect, useState } from 'react';
import {
    AiOutlineGithub,
    AiOutlineLinkedin,
} from 'react-icons/ai'
import { BsFillEnvelopeOpenFill } from "react-icons/bs";
import { getProfile } from '../utils/fetcher';
import { Profile } from "@/types/Profile"

const Footer = () => {
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const profile = await getProfile();
    
            setProfile(profile[0]);
          } catch (error) {
            console.error('Error fetching profile:', error);
          }
        };
    
        fetchData();
    }, []);

  return (
    <footer className='mx-auto max-w-3xl px-4 sm:px-6 md:max-w-5xl'>
        <hr className='w-full h-0.5 max-auto mt-8 bg-neutral-200 border-0'/>
        <div className='mx-auto p-4 flex flex-col text-center md:flex-row md:justify-between'>
            <div>© 2024 Neo Isaac Amao</div>
            <div className='flex flow-row items-center justify-center space-x-2 mb-1'>
                <a href={`${profile?.github || 'https://github.com/niamao'}`} rel='noreferrer' target='_blank'>
                    <AiOutlineGithub 
                        className='hover:-translate-y-1 transition-transform cursor-pointer'
                        size={30}
                        title='Github'
                    />
                </a>
                <a href={`${profile?.linkedin || 'https://linkedin.com/in/neo-isaac-amao'}`} rel='noreferrer' target='_blank'>
                    <AiOutlineLinkedin 
                        className='hover:-translate-y-1 transition-transform cursor-pointer'
                        size={30}
                        title='Linkedin'
                    />
                </a>
                <a href={`${profile?.email || 'mailto://neoisaac.amao@gmail.com'}`} rel='noreferrer' target='_blank'>
                    <BsFillEnvelopeOpenFill 
                        className='hover:-translate-y-1 transition-transform cursor-pointer'
                        size={25}
                        title='Email Me'
                    />
                </a>
            </div>
        </div>
    </footer>
  )
}

export default Footer