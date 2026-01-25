"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./benefitsGridSection.module.css";

type Item = {
  icon: string;
  title: string;
  desc: string;
  tone: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
};

const ITEMS: Item[] = [
  {
    icon: "/images/diverse-icon.png",
    title: "Diverse knowledge",
    desc: "Our team knows a multitude of frontend and backend technologies—so we can work with the right one for you, not just our favourite.",
    tone: 1,
  },
  {
    icon: "/images/scalability-icon.png",
    title: "Scalability",
    desc: "We combine our web development expertise with deep knowledge in infrastructure, the cloud, and your wider tech stack.",
    tone: 2,
  },
  {
    icon: "/images/faster-icon.png",
    title: "Faster value",
    desc: "Our iterative approach means we get something up-and-running fast, so we can build in quality earlier and ensure a smoother launch.",
    tone: 3,
  },
  {
    icon: "/images/more-icon.png",
    title: "More control",
    desc: "We use GIT-based version control that means we can try new things without putting your entire codebase at risk.",
    tone: 4,
  },
  {
    icon: "/images/stronger-icon.png",
    title: "Stronger security",
    desc: "We’re there at every stage of the development process and through the full life of your digital product as new vulnerabilities become known.",
    tone: 5,
  },
  {
    icon: "/images/less-icon.png",
    title: "Less uncertainty",
    desc: "Our track record says it all: working with us means getting a team that confidently and capably delivers, on-time and on-budget.",
    tone: 6,
  },
  {
    icon: "/images/edge-icon.png",
    title: "A competitive edge",
    desc: "Incredible digital experiences help you meet customer needs, impress investors, and outperform your competitors.",
    tone: 7,
  },
  {
    icon: "/images/lower-icon.png",
    title: "Lower costs",
    desc: "We find efficiencies—not just in development, but in how your website or app works for customers and users—so we can help keep costs down.",
    tone: 8,
  },
  {
    icon: "/images/constant-icon.png",
    title: "Constant improvement",
    desc: "Launch is just the start—we can work with you over time to add new functionality and help your website adapt alongside your business.",
    tone: 9,
  },
];

export default function BenefitsGridSection() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={rootRef} className={styles.section}>
      <div className={`${styles.header} ${inView ? styles.headerIn : ""}`}>
        <h2 className={styles.title}>The Benefits of Better<br />Web Development</h2>
        <p className={styles.subtitle}>
          It’s easier than ever for someone to build a website or application that basically works.
          But only a capable, experienced team can help you unlock the true potential of your project
          and make the most of your budget.
        </p>
      </div>

      <div className={styles.grid}>
        {ITEMS.map((it, idx) => (
          <article
            key={it.title}
            className={`${styles.card} ${styles[`tone${it.tone}`]} ${inView ? styles.cardIn : ""}`}
            style={
              {
                // wait 2s, then each card 1s after the previous
                ["--delay" as any]: `${2 + idx * 1}s`,
              } as React.CSSProperties
            }
          >
            <img className={styles.icon} src={it.icon} alt="" aria-hidden="true" />
            <h3 className={styles.cardTitle}>{it.title}</h3>
            <p className={styles.cardDesc}>{it.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}