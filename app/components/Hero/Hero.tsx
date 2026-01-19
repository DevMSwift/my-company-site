"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./hero.module.css";

type Stage = "intro" | "sequence" | "after";

export default function Hero() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [stage, setStage] = useState<Stage>("intro");

 useEffect(() => {
  const showAt = window.setTimeout(() => setStage("sequence"), 1000);
  const hideAt = window.setTimeout(() => setStage("after"), 6000);

  return () => {
    window.clearTimeout(showAt);
    window.clearTimeout(hideAt);
  };
}, []);

    return (
        <main className={styles.root} id="home">
            <video
                ref={videoRef}
                className={styles.video}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/og.png"
            >
                <source src="/video/hero-bg.mp4" type="video/mp4" />
            </video>

            <div className={styles.overlay} />

            {/* Animated headline sequence (2s -> 6s) */}
            <div
                className={`${styles.sequenceWrap} ${stage === "sequence" ? styles.sequenceOn : ""}`}
                aria-hidden={stage !== "sequence"}
            >
                <div className={styles.sequenceInner}>
                    <div className={styles.logoWall}>
                        <Image
                            src="/images/code_core_logo.png"
                            alt="CodeCore"
                            width={210}
                            height={210}
                            priority
                        />
                    </div>

                    <div className={styles.lines}>
                        <div className={styles.line}>
                            <span className={styles.lineText}>Real Impact, Real Results</span>
                        </div>

                        <div className={styles.line}>
                            <span className={`${styles.lineText} ${styles.accent}`}>CODE CORE</span>
                        </div>

                        <div className={styles.line}>
                            <span className={styles.lineText}>Software Solutions</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}