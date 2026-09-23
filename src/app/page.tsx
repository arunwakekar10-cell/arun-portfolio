import Navbar from "@/components/sections/Navbar";
import Preloader from "@/components/sections/Preloader";
import Hero from "@/components/sections/Hero";
import Dashboard from "@/components/sections/Dashboard";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Education from "@/components/sections/Education";
import Roles from "@/components/sections/Roles";
import Projects from "@/components/sections/Projects";
import AiDev from "@/components/sections/AiDev";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#070b09] text-[#e8f0ec]">
      <Preloader />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Dashboard />
        <Experience />
        <Skills />
        <Education />
        <Roles />
        <Projects />
        <AiDev />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
