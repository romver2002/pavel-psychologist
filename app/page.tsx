import Hero from "@/components/Hero";
import WhoIHelp from "@/components/WhoIHelp";
import Method from "@/components/Method";
import Services from "@/components/Services";
import Process from "@/components/Process";
import About from "@/components/About";
import Diplomas from "@/components/Diplomas";
import Articles from "@/components/Articles";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import { buildFaqJsonLd } from "@/lib/jsonLd";

export default function Home() {
  return (
    <>
      <Hero />
      <WhoIHelp />
      <Method />
      <Services />
      <Process />
      <About />
      <Diplomas />
      <Articles />
      <Reviews />
      <Faq />
      <Contact />
      <JsonLd data={buildFaqJsonLd()} />
    </>
  );
}
