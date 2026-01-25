"use client";

import styles from "./web.content.module.css";
import { useEffect, useRef, useState } from "react";

export default function WebDevContent() {
    const rootRef = useRef<HTMLElement | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = rootRef.current;
        if (!el) return;

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    io.disconnect(); // animate once
                }
            },
            { threshold: 0.12 }
        );

        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <section
            ref={rootRef}
            className={`${styles.content} ${inView ? styles.inView : ""}`}
        >
            <div className={styles.bgImage} />
            {/* <div className={styles.bgOverlay} /> */}
            {/* Left text column */}
            <div className={styles.textCol}>
                <h1 className={`${styles.title} ${styles.reveal}`} style={{ ["--d" as any]: "0ms" }}>Web</h1>
                <h1 className={`${styles.title} ${styles.reveal}`} style={{ ["--d" as any]: "90ms" }}>Development</h1>

                <p className={`${styles.kicker} ${styles.reveal}`} style={{ ["--d" as any]: "180ms" }}>BUILD HIGH QUALITY SCALABLE WEB APPLICATION</p>

                <p className={`${styles.lead} ${styles.reveal}`} style={{ ["--d" as any]: "260ms" }}>
                    Web development plays a vital role in your business website &amp; web application success,
                    web development is the core (back-end) coding of your application or your business website.
                </p>

                <h2 className={`${styles.sectionTitle} ${styles.reveal}`} style={{ ["--d" as any]: "340ms" }}>Web development services</h2>
                <p className={`${styles.p} ${styles.reveal}`} style={{ ["--d" as any]: "420ms" }}>
                    Our comprehensive web development services cater to businesses of all sizes, offering
                    cutting-edge website design, e-commerce platforms, and scalable web applications.
                </p>

                <h3 className={`${styles.subTitle} ${styles.reveal}`} style={{ ["--d" as any]: "500ms" }}>Front-end web development</h3>
                <p className={`${styles.p} ${styles.reveal}`} style={{ ["--d" as any]: "580ms" }}>
                    In a world where users interact with dozens of digital experiences every day, UI and UX
                    are critically important. Even the most sophisticated tech becomes meaningless if it’s
                    near impossible to interact with. Our front end developers combine an aesthetic
                    sensibility with a relentless focus on what it feels like to interact with your website
                    or web app.
                </p>
                <p className={`${styles.p} ${styles.reveal}`} style={{ ["--d" as any]: "660ms" }}>
                    Working with us, you’ll see fast progress from the outset of your project, starting with
                    an early MVP and progressing through continuous refinement until we arrive at a website
                    or application your users will love.
                </p>

                <h3 className={`${styles.subTitle} ${styles.reveal}`} style={{ ["--d" as any]: "740ms" }}>
                    Full stack web development
                </h3>
                <p className={`${styles.p} ${styles.reveal}`} style={{ ["--d" as any]: "820ms" }}>
                    Full stack development is the comprehensive approach to web development, covering both the
                    frontend and backend to create seamless and dynamic digital experiences. Our full stack
                    developers are experts in both areas, ensuring that every aspect of your project works
                    harmoniously.
                </p>
                <p className={`${styles.p} ${styles.reveal}`} style={{ ["--d" as any]: "900ms" }}>
                    From crafting intuitive user interfaces to building robust backend systems, our team is
                    proficient in the entire technology stack. They constantly seek new ways to enhance
                    functionality, performance, and security. By managing the full development process, we
                    ensure that your project is not only efficient and reliable but also scalable and
                    future-proof. Trust us to deliver a holistic solution that meets all your web development
                    needs.
                </p>

                <h3 className={`${styles.subTitle} ${styles.reveal}`} style={{ ["--d" as any]: "980ms" }}>
                    Open source web development
                </h3>
                <p className={`${styles.p} ${styles.reveal}`} style={{ ["--d" as any]: "1060ms" }}>
                    We’re advocates for power of open source software. By using open source technologies, we
                    can offer our clients cost-effective, secure, and scalable web development solutions.
                    Here are just a few of the benefits of Open Source Software:
                </p>

                <ul className={`${styles.list} ${styles.reveal}`} style={{ ["--d" as any]: "1140ms" }}>
                    <li>
                        <strong>Cost-Effective:</strong> Open source software is free to use and modify,
                        eliminating licensing fees and reducing development costs.
                    </li>
                    <li>
                        <strong>Secure:</strong> Most open source software is developed and reviewed by a global
                        community of developers, ensuring a high level of security. We carefully choose
                        libraries that are well maintained and documented.
                    </li>
                    <li>
                        <strong>Choice:</strong> There are many different technologies to choose from and a
                        myriad of frameworks and libraries. This boosts productivity by reducing the need to
                        build things from scratch.
                    </li>
                </ul>

                <h3 className={`${styles.subTitle} ${styles.reveal}`} style={{ ["--d" as any]: "1220ms" }}>
                    Maintenance and support services
                </h3>
                <p className={`${styles.p} ${styles.reveal}`} style={{ ["--d" as any]: "1300ms" }}>
                    Our maintenance and support services are designed to become an always-available source of
                    the help you need, when you need it, as well as proactive maintenance to check
                    configurations, keep your website secure, and conduct updates on your behalf. We become an
                    extension of your team to take ownership and accountability over the full lifecycle—going
                    live is just the beginning.
                </p>

                <h3 className={`${styles.subTitle} ${styles.reveal}`} style={{ ["--d" as any]: "1380ms" }}>
                    Hosting &amp; infrastructure
                </h3>
                <p className={`${styles.p} ${styles.reveal}`} style={{ ["--d" as any]: "1460ms" }}>
                    As specialists in helping tech businesses succeed, we share your passion for the right
                    hosting architecture and an infrastructure that optimises performance and efficiency. Our
                    database experts can integrate your website or application with existing databases, from
                    MySQL to PostgreSQL and MongoDB, as well as migrating data on your behalf.
                </p>
                <p className={`${styles.p} ${styles.reveal}`} style={{ ["--d" as any]: "1540ms" }}>
                    We can also help you unlock endless scalability with a cloud infrastructure that’s fast,
                    flexible, and constantly available. We build advanced digital products on platforms like
                    AWS and DigitalOcean.
                </p>
            </div>

            {/* Right image like your screenshot */}
            {/* <aside className={styles.imageCol} aria-hidden="true">
                <div className={styles.sideImage} />
            </aside> */}
        </section>
        
    );
}