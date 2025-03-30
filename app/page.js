// app/page.js
'use client'; // Convertir toute la page en Client Component

import { personalData } from "@/utils/data/personal-data";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Charger dynamiquement tous les composants avec ssr: false
const HeroSection = dynamic(() => import('./components/homepage/hero-section'), { 
  ssr: false,
  loading: () => <div>Loading...</div>
});
const AboutSection = dynamic(() => import('./components/homepage/about'), { ssr: false });
const ContactSection = dynamic(() => import('./components/homepage/contact'), { ssr: false });
const Education = dynamic(() => import('./components/homepage/education'), { ssr: false });
const Experience = dynamic(() => import('./components/homepage/experience'), { ssr: false });
const Projects = dynamic(() => import('./components/homepage/projects'), { ssr: false });
const Skills = dynamic(() => import('./components/homepage/skills'), { ssr: false });

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`);
        const data = await res.json();
        setBlogs(data.filter((item) => item?.cover_image).sort(() => Math.random() - 0.5));
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    }
    
    loadData();
  }, []);

  return (
    <div>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects blogs={blogs} />
      <Education />
      <ContactSection />
    </div>
  );
}