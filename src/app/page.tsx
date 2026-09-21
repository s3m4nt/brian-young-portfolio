import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <About />
        <Work />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
