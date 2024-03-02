"use client"
import React, { useEffect, useState } from 'react';
import HeroSection from "@/components/HeroSection"
import AboutSection from "@/components/AboutSection"
import ProjectsSection from "@/components/ProjectsSection"
import { getProfile } from '../utils/fetcher';
import { Profile } from "@/types/Profile"

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getProfile();

        setProfile(profile[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="mx-auto max-3xl px-4 sm:px-6 md:max-w-5xl">
      <HeroSection profile={profile} loading={loading} />
      <AboutSection profile={profile} loading={loading} />
      <ProjectsSection />
    </main>
  )
}
