import styles from "./footerBar.module.css";

export default function FooterBar() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.logoWrap}>
          <img className={styles.logo} src="/images/code_core_logo.png" alt="CODE CORE" />
        </div>

        <div className={styles.sep} />

        <a className={styles.email} href="mailto:info@codecore-cc.com">
          <img className={styles.mailIcon} src="/images/mail-icon.png" alt="Mail Icon" />
          info@codecore-cc.com
        </a>

        <div className={styles.sep} />

        <div className={styles.copy}>© 2025 All Rights Reserved.</div>

        <div className={styles.sep} />

        <div className={styles.powered}>Powered by CODE CORE.</div>
      </div>
    </footer>
  );
}