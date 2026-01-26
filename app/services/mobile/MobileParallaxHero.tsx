"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./mobile.module.css";

type AnimConfig = {
    el: HTMLElement;
    setStyle: (v: number) => string;
    calScale: () => (scrollY: number) => number | null;
};

const INDUSTRIES = [
    {
        title: "Healthcare",
        desc: "Increase patient engagement, enhance medical services, and optimize operational processes with mobile health applications.",
        icon: "/images/health-icon.png",
    },
    {
        title: "Insurance",
        desc: "Deliver superior insurance solutions and services by adopting mobile technologies designed with knowledge of your industry.",
        icon: "/images/insurance-icon.png",
    },
    {
        title: "Finance",
        desc: "Whether it’s trading, loan management, or investment banking — mobile fintech software will help you gain a competitive edge.",
        icon: "/images/finance-icon.png",
    },
    {
        title: "Manufacturing",
        desc: "Deliver superior solutions and services by adopting mobile technologies designed with industry knowledge and operational focus.",
        icon: "/images/manufacturing-icon.png",
    },
    {
        title: "Education",
        desc: "Foster online educational processes with bespoke app development to ensure a mobile experience for both teachers and students.",
        icon: "/images/education-icon.png",
    },
    {
        title: "Transportation",
        desc: "Benefit from mobile apps for effective fleet management and logistics operations.",
        icon: "/images/transport-icon.png",
    },
    {
        title: "Real Estate",
        desc: "From agents and sellers to home buyers — we help every part of the real estate market with mobile technologies.",
        icon: "/images/realestate-icon.png",
    },
    {
        title: "Retail & eCommerce",
        desc: "Provide in-person experience and optimize retail processes with mobile apps to entice customers and ensure business growth.",
        icon: "/images/ecommerce-icon.png",
    },
] as const;

