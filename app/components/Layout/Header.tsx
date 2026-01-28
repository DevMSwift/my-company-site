"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./header.module.css";
import Link from "next/link";

type ServiceLink = { href: string; title: string; sub?: string };

const SERVICES: ServiceLink[] = [
  { href: "/services/web", title: "Web", sub: "Development" },
  { href: "/services/mobile", title: "Mobile App", sub: "Development Services" },
  { href: "/services/desktop", title: "Desktop App", sub: "Development Services" },
  { href: "/services/ui-ux", title: "UX & UI", sub: "Design Services" },
];

type Lang = {
  code: string;
  label: string;
  flag: string; // emoji for now
};

const LANGS: Lang[] = [
  { code: "EN", label: "English", flag: "🇬🇧" },
  { code: "AR", label: "Arabic", flag: "🇸🇦" }, 
  { code: "FR", label: "French", flag: "🇫🇷" },
  { code: "DE", label: "German", flag: "🇩🇪" },
  { code: "IT", label: "Italian", flag: "🇮🇹" },
  { code: "SV", label: "Swedish", flag: "🇸🇪" },
  { code: "PT", label: "Portuguese", flag: "🇵🇹" },
];

export default function Header({ hidden = false }: { hidden?: boolean }) {
  const innerRef = useRef<HTMLDivElement | null>(null);

  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState<Lang>(LANGS[0]); // EN default
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);

  const closeAll = () => {
    setLangOpen(false);
    setServicesOpen(false);
    setMobileOpen(false);
    setMobileLangOpen(false);
    setMobileServicesOpen(false);
  };

  const onMove = (e: React.MouseEvent) => {
    const el = innerRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  };

  // close on outside click + escape
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const el = innerRef.current;
      if (!el) return;

      // If click is outside the header bar, close dropdowns
      if (!el.contains(e.target as Node)) {
        setLangOpen(false);
        setServicesOpen(false);
      }
      // Drawer is handled by backdrop click + ESC
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };

    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // lock background scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className={`${styles.header} ${styles.reveal} ${hidden ? styles.hidden : ""}`}>
      {/* TOP BAR */}
      <div className={styles.inner} ref={innerRef} onMouseMove={onMove}>
        <a
          className={`${styles.brand} ${styles.drop}`}
          href="#home"
          aria-label="Go to Home"
          onClick={() => {
            setLangOpen(false);
          }}
        >
          <Image
            src="/images/code_core_logo.png"
            alt="CodeCore"
            width={50}
            height={50}
          />
        </a>

        {/* DESKTOP NAV */}
        <nav className={`${styles.nav} ${styles.drop}`} aria-label="Primary">
          <Link href="/" className={styles.link}>
            Home
          </Link>
          {/* Services */}
          <div className={styles.menu}>
            <button
              type="button"
              className={styles.navBtn}
              aria-haspopup="menu"
              aria-expanded={servicesOpen}
              onClick={() => {
                setServicesOpen((v) => !v);
                setLangOpen(false);
              }}
            >
              <span className={styles.navBtnLabel}>Services</span>
              <span className={styles.chev}>▾</span>
            </button>

            <div
              className={`${styles.dropdown} ${servicesOpen ? styles.open : ""}`}
              role="menu"
            >
              {SERVICES.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className={styles.serviceItem}
                  role="menuitem"
                  onClick={() => setServicesOpen(false)}
                >
                  <span className={styles.serviceTitle}>{s.title}</span>
                  {s.sub ? <span className={styles.serviceSub}>{s.sub}</span> : null}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/projects" className={styles.link}>
            Projects
          </Link>
          <a href="#contact" className={styles.link}>
            Contact
          </a>
          <a href="#about" className={styles.link}>
            About
          </a>

          {/* Language dropdown */}
          <div className={styles.menu}>
            <button
              type="button"
              className={styles.navBtn}
              aria-haspopup="menu"
              aria-expanded={langOpen}
              onClick={() => {
                setLangOpen((v) => !v);
              }}
            >
              <span className={styles.langCode}>{lang.code}</span>
              <span className={styles.flag}>{lang.flag}</span>
              <span className={styles.chev}>▾</span>
            </button>

            <div
              className={`${styles.dropdown} ${langOpen ? styles.open : ""}`}
              role="menu"
            >
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  className={styles.langItem}
                  role="menuitem"
                  onClick={() => {
                    setLang(l);
                    setLangOpen(false);
                  }}
                >
                  <span className={styles.flag}>{l.flag}</span>
                  <span className={styles.langLabel}>{l.label}</span>
                  <span className={styles.langCodeRight}>{l.code}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* MOBILE BUTTON */}
        <button
          type="button"
          className={`${styles.mobileBtn} ${styles.drop}`}
          aria-label="Open menu"
          onClick={() => {
            setLangOpen(false);
            setMobileOpen(true);
            setMobileLangOpen(false);
          }}
        >
          <Image
            src="/images/side-menu-icon.png"
            alt=""
            width={28}
            height={28}
            priority
          />
        </button>
      </div>

      {/* MOBILE OVERLAY — MUST BE OUTSIDE .inner */}
      <div
        className={`${styles.drawerBackdrop} ${mobileOpen ? styles.drawerOn : ""}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!mobileOpen}
      />

      <aside
        className={`${styles.drawer} ${mobileOpen ? styles.drawerOn : ""}`}
        aria-hidden={!mobileOpen}
      >
        <div className={styles.drawerTop}>
          <span className={styles.drawerTitle}>Menu</span>
          <button
            className={styles.drawerClose}
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            type="button"
          >
            ✕
          </button>
        </div>

        <div className={styles.drawerLinks}>
          <Link href="/" className={styles.link} onClick={() => setMobileOpen(false)}>
            Home
          </Link>

          <div className={styles.drawerSection}>
            <button
              type="button"
              className={styles.drawerAccordionBtn}
              onClick={() => setMobileServicesOpen((v) => !v)}
              aria-expanded={mobileServicesOpen}
            >
              <span>Services</span>
              <span className={styles.chev}>▾</span>
            </button>

            <div className={`${styles.drawerAccordionBody} ${mobileServicesOpen ? styles.open : ""}`}>
              {SERVICES.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className={styles.drawerServiceLink}
                  onClick={() => {
                    setMobileOpen(false);
                    setMobileServicesOpen(false);
                  }}
                >
                  <span className={styles.serviceTitle}>{s.title}</span>
                  {s.sub ? <span className={styles.serviceSub}>{s.sub}</span> : null}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/projects" className={styles.link} onClick={() => setMobileOpen(false)}>
            Projects
          </Link>
          <a href="#contact" onClick={() => setMobileOpen(false)}>
            Contact
          </a>
          <a href="#about" onClick={() => setMobileOpen(false)}>
            About
          </a>

          <div className={styles.drawerSection}>
            <button
              type="button"
              className={styles.drawerAccordionBtn}
              onClick={() => {
                setMobileLangOpen((v) => !v);
              }}
              aria-expanded={mobileLangOpen}
            >
              <span>Language</span>
              <span className={styles.chev}>▾</span>
            </button>

            <div className={`${styles.drawerAccordionBody} ${mobileLangOpen ? styles.open : ""}`}>
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  className={styles.drawerLangBtn}
                  onClick={() => {
                    setLang(l);
                    setMobileOpen(false);
                  }}
                >
                  <span className={styles.flag}>{l.flag}</span>
                  <span className={styles.langLabel}>{l.label}</span>
                  <span className={styles.langCodeRight}>{l.code}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </header>
  );
}