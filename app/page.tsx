import Header from "./components/Layout/Header";
import VideoSection from "./components/Sections/VideoSection";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.snap}>
        <VideoSection
          id="home"
          videoSrc="/video/hero-bg.mp4"
          title="CodeCore"
          subtitle="We build modern web & mobile solutions."
        />

        <VideoSection
          id="section2"
          videoSrc="/video/section-2.mp4"
          title="Our Services"
          subtitle="Web, Mobile, UI/UX, and scalable backend systems."
        />
      </main>
    </div>
  );
}