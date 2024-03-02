import React from 'react'

const BlockContent = require('@sanity/block-content-to-react')

interface AboutSectionProps {
    profile: any;
    loading: boolean;
}

const serializers = {
    types: {
      block: (props: any) => {
        const { style = 'normal', children } = props.node;
        switch (style) {
          case 'h1':
            return <h1 className="text-center text-2xl font-bold mb-6 md:text-left">{props.children}</h1>;
          case 'normal':
            return <p>{props.children}</p>;
          default:
            return <p>{props.children}</p>;
        }
      },
    },
    marks: {
      strong: (props: any) => <span className="font-bold">{props.children}</span>,
      color: (props: any) => {
        const { hex } = props.mark;
        return <span style={{ color: hex }}>{props.children}</span>;
      },
    },
};

const AboutSection: React.FC<AboutSectionProps> = ({ profile, loading }) => {
  return (
    <section id="about" className='pb-0'>
        <div className='my-12 pb-0 md:pt-16 md:pb-20'>
            <h1 className='text-center font-bold text-4xl'>
                About Me
                <hr className='w-6 h-1 mx-auto my-4 bg-teal-500 border-0 rounded'/>
            </h1>
            <div className='flex flex-col space-y-10 items-stretch justify-center align-top md:flex-row md:text-left md:p-4 md:space-y-0 md:space-x-10'>
                <div className='md:w-1/2'>
                    {loading ? (
                        <div className='animate-pulse'>
                            <div className='w-40 h-6 mt-5 rounded-md bg-gray-300 mb-2'></div>
                            <div className='w-full h-4 rounded-md bg-gray-300 mb-2'></div>
                            <div className='w-full h-4 rounded-md bg-gray-300 mb-2'></div>
                            <div className='w-1/2 h-4 rounded-md bg-gray-300 mb-4'></div>
                        </div>
                    ) : (
                        <BlockContent blocks={profile.about_me} serializers={serializers} />
                    )}
                </div>
                <div className='md:w-1/2'>
                    <h1 className='text-center text-2xl font-bold mb-6 md:text-left'>
                        My Skills
                    </h1>
                    <div className='flex flex-wrap flex-row justify-center md:justify-start'>
                    {loading ? (
                        <div className="flex flex-wrap flex-row justify-center md:justify-start">
                            {[1, 2, 3].map((_, idx) => (
                            <div key={idx} className="bg-gray-300 text-gray-300 px-4 py-2 mr-2 mt-2 rounded font-semibold w-20 animate-pulse">-</div>
                            ))}
                        </div>
                        ) : (
                        <div className="flex flex-wrap flex-row justify-center md:justify-start">
                            {profile?.skills.map((skill: string, idx: number) => (
                            <p key={idx} className="bg-gray-200 px-4 py-2 mr-2 mt-2 text-gray-500 rounded font-semibold">{skill}</p>
                            ))}
                        </div>
                    )}
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default AboutSection
