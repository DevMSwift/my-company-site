"use client";

import { useEffect, useRef, useState } from "react";
import Header from "./components/Layout/Header";
import VideoSection from "./components/Sections/VideoSection";
import styles from "./page.module.css";

export default function Home() {
  const mainRef = useRef<HTMLElement | null>(null);
  const [hideHeader, setHideHeader] = useState(false);

  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;

    const section3 = root.querySelector("#section3");
    if (!section3) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setHideHeader(entry.isIntersecting);
      },
      {
        root,          
        threshold: 0.6 
      }
    );

    io.observe(section3);
    return () => io.disconnect();
  }, []);

  return (
    <div className={styles.page}>
      <Header hidden={hideHeader} />

      <main ref={mainRef} className={styles.snap}>
        <VideoSection
          id="home"
          videoSrc="/video/hero-bg.mp4"
          title="CodeCore"
          subtitle="We build modern web & mobile solutions."
          variant="hero"
        />

        <VideoSection
          id="section2"
          videoSrc="/video/section-2.mp4"
          title={
            <>
              Why Choose <span className={styles.brandAccent}>CODE CORE</span>
            </>
          }
          subtitle="as Your Trusted Development Company"
          variant="info"
        />

        <VideoSection id="section3" videoSrc="" variant="cards" />


        <VideoSection id="section4" variant="nextSteps" />
      </main>
    </div>
  );
}