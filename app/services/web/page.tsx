import NexusHeroSection from "@/app/components/Backgrounds/NexusHeroSection";
import Header from "@/app/components/Layout/Header";

export default function WebServicesPage() {
  return (
    <main>
      <Header />

      <NexusHeroSection />
      {/* next sections below */}
      <section id="services-web" style={{ height: "0vh" }} />
    </main>
  );
}