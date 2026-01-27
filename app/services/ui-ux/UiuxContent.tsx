"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./uiux.module.css";

export default function UiUxPage() {
    const [enter, setEnter] = useState(false);
    const rootRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        setEnter(true);
    }, []);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const els = Array.from(root.querySelectorAll("[data-reveal]")) as HTMLElement[];

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        (e.target as HTMLElement).classList.add(styles.revealIn);
                        io.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
        );

        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    return (
        <div ref={rootRef} className={`${styles.page} ${enter ? styles.enter : ""}`}>
            {/* ✅ ONLY orange glow circles (no black-glass-water background) */}
            <div className={styles.orangeGlow1} aria-hidden="true" />
            <div className={styles.orangeGlow2} aria-hidden="true" />

            <main className={styles.main}>
                {/* SECTION 1 */}
                <section className={styles.hero}>
                    <div className={styles.heroText}>
                        <h1 className={styles.title}>
                            <span className={styles.stack}>UX</span>
                            <span className={styles.stack}>&</span>
                            <span className={styles.stack}>
                                <span className={styles.line}>UI design services</span>
                            </span>
                        </h1>

                        <p className={styles.subtitle}>
                            Innovative UX and design solutions that elevate user engagement and amplify your brand’s digital impact
                        </p>
                    </div>

                    <div className={styles.heroImgWrap}>
                        <div className={styles.imgCard}>
                            <Image
                                src="/images/design-img1.png"
                                alt="UX design process"
                                fill
                                priority
                                sizes="(max-width: 900px) 92vw, 48vw"
                                className={styles.img1}
                            />
                        </div>
                    </div>
                </section>

                {/* SECTION 2 */}
                <section className={styles.section2}>
                    <div className={styles.sectionText}>
                        <h2 className={styles.h2}>
                            An
                            <br />
                            end-to-end
                            <br />
                            approach to UX/UI design
                        </h2>

                        <p className={styles.p}>
                            Our strategic approach to UX/UI design goes beyond aesthetics; we prioritise humans-centred design
                            principles, creative process and business analysis to ensure that every part of your product contributes to
                            your success and resonates with your target audience.
                        </p>
                    </div>

                    <div className={styles.sectionImgWrap}>
                        <div className={styles.imgCardTall}>
                            <img
                                className={styles.imgTall}
                                src="/images/design-img2.png"
                                alt="Design 2"
                            />
                        </div>
                    </div>
                </section>


                {/* SECTION 3 — UX/UI tools */}
                <section className={styles.toolsSection}>
                    {/* extra orange glow for this section */}
                    <div className={styles.orangeGlowTools} aria-hidden="true" />

                    <div className={styles.toolsHead}>
                        <h2 className={styles.toolsTitle}>UX/UI tools</h2>
                        <p className={styles.toolsSub}>
                            Our team uses industry standard tools to deliver exceptional UI/UX design,
                            ensuring engaging, and intuitive digital experiences for users.
                        </p>
                    </div>

                    <div className={styles.toolsGrid}>
                        <div className={styles.toolCard}>
                            <Image
                                src="/images/figma-icon.svg"
                                alt="Figma"
                                width={70}
                                height={70}
                                className={styles.toolIcon}
                            />
                            <div className={styles.toolName}>Figma</div>
                        </div>

                        <div className={styles.toolCard}>
                            <Image
                                src="/images/illustrator-icon.svg"
                                alt="Illustrator"
                                width={70}
                                height={70}
                                className={styles.toolIcon}
                            />
                            <div className={styles.toolName}>Illustrator</div>
                        </div>

                        <div className={styles.toolCard}>
                            <Image
                                src="/images/sketch-icon.svg"
                                alt="Sketch"
                                width={70}
                                height={70}
                                className={styles.toolIcon}
                            />
                            <div className={styles.toolName}>Sketch</div>
                        </div>

                        <div className={styles.toolCard}>
                            <Image
                                src="/images/miro-icon.svg"
                                alt="Miro"
                                width={70}
                                height={70}
                                className={styles.toolIcon}
                            />
                            <div className={styles.toolName}>Miro</div>
                        </div>
                    </div>
                </section>


                {/* SECTION 4 — Onebby showcase */}
                <section className={styles.onebbySection} data-reveal>
                    {/* orange glow behind the center text */}
                    <div className={styles.onebbyGlow} aria-hidden="true" />

                    {/* top big image */}
                    <div className={styles.onebbyTopCard}>
                        <div className={styles.onebbyTopMedia}>
                            <Image
                                src="/images/design-img3.png"
                                alt="Onebby website design"
                                width={2200}
                                height={1400}
                                className={styles.onebbyTopImg}
                            />
                        </div>
                    </div>

                    {/* bottom row: left image + vertical text + right image */}
                    <div className={styles.onebbyBottomRow}>
                        <div className={styles.onebbyBottomCard}>
                            <div className={styles.onebbyBottomMedia}>
                                <Image
                                    src="/images/onebby-design-img1.png"
                                    alt="Onebby mobile design"
                                    width={500}
                                    height={1000}
                                    className={styles.onebbyBottomImg}
                                />
                            </div>
                        </div>

                        <div className={styles.onebbyMid}>
                            <div className={styles.onebbyText}>Onebby.it</div>
                        </div>

                        <div className={styles.onebbyBottomCard}>
                            <div className={styles.onebbyBottomMedia}>
                                <Image
                                    src="/images/onebby-design-img2.png"
                                    alt="Onebby menu design"
                                    width={500}
                                    height={1000}
                                    className={styles.onebbyBottomImg}
                                />
                            </div>
                        </div>
                    </div>
                </section>


                {/* SECTION 5 — DIXE showcase */}
                <section className={styles.onebbySection} data-reveal>
                    {/* orange glow behind the center text */}
                    <div className={styles.onebbyGlow} aria-hidden="true" />

                    {/* top big image */}
                    <div className={styles.onebbyTopCard}>
                        <div className={styles.onebbyTopMedia}>
                            <Image
                                src="/images/design-img4.png"
                                alt="Onebby website design"
                                width={2200}
                                height={1400}
                                className={styles.onebbyTopImg}
                            />
                        </div>
                    </div>

                    {/* bottom row: left image + vertical text + right image */}
                    <div className={styles.onebbyBottomRow}>
                        <div className={styles.onebbyBottomCard}>
                            <div className={styles.onebbyBottomMedia}>
                                <Image
                                    src="/images/dixe-design-img1.png"
                                    alt="Onebby mobile design"
                                    width={500}
                                    height={1000}
                                    className={styles.onebbyBottomImg}
                                />
                            </div>
                        </div>

                        <div className={styles.onebbyMid}>
                            <div className={styles.onebbyText}>DIXE</div>
                        </div>

                        <div className={styles.onebbyBottomCard}>
                            <div className={styles.onebbyBottomMedia}>
                                <Image
                                    src="/images/dixe-design-img2.png"
                                    alt="Onebby menu design"
                                    width={500}
                                    height={1000}
                                    className={styles.onebbyBottomImg}
                                />
                            </div>
                        </div>
                    </div>
                </section>


                {/* SECTION 6 — TABEBY showcase */}
                <section className={styles.onebbySection} data-reveal>
                    {/* orange glow behind the center text */}
                    <div className={styles.onebbyGlow} aria-hidden="true" />

                    {/* top big image */}
                    <div className={styles.onebbyTopCard}>
                        <div className={styles.onebbyTopMedia}>
                            <Image
                                src="/images/tabeby-desktop-img.png"
                                alt="Onebby website design"
                                width={2200}
                                height={1400}
                                className={styles.onebbyTopImg}
                            />
                        </div>
                    </div>

                    {/* bottom row: left image + vertical text + right image */}
                    <div className={styles.onebbyBottomRow}>
                        <div className={styles.onebbyBottomCard}>
                            <div className={styles.onebbyBottomMedia}>
                                <Image
                                    src="/images/tabeby-design-img1.png"
                                    alt="Onebby mobile design"
                                    width={500}
                                    height={1000}
                                    className={styles.onebbyBottomImg}
                                />
                            </div>
                        </div>

                        <div className={styles.onebbyMid}>
                            <div className={styles.onebbyText}>TABEBY</div>
                        </div>

                        <div className={styles.onebbyBottomCard}>
                            <div className={styles.onebbyBottomMedia}>
                                <Image
                                    src="/images/tabeby-design-img2.png"
                                    alt="Onebby menu design"
                                    width={500}
                                    height={1000}
                                    className={styles.onebbyBottomImg}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <div className={styles.nextSpacer} />
            </main>
        </div>
    );
}