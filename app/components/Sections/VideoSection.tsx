"use client";

import { useEffect, ReactNode, useRef, useState } from "react";
import styles from "./videoSection.module.css";

type Props = {
  id: string;
  videoSrc?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  variant?: "hero" | "info" | "cards" | "nextSteps" | "benefits" | "default";
};

type Stage = "idle" | "l1" | "l2" | "l3" | "body";

export default function VideoSection({
  id,
  videoSrc,
  title,
  subtitle,
  children,
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
  const isNextSteps = variant === "nextSteps";
  const isBenefits = variant === "benefits";

  const nextRef = useRef<HTMLDivElement | null>(null);
  const [nextIn, setNextIn] = useState(false);
  const [step, setStep] = useState<"s1" | "s2" | "s3" | "final">("s1");

  useEffect(() => {
    if (variant !== "nextSteps") return;

    const el = nextRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNextIn(true);
      },
      { threshold: 0.45 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [variant]);

  useEffect(() => {
    if (variant !== "nextSteps") return;
    if (!nextIn) return;

    setStep("s1");

    const t1 = window.setTimeout(() => setStep("s2"), 2000);  // show 1 for 2s
    const t2 = window.setTimeout(() => setStep("s3"), 4000); // show 2 for 2s
    const t3 = window.setTimeout(() => setStep("final"), 6000); // show 3 then final

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [variant, nextIn]);

  return (
    <section id={id} className={styles.section}>
      {!isCards && !isNextSteps && (
        <>
          <video className={styles.video} autoPlay muted loop playsInline preload="metadata">
            <source src={videoSrc} type="video/mp4" />
          </video>
          <div className={styles.overlay} />
        </>
      )}

      {/* DEFAULT sections */}
      {!isHero && !isInfo && !isCards && !isNextSteps && !isBenefits && (
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





      {isNextSteps && (
        <div
          ref={nextRef}
          className={`${styles.nextWrap} ${nextIn ? styles.nextIn : ""}`}
        >
          {/* orange glow */}
          <div className={styles.nextGlow} />

          {/* glass ball left */}
          <img
            className={styles.nextBall}
            src="/images/black-glass-ball-img.png"
            alt=""
            aria-hidden="true"
          />

          {/* Center area */}
          <div className={styles.nextCenter}>
            <h2 className={`${styles.nextTitle} ${step === "final" ? styles.titleOn : ""}`}>
              What Next?
            </h2>

            {/* Step “spotlight” (one at a time) */}
            <div className={styles.nextSpot}>
              <div
                className={`${styles.spotItem} ${styles.spot1} ${step === "s1" ? styles.spotOn : (nextIn && step !== "final" ? styles.spotOff : "")
                  }`}
              >
                <img className={styles.spotIcon} src="/images/connect-img.png" alt="" aria-hidden="true" />
                <h3>First Connect</h3>
                <p>
                  Our experts will do primary analysis of your requirements and call you within 24 hours
                  with more information on our next steps.
                </p>
              </div>

              <div
                className={`${styles.spotItem} ${styles.spot2} ${step === "s2" ? styles.spotOn : (nextIn && step !== "final" ? styles.spotOff : "")
                  }`}
              >
                <img className={styles.spotIcon} src="/images/analysis-img.png" alt="" aria-hidden="true" />
                <h3>Requirement Analysis</h3>
                <p>
                  Our team will collect all requirements for your project, clarify your business objectives,
                  expectations and compare market segment.
                </p>
              </div>

              <div
                className={`${styles.spotItem} ${styles.spot3} ${step === "s3" ? styles.spotOn : (nextIn && step !== "final" ? styles.spotOff : "")
                  }`}
              >
                <img className={styles.spotIcon} src="/images/time-img.png" alt="" aria-hidden="true" />
                <h3>Final Project Estimate</h3>
                <p>
                  We will develop an elaborate project blueprint followed by a final estimate and an action plan
                  for your project.
                </p>
              </div>
            </div>

            {/* Final 3-column layout */}
            <div className={`${styles.nextGrid} ${step === "final" ? styles.gridOn : ""}`}>
              <div className={styles.gridItem}>
                <img className={styles.gridIcon} src="/images/connect-img.png" alt="" aria-hidden="true" />
                <h3>First Connect</h3>
                <p>
                  Our experts will do primary analysis of your requirements and call you within 24 hours with
                  more information on our next steps.
                </p>
              </div>

              <div className={styles.gridItem}>
                <img className={styles.gridIcon} src="/images/analysis-img.png" alt="" aria-hidden="true" />
                <h3>Requirement Analysis</h3>
                <p>
                  Our team will collect all requirements for your project, clarify your business objectives,
                  expectations and compare market segment.
                </p>
              </div>

              <div className={styles.gridItem}>
                <img className={styles.gridIcon} src="/images/time-img.png" alt="" aria-hidden="true" />
                <h3>Final Project Estimate</h3>
                <p>
                  We will develop an elaborate project blueprint followed by a final estimate and an action plan
                  for your project.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className={`${styles.nextCta} ${step === "final" ? styles.ctaOn : ""}`}>
              <h3>INTERESTED IN OUR SERVICES?</h3>
              <p>
                Let us know what problem you want to solve,
                <br />
                and we’ll get back to you with our next steps.
              </p>

              <button className={styles.nextBtn}>Start your project</button>
            </div>
          </div>
        </div>
      )}




      {/* BENEFITS section (used inside VideoSection by id) */}
      {isBenefits && (
        <div className={styles.benefitsWrap}>
          {/* optional heading for the section */}
          {(title || subtitle) && (
            <div className={styles.benefitsHead}>
              {title ? <h2 className={styles.benefitsTitle}>{title}</h2> : null}
              {subtitle ? <p className={styles.benefitsSubtitle}>{subtitle}</p> : null}
            </div>
          )}

          {/* ✅ your BenefitsGrid goes here */}
          {children}
        </div>
      )}
    </section>
  );
}