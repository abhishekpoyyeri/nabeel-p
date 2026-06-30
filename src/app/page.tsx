import Navigation from "@/components/sections/Navigation";
import Hero from "@/components/sections/Hero";
import CreativeDNA from "@/components/sections/CreativeDNA";
import Skills from "@/components/sections/Skills";
import CreativeJourney from "@/components/sections/CreativeJourney";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <CreativeDNA />
      <CreativeJourney />
      <Skills />
      <Contact />
    </main>
  );
}
