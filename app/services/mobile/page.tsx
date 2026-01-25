import Image from "next/image";
import Header from "@/app/components/Layout/Header";
import Footer from "@/app/components/Layout/FooterBar";
import styles from "./mobile.module.css";

const CARDS = [
    {
        icon: "/images/market-icon.png",
        text:
            "From market analysis and idea validation to launching a mobile product, we’ll support you with building a mobile strategy that yields tangible results.",
    },
    {
        icon: "/images/team-icon.png",
        text:
            "Our team will guide you at every step of the app development process to deliver custom mobile solutions based on your business goals and requirements.",
    },
    {
        icon: "/images/idea-icon.png",
        text:
            "From ideation and UX to launch and support, we help you turn ideas into reliable mobile experiences users actually love.",
    },
];

export default function MobileServicesPage() {
    return (
        <main className={styles.page}>
            <Header />

            {/* Background layer */}
            <div className={styles.bgWrap} aria-hidden="true">
                <Image
                    src="/images/black-glass-img.png"
                    alt=""
                    fill
                    priority
                    className={styles.bgImg}
                />
            </div>

            {/* Content */}
            <section className={styles.hero}>
                <div className={styles.inner}>
                    <h1 className={styles.title}>
                        Mobile App
                        <br />
                        Development Services
                    </h1>

                    <p className={styles.lead}>
                        We offer a full range of mobile development services from ideation and
                        app design to project launch and support. Code Core helps companies
                        leverage mobile technologies to streamline their operations and improve
                        customer experience and service quality.
                    </p>

                    <div className={styles.cards}>
                        {CARDS.map((c, idx) => (
                            <div key={idx} className={styles.card}>
                                <div className={styles.iconRing} aria-hidden="true">
                                    <Image
                                        src={c.icon}
                                        alt=""
                                        width={34}
                                        height={34}
                                        className={styles.icon}
                                    />
                                </div>
                                <p className={styles.cardText}>{c.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <p className={styles.lead}>
                We offer a full range of mobile development services from ideation and
                app design to project launch and support. Code Core helps companies
                leverage mobile technologies to streamline their operations and improve
                customer experience and service quality.
            </p>

            <p className={styles.lead}>
                We offer a full range of mobile development services from ideation and
                app design to project launch and support. Code Core helps companies
                leverage mobile technologies to streamline their operations and improve
                customer experience and service quality.
            </p>

            <p className={styles.lead}>
                We offer a full range of mobile development services from ideation and
                app design to project launch and support. Code Core helps companies
                leverage mobile technologies to streamline their operations and improve
                customer experience and service quality.
            </p>

            <Footer />
        </main>
    );
}