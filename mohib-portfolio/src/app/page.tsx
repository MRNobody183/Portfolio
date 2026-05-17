import Header from "@/components/layout/Header";
import WhiteRabbitLayer from "@/components/layout/WhiteRabitLayer";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import StatsSection from "@/components/sections/StatsSection";

export default function Home() {
  return (
    <main className="relative overflow-hidden text-slate-100">
      <WhiteRabbitLayer />

      <div className="relative z-10">
        <Header />
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </div>
    </main>
  );
}