"use client";

import { useEffect, ReactNode, useRef, useState } from "react";
import styles from "./videoSection.module.css";

type Props = {
  id: string;
  videoSrc?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  variant?: "hero" | "info" | "cards" | "default";
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
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const [cardsIn, setCardsIn] = useState(false);

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

  useEffect(() => {
    if (variant !== "cards") return;

    const el = cardsRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCardsIn(true);
      },
      { threshold: 0.35 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [variant]);

  const isHero = variant === "hero";
  const isInfo = variant === "info";
  const isCards = variant === "cards";

  return (
    <section id={id} className={styles.section}>
      {!isCards && (
        <>
          <video className={styles.video} autoPlay muted loop playsInline preload="metadata">
            <source src={videoSrc} type="video/mp4" />
          </video>
          <div className={styles.overlay} />
        </>
      )}

      {/* DEFAULT sections */}
      {!isHero && !isInfo && !isCards && (
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



      {/* CARDS section (4 columns) */}
      {isCards && (
        <div
          ref={cardsRef}
          className={`${styles.cardsSection} ${cardsIn ? styles.cardsIn : ""}`}
        >
          <div className={styles.cardsGrid}>
            <article
              className={`${styles.serviceCard} ${styles.card1}`}
              style={{ backgroundImage: "url(/images/website-img.png)" }}
            >
              <div className={styles.cardShade} />
              <div className={styles.cardText}>
                <h3>Web Development</h3>
                <p>
                  Access immaculate user experience and engagement
                  <br /><br />
                  with our web portal development services.
                  <br />
                  We build and deliver web solutions that are advanced and progressive.
                  <br /><br />
                  Leveraging the expertise of our developers and the latest technologies.

                  We design and build high-performance, scalable web applications tailored to your business goals.
                  Our web solutions focus on speed, security, and seamless user experience across all devices.

                  From corporate websites to complex web platforms, we leverage modern technologies and clean
                  architecture to ensure your product is reliable, maintainable, and future-proof.

                  Our development process combines creativity, performance optimization, and SEO best practices
                  to help your brand stand out and convert visitors into loyal customers.
                </p>
              </div>
            </article>

            <article
              className={`${styles.serviceCard} ${styles.card2}`}
              style={{ backgroundImage: "url(/images/mobile-img.png)" }}
            >
              <div className={styles.cardShade} />
              <div className={styles.cardText}>
                <h3>Mobile Development</h3>
                <p>
                  Everyone desires a seamless and delightful user experience,
                  <br /><br />
                  regardless of whether they are accessing an application
                  on their iOS or Android device.

                  We create powerful and intuitive mobile applications for both iOS and Android platforms.
                  Our mobile solutions are designed to deliver smooth performance, intuitive navigation,
                  and a delightful user experience.

                  Whether you're launching a startup app or scaling an enterprise solution, we focus on
                  building secure, scalable, and visually appealing applications that users love to use.

                  From concept to deployment, we ensure your mobile app aligns perfectly with your business
                  objectives and user expectations.
                </p>
              </div>
            </article>

            <article
              className={`${styles.serviceCard} ${styles.card3}`}
              style={{ backgroundImage: "url(/images/design-img.png)" }}
            >
              <div className={styles.cardShade} />
              <div className={styles.cardText}>
                <h3>UI/UX Design</h3>
                <p>
                  Our approach to UI/UX design begins with simplicity as its cornerstone —
                  <br /><br />
                  after all, our goal is to ensure that your users can effortlessly
                  explore and interact with your product.

                  Our UI/UX design process begins with understanding your users and their behavior.
                  We design interfaces that are clean, modern, and intuitive, ensuring a seamless user journey
                  from the first interaction to conversion.

                  By combining aesthetics with usability principles, we create experiences that are not only
                  beautiful but also functional and easy to navigate.

                  Our goal is to transform complex ideas into simple, elegant designs that enhance engagement
                  and improve customer satisfaction.
                </p>
              </div>
            </article>

            <article
              className={`${styles.serviceCard} ${styles.card4}`}
              style={{ backgroundImage: "url(/images/idea-img.png)" }}
            >
              <div className={styles.cardShade} />
              <div className={styles.cardText}>
                <h3>Digital strategy &amp; consulting</h3>
                <p>
                  Our Code Core team provides product consulting services for our clients,
                  <br /><br />
                  whether you need to develop a web or mobile solution, our experts can guide you.

                  We help businesses define and execute smart digital strategies that drive real results.
                  Our consulting services focus on identifying opportunities, optimizing workflows, and
                  building scalable digital solutions aligned with your long-term vision.

                  From product strategy and technology selection to performance optimization and growth planning,
                  we guide you through every step of your digital transformation.

                  As your trusted technology partner, we ensure your business stays competitive, innovative,
                  and ready for future challenges.
                </p>
              </div>
            </article>
          </div>
        </div>
      )}
    </section>
  );
}