"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ZoomHero.module.css";
import Link from "next/link";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ZoomHero() {
    const rootRef = useRef<HTMLElement | null>(null);
    const heroContainerRef = useRef<HTMLDivElement | null>(null);

    const coverImgRef = useRef<HTMLImageElement | null>(null);
    const coverRef = useRef<HTMLDivElement | null>(null);

    const bg1Ref = useRef<HTMLDivElement | null>(null);
    const bg2Ref = useRef<HTMLDivElement | null>(null);

    const stickRef = useRef<HTMLElement | null>(null);
    const revealRef = useRef<HTMLParagraphElement | null>(null);

    const holeGlowRef = useRef<HTMLDivElement | null>(null);

    const linksRef = useRef<HTMLDivElement | null>(null);

    const [isImgReady, setIsImgReady] = useState(false);

    const quote =
        "Our comprehensive web development services cater to businesses of all sizes, offering cutting-edge website design, e-commerce platforms, and scalable web applications.";
    const chars = useMemo(() => Array.from(quote), [quote]);

    useEffect(() => {
        if (!isImgReady) return;

        // gsap.registerPlugin(ScrollTrigger);

        const root = rootRef.current;
        const heroContainer = heroContainerRef.current;
        const coverImg = coverImgRef.current;
        const cover = coverRef.current;
        const bg1 = bg1Ref.current;
        const bg2 = bg2Ref.current;
        const stick = stickRef.current;
        const holeGlow = holeGlowRef.current;

        if (!root || !heroContainer || !coverImg || !cover || !bg2 || !stick || !holeGlow) return;

        const ctx = gsap.context(() => {
            // ---- INITIAL STATES ----
            // IMPORTANT: use the SAME css var name as in CSS (we'll use --overlayOpacity everywhere)
            gsap.set(cover, { "--overlayOpacity": 1 } as any);
            gsap.set(cover, { autoAlpha: 1 });
            gsap.set(coverImg, { autoAlpha: 1, scale: 1, transformOrigin: "center center" });

            // White bright hole glow visible at start
            gsap.set(holeGlow, {
                autoAlpha: 1,
            });

            // BG1 is optional. If you keep it, make it not “block” BG2.
            if (bg1) {
                gsap.set(bg1, {
                    autoAlpha: 0.25, // keep it low so BG2 is still visible through the hole
                    scale: 1.01,
                    filter: "blur(4px) brightness(1.1)",
                    transformOrigin: "center center",
                });
            }

            // ---- HERO TIMELINE (PINNED) ----
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroContainer,
                    start: "top top",
                    end: "+=320%",     // give it enough scroll distance
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                    // markers: true,
                },
                defaults: { ease: "none" },
            });

            // make sure these are correct at start
            gsap.set(cover, { "--overlayOpacity": 1 } as any);
            gsap.set(coverImg, { autoAlpha: 1, scale: 1, x: 0, y: 0, force3D: true });

            // BG2 visible behind the hole from start (already in your code)
            gsap.set(bg2, {
                autoAlpha: 1,
                scale: 1.03,
                filter: "blur(10px) brightness(1.05)",
                transformOrigin: "center center",
            });

            tl.addLabel("zoomStart", 0);

            // 1) Zoom the tunnel (cover image)
            tl.to(
                coverImg,
                {
                    scale: 2.6,
                    force3D: true,
                    transformOrigin: "center center",
                },
                "zoomStart"
            );

            // 2) Remove vignette gradually while zooming
            tl.to(
                cover,
                { "--overlayOpacity": 0 } as any,
                "zoomStart"
            );

            // 3) Bring BG2 into focus gradually while zooming
            tl.to(
                bg2,
                {
                    scale: 1,
                    filter: "blur(0px) brightness(1)",
                },
                "zoomStart"
            );

            // optional: fade fog bg1 out *slowly* (if you keep bg1)
            if (bg1) {
                tl.to(
                    bg1,
                    { autoAlpha: 0, duration: 0.6 },
                    0.35
                );
            }

            // 4) Smooth “exit / handoff” (longer crossfade instead of snapping)
            tl.addLabel("handoff", 0.62);

            // At handoff: BG2 becomes visible, glow fades out
            tl.to(bg2, { autoAlpha: 1, duration: 0.25 }, "handoff");
            tl.to(holeGlow, { autoAlpha: 0, duration: 0.25 }, "handoff");

            // keep zooming a bit more so it feels like you're exiting the window
            tl.to(
                coverImg,
                { scale: 3.1 },
                "handoff"
            );

            // fade cover image out slowly across the last chunk of scroll
            // Time to move from fdeout and show next image
            tl.to(
                coverImg,
                { autoAlpha: 0, duration: 0.22 },
                "handoff"
            );

            // then hide the cover container AFTER it’s already invisible
            tl.to(
                cover,
                { autoAlpha: 0, duration: 0.01 },
                "handoff+=0.20"
            );

            // small hold so user actually sees BG2 fully clean at the end
            tl.to({}, { duration: 0.15 });

            // ---- TEXT REVEAL ----
            const revealChars = root.querySelectorAll(`.${styles.char}`);
            gsap.set(revealChars, { opacity: 0.2, y: 0 });

            const linksEl = linksRef.current;

            const tl2 = gsap.timeline({
                scrollTrigger: {
                    trigger: stick,
                    pin: true,
                    start: "center center",
                    end: "+=1500",
                    scrub: 1,
                    invalidateOnRefresh: true,
                    // markers: true,
                },
            });

            tl2
                .to(revealChars, { opacity: 1, ease: "none", stagger: 0.03, duration: 1 })
                .to({}, { duration: 1 })
                .to(revealRef.current, { opacity: 1, scale: 1, duration: 2, ease: "none" });

            // show links only near the end
            if (linksEl) {
                gsap.set(linksEl, { autoAlpha: 0, y: 42 });
                tl2.to(linksEl, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, ">-5.25");
            }
        }, root);

        requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => ctx.revert();
    }, [isImgReady, chars]);

    return (
        <main ref={rootRef} className={styles.main}>
            <div ref={heroContainerRef} className={styles.heroContainer}>
                <section className={styles.hero}>
                    <div className={styles.heroContent}>
                        <div ref={bg2Ref} className={styles.heroBg2} />
                        <div ref={holeGlowRef} className={styles.holeGlow} />
                    </div>

                    <div ref={coverRef} className={styles.heroCover}>

                        <Image
                            src="/images/coverd-img-web.png"
                            alt=""
                            fill
                            priority
                            className={styles.heroCoverImg}
                            onLoadingComplete={(img) => {
                                coverImgRef.current = img;
                                setIsImgReady(true);
                            }}
                        />

                    </div>
                </section>
            </div>

            {/* PINNED TEXT SECTION */}
            <section ref={stickRef} className={styles.sectionStick}>
                <p ref={revealRef} className={styles.opacityReveal}>
                    {chars.map((c, i) => (
                        <span key={i} className={styles.char}>
                            {c === " " ? "\u00A0" : c}
                        </span>
                    ))}
                </p>

                {/* Link to other pages */}
                <div ref={linksRef} className={styles.linksRow}>
                    <Link className={styles.linkCard} href="/services/web/hero">
                        <span className={styles.linkTitle}>Web</span>
                        <span className={styles.linkSub}>Development</span>
                    </Link>

                    <Link className={styles.linkCard} href="/services/mobile">
                        <span className={styles.linkTitle}>Mobile App</span>
                        <span className={styles.linkSub}>Development Services</span>
                    </Link>

                    <Link className={styles.linkCard} href="/services/desktop">
                        <span className={styles.linkTitle}>Desktop App</span>
                        <span className={styles.linkSub}>Development Services</span>
                    </Link>

                    <Link className={styles.linkCard} href="/services/ui-ux">
                        <span className={styles.linkTitle}>UX &amp; UI</span>
                        <span className={styles.linkSub}>Design services</span>
                    </Link>
                </div>

            </section>
        </main>
    );
}