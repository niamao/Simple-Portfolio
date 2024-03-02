"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Link as ScrollLink } from 'react-scroll/modules'
import { BsGithub, BsArrowUpRightSquare } from 'react-icons/bs'
import { AiOutlineLoading } from "react-icons/ai";
import { IoIosArrowDropup } from "react-icons/io";
import Image from 'next/image'
import SlideUp from './SlideUp'

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import { getProjects } from "../utils/fetcher"

interface Image {
  original: string,
  asset: {
    url: string,
  }
}

interface Project {
  title: string,
  description: string,
  createdAt: string;
  liveUrl: string,
  repoUrl: string,
  images: Image[],
  hidden: string[]
}

const ProjectsSection = () => {
  const [projects, setData] = useState([])
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectData = await getProjects();

        let sortedProjects = []
        
        if (projectData && projectData.length > 0) {
          // Sort in descending order
          sortedProjects = projectData.sort((a: Project, b: Project) => {
            return (new Date(b.createdAt) as any) - (new Date(a.createdAt) as any);
        });

          const formattedImages = sortedProjects.map((project: Project) => ({
            ...project,
            hidden: project.hidden || [],
            images: project.images
              ? project.images
                .map((img) => ({
                  original: img.asset.url
                }))
              : [],
          }));
          const newData = formattedImages.filter((proj: Project) => !proj.hidden.includes(proj.title));

          setData(newData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <section id='projects' >
      <h1 className='text-center font-bold text-4xl'>
          Projects
          <hr className='w-6 h-1 mx-auto my-4 bg-teal-500 border-0 rounded'/>
      </h1>
      <div className='flex flex-col space-y-16 md:space-y-28'>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="flex-center flex-col gap-5 ite">
              <div className="animate-spin ">
                <AiOutlineLoading size={30} />
              </div>
            </div>
            {/*
              Just in case I wanted a fancy one
              <Image
                src="/owl_loading.gif"
                alt="Loading..."
                width="0"
                height="0"
                className="w-20 h-100 ml-2"
              />
            */}
          </div>
        ) : 
        projects.map((project: Project, idx) => (
          <div key={idx}>
              <SlideUp offset='-300px 0px -300px 0px'>
                  <div className='flex flex-col animate-slideUpCubiBezier animation-delay-1 md:flex-row md:space-x-12'>
                      <div className='mt-4 md:w-1/2 border-2 border-neutral-600 dark:border-neutral-400'>
                          <figure>
                              <div className="aspect-[12/7] w-full h-full">
                                <ImageGallery
                                    items={project.images}
                                    showPlayButton={false}
                                    showThumbnails={false}
                                    showIndex
                                    additionalClass="gallery-item"
                                    disableKeyDown={!isFullscreen}
                                />
                              </div>
                          </figure>
                      </div>
                      <div className='mt-12 md:w-1/2'>
                          <h1 className='text-4xl font-bold mb-6'>{project.title}</h1>
                          <p className='text-xl leading-7 mb-4 text-neutral-600 dark:text-neutral-400'>
                              {project.description}
                          </p>
                          <div className='flex flex-row align-bottom space-x-4'>
                              {project.repoUrl && project.repoUrl.length > 0 && (
                                  <Link href={project.repoUrl} target='_blank'>
                                      <BsGithub 
                                          size={30}
                                          className='hover:-translate-y-1 transition-transform cursor-pointer'
                                      />
                                  </Link>
                              )}
                              {project.liveUrl && project.liveUrl.length > 0 && (
                                <Link href={project.liveUrl} target='_blank'>
                                  <BsArrowUpRightSquare 
                                      size={30}
                                      className='hover:-translate-y-1 transition-transform cursor-pointer'
                                  />
                                </Link>
                              )}
                          </div>
                      </div>
                  </div>
              </SlideUp>
          </div>
        ))}
        {projects.length >= 3 && (
          <div className='flex flex-row justify-center group'>
            <ScrollLink
              to="projects"
              activeClass='active'
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >
              <IoIosArrowDropup size={28} className='hover:-translate-y-1 transition-transform'/>
            </ScrollLink>
            <span
              className="hidden md:inline-block group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity bg-gray-800 text-sm text-gray-100 rounded-md absolute left-1/2 -translate-x-1/2 translate-y-full opacity-0 mt-3 mx-auto px-2 w-max"
            >
              Scroll to top
            </span>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProjectsSection
