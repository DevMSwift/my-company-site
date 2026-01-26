"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./desktop.module.css";

export default function DesktopContent() {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        // triggers fade/slide in after first paint
        const t = requestAnimationFrame(() => setReady(true));
        return () => cancelAnimationFrame(t);
    }, []);

    return (
        <main className={styles.page}>
            {/* Background */}
            <div className={styles.bgWrap} aria-hidden>
                <Image
                    src="/images/black-glass-water-img.png"
                    alt=""
                    fill
                    priority
                    className={styles.bgImg}
                    sizes="620px"
                />
            </div>

            {/* Orange blurry glow */}
            <div className={styles.orangeBlob} aria-hidden />

            {/* Content */}
            <div className={`${styles.content} ${ready ? styles.in : ""}`}>
                {/* HERO */}
                <section className={styles.hero}>
                    <div className={styles.heroText}>
                        <h1 className={styles.title}>
                            Desktop App
                            <br />
                            Development Services
                        </h1>

                        <p className={styles.subtitle}>
                            Engineering high-performance apps that integrate seamlessly with your workflows,
                            boosting efficiency and enabling new capabilities.
                        </p>
                    </div>

                    <div className={styles.imacWrap}>
                        <Image
                            src="/images/imac-new-img.png"
                            alt="Desktop app dashboard mock"
                            width={1200}
                            height={700}
                            className={styles.imacImg}
                            priority
                        />
                    </div>
                </section>

                {/* BODY */}
                <section className={styles.body}>
                    <div className={styles.block}>
                        <h2 className={styles.h2}>Full-cycle desktop app development</h2>
                        <p className={styles.p}>
                            Our full-cycle desktop app development process covers every stage of development,
                            ensuring a seamless experience from start to finish. We begin by thoroughly understanding
                            your business objectives and technical requirements, followed by conceptualization,
                            prototyping, and iterative design. Our agile development process prioritizes efficiency
                            and flexibility, allowing us to accommodate changes swiftly. We perform rigorous testing
                            throughout to ensure the application performs optimally under all conditions.
                        </p>
                    </div>

                    <div className={styles.block}>
                        <h2 className={styles.h2}>Third-party API integrations</h2>
                        <p className={styles.p}>
                            We specialize in integrating a wide range of third-party APIs to extend the functionality
                            and versatility of your desktop applications. Our services include integrating APIs for
                            payment gateways, social media platforms, data analytics tools, ERP systems, and more.
                            Each integration is tailored to ensure secure, reliable data exchange, enhancing the overall
                            functionality of your desktop app. Our API integration ensures that your app can communicate
                            with external systems efficiently, improving user experience and overall system interoperability.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}