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
                        {/* Orange blurry glow */}
                        <div className={styles.orangeBlob2} aria-hidden />
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

                    <div className={styles.block}>
                        <h2 className={styles.h2}>Plugins and utilities development</h2>
                        <p className={styles.p}>
                            Our plugins and utilities development services enable you to enhance existing applications with new
                            capabilities without the need for complete redevelopment. We create custom plugins that can be easily
                            integrated into your desktop apps to streamline tasks, add specific features, or improve performance.
                            These lightweight utilities can automate repetitive processes, provide additional user functionalities, or
                            optimize system performance, helping businesses get more out of their existing software infrastructure.
                        </p>
                    </div>

                    <div className={styles.block}>
                        <h2 className={styles.h2}>Project management</h2>
                        <p className={styles.p}>
                            Our project management approach is grounded in precision and transparency. Leveraging Agile
                            methodologies, we break down each development project into manageable stages, ensuring timely
                            deliverables and adaptive strategies. Our project managers maintain clear, consistent communication
                            with clients throughout the entire process, ensuring that expectations are met at every step. Our desktop
                            application development services imply progress tracking through advanced project management tools,
                            offering full visibility into timelines, milestones, and potential risks.
                        </p>
                    </div>


                    <div className={styles.block}>
                        {/* Orange blurry glow */}
                        <div className={styles.orangeBlob3} aria-hidden />
                        <h2 className={styles.h2}>Enterprise resource/process management software</h2>
                        <p className={styles.p}>
                            We develop robust enterprise resource and process management software that helps businesses of all
                            sizes streamline operations and optimize resource utilization. Whether you need a solution to manage
                            inventory, human resources, supply chain processes, or customer relations, our desktop applications
                            provide you with real-time visibility and control. Our desktop application development company enables
                            you to centralize critical processes, reduce operational inefficiencies, and improve decision-making
                            through data-driven insights.
                        </p>
                    </div>

                    <div className={styles.block}>
                        <h2 className={styles.h2}>Financial software</h2>
                        <p className={styles.p}>
                            Our financial desktop software solutions are designed to meet the stringent requirements of today’s
                            financial institutions. We build secure, high-performance applications that handle everything from
                            real-time transaction processing to complex financial reporting. Our software ensures full compliance
                            with industry regulations such as PCI-DSS, ensuring the safety of sensitive financial data. Additionally,
                            we provide features such as automated billing, payment reconciliation, and data analytics, enabling your
                            organization to efficiently manage financial operations while minimizing risks.
                        </p>
                    </div>


                    <div className={styles.tabebyWrap}>
                        <Image
                            src="/images/tabeby-desktop-img.png"
                            alt="Desktop app dashboard mock"
                            width={1200}
                            height={700}
                            className={styles.imacImg}
                            priority
                        />
                    </div>
                </section>
            </div>
        </main>
    );
}