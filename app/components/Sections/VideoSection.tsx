import styles from "./videoSection.module.css";

type Props = {
  id: string;
  videoSrc: string;
  title: string;
  subtitle: string;
};

export default function VideoSection({ id, videoSrc, title, subtitle }: Props) {
  return (
    <section id={id} className={styles.section}>
      <video className={styles.video} autoPlay muted loop playsInline preload="metadata">
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </section>
  );
}