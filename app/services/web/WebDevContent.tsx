import styles from "./web.content.module.css";

export default function WebDevContent() {
    return (
        <section className={styles.content}>
            <div className={styles.bgImage} />
            {/* <div className={styles.bgOverlay} /> */}
            {/* Left text column */}
            <div className={styles.textCol}>
                <h1 className={styles.title}>Web</h1>
                <h1 className={styles.title}>Development</h1>

                <p className={styles.kicker}>BUILD HIGH QUALITY SCALABLE WEB APPLICATION</p>

                <p className={styles.lead}>
                    Web development plays a vital role in your business website &amp; web application success,
                    web development is the core (back-end) coding of your application or your business website.
                </p>

                <h2 className={styles.sectionTitle}>Web development services</h2>
                <p className={styles.p}>
                    Our comprehensive web development services cater to businesses of all sizes, offering
                    cutting-edge website design, e-commerce platforms, and scalable web applications.
                </p>

                <h3 className={styles.subTitle}>Front-end web development</h3>
                <p className={styles.p}>
                    In a world where users interact with dozens of digital experiences every day, UI and UX
                    are critically important. Even the most sophisticated tech becomes meaningless if it’s
                    near impossible to interact with. Our front end developers combine an aesthetic
                    sensibility with a relentless focus on what it feels like to interact with your website
                    or web app.
                </p>
                <p className={styles.p}>
                    Working with us, you’ll see fast progress from the outset of your project, starting with
                    an early MVP and progressing through continuous refinement until we arrive at a website
                    or application your users will love.
                </p>

                <h3 className={styles.subTitle}>Full stack web development</h3>
                <p className={styles.p}>
                    Full stack development is the comprehensive approach to web development, covering both the
                    frontend and backend to create seamless and dynamic digital experiences. Our full stack
                    developers are experts in both areas, ensuring that every aspect of your project works
                    harmoniously.
                </p>
                <p className={styles.p}>
                    From crafting intuitive user interfaces to building robust backend systems, our team is
                    proficient in the entire technology stack. They constantly seek new ways to enhance
                    functionality, performance, and security. By managing the full development process, we
                    ensure that your project is not only efficient and reliable but also scalable and
                    future-proof. Trust us to deliver a holistic solution that meets all your web development
                    needs.
                </p>

                <h3 className={styles.subTitle}>Open source web development</h3>
                <p className={styles.p}>
                    We’re advocates for power of open source software. By using open source technologies, we
                    can offer our clients cost-effective, secure, and scalable web development solutions.
                    Here are just a few of the benefits of Open Source Software:
                </p>

                <ul className={styles.list}>
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

                <h3 className={styles.subTitle}>Maintenance and support services</h3>
                <p className={styles.p}>
                    Our maintenance and support services are designed to become an always-available source of
                    the help you need, when you need it, as well as proactive maintenance to check
                    configurations, keep your website secure, and conduct updates on your behalf. We become an
                    extension of your team to take ownership and accountability over the full lifecycle—going
                    live is just the beginning.
                </p>

                <h3 className={styles.subTitle}>Hosting &amp; infrastructure</h3>
                <p className={styles.p}>
                    As specialists in helping tech businesses succeed, we share your passion for the right
                    hosting architecture and an infrastructure that optimises performance and efficiency. Our
                    database experts can integrate your website or application with existing databases, from
                    MySQL to PostgreSQL and MongoDB, as well as migrating data on your behalf.
                </p>
                <p className={styles.p}>
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