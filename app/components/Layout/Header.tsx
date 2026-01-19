import Image from "next/image";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.brand} href="#home" aria-label="Go to Home">
          <Image
            src="/images/code_core_logo.png"
            alt="CodeCore"
            width={50}
            height={50}
          />
        </a>

        <nav className={styles.nav}>
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          <a href="#about">About</a>
          <a href="#about">EN</a>
        </nav>
      </div>
    </header>
  );
}