export default function MobileParallaxHero() {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const industriesRef = useRef<HTMLDivElement | null>(null);

    // --- HERO HEADER ---//
    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        // --- DOM lookup (scoped to this component) ---
        const floor = root.querySelector<HTMLElement>(`[data-floor]`);
        const l4 = root.querySelector<HTMLElement>(`[data-layer="4"]`);
        const l3 = root.querySelector<HTMLElement>(`[data-layer="3"]`);
        const l2 = root.querySelector<HTMLElement>(`[data-layer="2"]`);
        const l1 = root.querySelector<HTMLElement>(`[data-layer="1"]`);
        const l0 = root.querySelector<HTMLElement>(`[data-layer="0"]`);
        const scrollDownSpan = root.querySelector<HTMLElement>(`[data-scroll-down]`);

        if (!floor || !l4 || !l3 || !l2 || !l1 || !l0) return;

        const createScaleY = (x1: number, y1: number, x2: number, y2: number) => {
            const slope = (y2 - y1) / (x2 - x1);
            return (y3: number) => {
                if (slope === 0) return null;
                return (y3 - y1) / slope + x1;
            };
        };

        const interpolation = (end: number, start: number) => (end - start) * 0.2;

        // We use window scroll, but if your page has its own scroller later,
        // you can swap this to a container scrollTop.
        let scrollYPos = window.scrollY;

        const onScroll = () => {
            scrollYPos = window.scrollY;

            // Hide "Scroll Down" label after first scroll
            if (scrollDownSpan) {
                if (scrollYPos > 0) scrollDownSpan.classList.add(styles.unvisible);
                else scrollDownSpan.classList.remove(styles.unvisible);
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        const configs: AnimConfig[] = [
            {
                el: floor,
                setStyle: (v) => `translate3d(0px, 0px, 0px) scaleY(${v})`,
                calScale: () => createScaleY(1, 0, -1, 914),
            },
            {
                el: l4,
                setStyle: (v) => `translate3d(-50%, ${v}px, 0px)`,
                calScale: () => createScaleY(0, 0, 410, 914),
            },
            {
                el: l3,
                setStyle: (v) => `translate3d(-50%, ${v}px, 0px)`,
                calScale: () => createScaleY(0, 0, 165, 914),
            },
            {
                el: l2,
                setStyle: (v) => `translate3d(-50%, ${v}px, 0px)`,
                calScale: () => createScaleY(0, 0, -130, 914),
            },
            {
                el: l1,
                setStyle: (v) => `translate3d(-50%, ${v}px, 0px)`,
                calScale: () => createScaleY(0, 0, -475, 914),
            },
            {
                el: l0,
                setStyle: (v) => `translate3d(-50%, ${v}px, 0px)`,
                calScale: () => createScaleY(0, 0, -900, 914),
            },
        ];

        const animatables = configs.map((cfg) => {
            let curValue: number | null = null;
            let endValue: number | null = null;

            return {
                calculate() {
                    const scale = cfg.calScale();
                    const tmp = scale(scrollYPos);
                    if (typeof tmp !== "number") return;

                    if (endValue === null) curValue = tmp;
                    endValue = tmp;
                },
                animate() {
                    if (curValue === null || endValue === null) return;
                    curValue += interpolation(endValue, curValue);
                    cfg.el.style.transform = cfg.setStyle(Number(curValue.toFixed(3)));
                },
            };
        });

        let raf = 0;
        const loop = () => {
            for (const a of animatables) {
                a.calculate();
                a.animate();
            }
            raf = requestAnimationFrame(loop);
        };

        raf = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    // --- IntersectionObserver ---//
    useEffect(() => {
        const root = rootRef.current;
        const section = industriesRef.current;
        if (!root || !section) return;

        // Respect reduced motion
        const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
        if (reduce) {
            section.classList.add(styles.inView);
            return;
        }

        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    if (e.isIntersecting) {
                        section.classList.add(styles.inView);
                        io.disconnect(); //run once (performance)
                        break;
                    }
                }
            },
            { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
        );

        io.observe(section);

        return () => io.disconnect();
    }, []);

    return (
        <main ref={rootRef} className={styles.page}>
            {/* Parallax scene */}
            <div className={styles.container}>
                <div className={`${styles.parallax} ${styles.floor}`} data-floor />
                <div className={`${styles.parallax} ${styles.layer}`} data-layer="4" />
                <div className={`${styles.parallax} ${styles.layer}`} data-layer="3" />
                <div className={`${styles.parallax} ${styles.layer}`} data-layer="2" />
                <div className={`${styles.parallax} ${styles.layer}`} data-layer="1" />
                <div className={`${styles.parallax} ${styles.layer}`} data-layer="0" />
            </div>

            {/* Headline */}
            <div className={styles.headline}>
                <p>Mobile</p>
                <div className={styles.subTitle}>
                    <p>App Development</p>
                </div>
            </div>

            {/* Next sections (so the page actually scrolls) */}
            <section className={`${styles.section} ${styles.servicesSection}`}>
                <h2>Mobile App Development Services</h2>
                <p>
                    We offer a full range of mobile development services from ideation and app design to project launch and
                    support. Code Core helps companies leverage mobile technologies to streamline their operations and improve
                    customer experience and service quality.
                </p>

                {/* icons row */}
                <div className={styles.iconRow}>
                    <div className={styles.iconCard}>

                        <Image
                            src="/images/market-icon.png"
                            alt="Market analysis"
                            width={42}
                            height={42}
                            className={styles.iconImg}
                            priority
                        />

                        <p className={styles.iconText}>
                            From market analysis and idea validation to launching a mobile product, we’ll support you with building a
                            mobile strategy that yields tangible results.
                        </p>
                    </div>

                    <div className={styles.iconCard}>

                        <Image
                            src="/images/team-icon.png"
                            alt="Team guidance"
                            width={42}
                            height={42}
                            className={styles.iconImg}
                        />

                        <p className={styles.iconText}>
                            Our team will guide you at every step of the app development process to deliver custom mobile solutions
                            based on your business goals and requirements.
                        </p>
                    </div>

                    <div className={styles.iconCard}>

                        <Image
                            src="/images/idea-icon.png"
                            alt="Idea to launch"
                            width={42}
                            height={42}
                            className={styles.iconImg}
                        />

                        <p className={styles.iconText}>
                            From ideation and UX to launch and support, we help you turn ideas into reliable mobile experiences users
                            actually love.
                        </p>
                    </div>
                </div>


                {/* Industries grid (inside servicesSection) */}
                <div ref={industriesRef} className={styles.industriesWrap}>
                    <h2 className={styles.industriesTitle}>
                        Pioneering Mobile Tech <br /> for Your Business
                    </h2>

                    <div className={styles.industriesGrid}>
                        {INDUSTRIES.map((it, i) => (
                            <article
                                key={it.title}
                                className={styles.industryCard}
                                style={{ ["--d" as any]: `${i * 90}ms` }} // stagger delay
                            >
                                <div className={styles.industriesBox}>
                                    <Image
                                        src={it.icon}
                                        alt={it.title}
                                        width={70}
                                        height={70}
                                        className={styles.industryIcon}
                                        loading="lazy"            // ✅ perf
                                        decoding="async"          // ✅ perf
                                        sizes="70px"
                                    />
                                </div>
                                <h3 className={styles.industryName}>{it.title}</h3>
                                <p className={styles.industryDesc}>{it.desc}</p>
                            </article>
                        ))}
                    </div>
                </div>


                {/* Execution section */}
                <section className={styles.execSection}>
                    <h2 className={styles.execTitle}>Project execution by<br />experienced product builders.</h2>

                    <div className={styles.execGrid}>
                        {/* Android */}
                        <article className={styles.execCard}>
                            <Image src="/images/android-icon.png" alt="Android" width={72} height={72} className={styles.execIcon} />
                            <h3 className={styles.execName}>Android</h3>
                            <p className={styles.execDesc}>
                                Building Android apps using Gradle building tool and Android Studio, for different devices and screen sizes.
                            </p>
                        </article>

                        {/* Apple */}
                        <article className={styles.execCard}>
                            <Image src="/images/apple-icon.png" alt="Apple" width={72} height={72} className={styles.execIcon} />
                            <h3 className={styles.execName}>Apple</h3>
                            <p className={styles.execDesc}>
                                Building iOS apps using Swift programming language, for both iPhone, iPad, mac, apple watch, apple TV.
                            </p>
                        </article>

                        {/* Quality */}
                        <article className={styles.execCard}>
                            <Image src="/images/quality-icon.png" alt="Quality" width={72} height={72} className={styles.execIcon} />
                            <h3 className={styles.execName}>Quality</h3>
                            <p className={styles.execDesc}>
                                Our mobile apps pass through different types of testing: functional testing, compatibility testing, security testing and UI testing.
                            </p>
                        </article>

                        {/* Testing */}
                        <article className={styles.execCard}>
                            <Image src="/images/testing-icon.png" alt="Testing on Different Devices" width={72} height={72} className={styles.execIcon} />
                            <h3 className={styles.execName}>Testing on Different Devices</h3>
                            <p className={styles.execDesc}>
                                We test our applications on different devices, using manual testing and automated testing to deliver high-quality apps.
                            </p>
                        </article>

                        {/* Center last item */}
                        <article className={`${styles.execCard} ${styles.execCardCenter}`}>
                            <Image src="/images/user-icon.png" alt="User-Friendly Designs" width={72} height={72} className={styles.execIcon} />
                            <h3 className={styles.execName}>User-Friendly Designs</h3>
                            <p className={styles.execDesc}>
                                Using the latest platform specific guidelines and trends, we develop professional apps that are not only easy on the eyes but also easy to use.
                            </p>
                        </article>
                    </div>

                </section>
            </section>

            <section className={styles.section}>
                {/* Full-bleed case study image */}
                <div className={styles.fullBleed}>
                    <Image
                        src="/images/food-delivery-img.png"
                        alt="Food delivery case study"
                        fill
                        className={styles.fullBleedImg}
                        sizes="100vw"
                        priority={false}
                    />
                </div>
            </section>
        </main>
    );
}