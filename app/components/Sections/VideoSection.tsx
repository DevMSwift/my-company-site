"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./videoSection.module.css";

type Props = {
  id: string;
  videoSrc: string;
  title: string;
  subtitle: string;
  variant?: "hero" | "info" | "default";
};

type Stage = "idle" | "l1" | "l2" | "l3" | "body";

export default function VideoSection({
  id,
  videoSrc,
  title,
  subtitle,
  variant = "default",
}: Props) {
  const [stage, setStage] = useState<Stage>("idle");
  const infoRef = useRef<HTMLDivElement | null>(null);
  const [infoIn, setInfoIn] = useState(false);

  useEffect(() => {
    if (variant !== "hero") return;

    // timeline:
    // wait 2s -> line1 -> line2 -> line3 -> paragraph
    const t0 = window.setTimeout(() => setStage("l1"), 2000);
    const t1 = window.setTimeout(() => setStage("l2"), 3200);
    const t2 = window.setTimeout(() => setStage("l3"), 4400);
    const t3 = window.setTimeout(() => setStage("body"), 5800);

    return () => {
      window.clearTimeout(t0);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [variant]);

  useEffect(() => {
    if (variant !== "info") return;

    const el = infoRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInfoIn(true);
      },
      { threshold: 0.35 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [variant]);

  const isHero = variant === "hero";
  const isInfo = variant === "info";

  return (
    <section id={id} className={styles.section}>
      <video className={styles.video} autoPlay muted loop playsInline preload="metadata">
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div className={styles.overlay} />

      {/* DEFAULT sections */}
      {!isHero && !isInfo && (
        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      )}

      {/* HERO animated section */}
      {isHero && (
        <div className={styles.heroWrap}>
          <div className={styles.heroInner}>
            <div className={styles.heroLines}>
              <div className={styles.heroLine}>
                <span
                  className={`${styles.heroText} ${stage === "l1" || stage === "l2" || stage === "l3" || stage === "body"
                    ? styles.on
                    : ""
                    }`}
                >
                  Real Impact, Real Results
                </span>
              </div>

              <div className={styles.heroLine}>
                <span
                  className={`${styles.heroText} ${styles.comName} ${stage === "l2" || stage === "l3" || stage === "body" ? styles.on : ""
                    }`}
                >
                  CODE CORE
                </span>
              </div>

              <div className={styles.heroLine}>
                <span
                  className={`${styles.heroText} ${stage === "l3" || stage === "body" ? styles.on : ""
                    }`}
                >
                  Software Solutions
                </span>
              </div>
            </div>

            <p className={`${styles.heroBody} ${stage === "body" ? styles.bodyOn : ""}`}>
              Build innovative, captivating web apps and mobile applications
              <br />
              with advanced tech and great UX.
            </p>

            <button
              type="button"
              className={`${styles.heroBtn} ${stage === "body" ? styles.btnOn : ""}`}
            >
              Request a free consultation
            </button>
          </div>
        </div>
      )}


      {/* INFO section */}
      {isInfo && (
        <div
          ref={infoRef}
          className={`${styles.infoWrap} ${infoIn ? styles.infoIn : ""}`}
        >
          <div className={styles.infoInner}>
            {/* TOP */}
            <div className={styles.splitTop}>
              <div />

              <div className={styles.topText}>
                <h2 className={styles.topTitle}>
                  <span className={styles.revealRight}>{title}</span>
                  <br />
                  <span className={styles.revealRightDelay}>{subtitle}</span>
                </h2>

                <p className={styles.topSub}>
                  <span className={styles.revealRightSub}>
                    There are many benefits of hiring a professional Web Application Developer instead
                    of trying to go at this initiative alone. For starters, it’s an excellent way for your business
                    to increase its customer base.
                    <br /><br />
                    It’s also an opportunity to grow your business and reach more leads. Our team can help
                    you overcome the challenges that come with these goals by creating web applications
                    and mobile apps. We are experts at turning your great ideas into a reality.
                    <br /><br />
                    Contact us to tell us your ideas and start the conversation so we can begin creating
                    beautiful, effective, and practical digital products for your business.
                  </span>
                </p>
              </div>
            </div>

            {/* BOTTOM */}
            <div className={styles.splitBottom}>
              <div className={styles.bottomText}>
                <h3 className={styles.bottomTitle}>
                  <span className={styles.revealLeft}>We serve globally</span>
                </h3>

                <p className={styles.bottomSub}>
                  <span className={styles.revealLeftDelay}>
                    Code Core is a trusted global software development
                    partner, proudly serving clients in the USA, KSA,
                    Europe, and Egypt.
                    <br /><br />
                    We specialize in providing top-quality web and
                    mobile development solutions, tailored to the unique
                    needs of businesses across Europe.
                    <br /><br />
                    As a trusted nearshore partner, we deliver innovative
                    and reliable technology while ensuring full compliance
                    with industry standards, helping companies excel in
                    competitive markets.
                  </span>
                </p>
              </div>

              <div />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}