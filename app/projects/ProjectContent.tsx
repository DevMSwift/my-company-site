"use client";

import { useEffect, useRef } from "react";
import styles from "./projects.module.css";

export default function ProjectContent() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // ----- LOADING SCREEN -----
    const progressBar = root.querySelector<HTMLElement>("#progress-bar");
    const counter = root.querySelector<HTMLElement>("#progress-counter");
    const loadingScreen = root.querySelector<HTMLElement>("#loading-screen");
    const heroSection = root.querySelector<HTMLElement>(".hero");

    if (!progressBar || !counter || !loadingScreen || !heroSection) return;

    const updateProgress = (p: number) => {
      progressBar.style.width = `${p}%`;
      counter.textContent = `${p}%`;
    };

    updateProgress(0);
    document.body.style.overflow = "hidden";

    let progress = 0;
    const increment = 5;

    const updateLoop = window.setInterval(async () => {
      if (progress >= 100) {
        window.clearInterval(updateLoop);

        loadingScreen.style.opacity = "0";
        loadingScreen.style.height = "0";
        heroSection.style.opacity = "1";

        setTimeout(() => {
          document.body.style.overflowY = "auto";
        }, 700);

        // start gsap stuff after loading completes
        await initGsap();
        return;
      }

      updateProgress(progress);
      progress += increment;
    }, 100);

    // ----- SITENAME ABSOLUTE -> RELATIVE -----
    const onScrollSitename = () => {
      const part1 = root.querySelector<HTMLElement>(".part1");
      const sitename = root.querySelector<HTMLElement>(".sitename");
      const spacer = root.querySelector<HTMLElement>(".spacer");
      if (!part1 || !sitename || !spacer) return;

      const part1Top = part1.getBoundingClientRect().top;
      if (part1Top <= 0) {
        sitename.classList.add("relative");
        spacer.classList.add("absolute");
      } else {
        sitename.classList.remove("relative");
        spacer.classList.remove("absolute");
      }
    };

    // ----- HUGE TEXTS FADE IN -----
    const isElementInMiddleViewport = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      const elementMiddle = rect.top + rect.height / 2;
      return elementMiddle >= 0 && elementMiddle <= window.innerHeight;
    };

    const onScrollFadeIn = () => {
      const elements = root.querySelectorAll<HTMLElement>(".fadein");
      elements.forEach((el) => {
        if (isElementInMiddleViewport(el)) {
          el.style.opacity = "1";
          el.classList.add("move-up");
        }
      });
    };

    // ----- ROAD SHRINKING -----
    const onScrollRoad = () => {
      const road = root.querySelector<HTMLElement>(".road");
      if (!road) return;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const roadHeight = windowHeight - (scrollTop / windowHeight) * windowHeight * 1;
      road.style.height = `${roadHeight}px`;
    };

    // ----- FIXED CARDS (same logic) -----
    const onScrollCards = () => {
      const cards = root.querySelector<HTMLElement>(".cards");
      const cardTexts = root.querySelectorAll<HTMLElement>(".cards-text");
      const images = root.querySelectorAll<HTMLElement>(".cards-image");
      const cta = root.querySelector<HTMLElement>(".cards-cta");
      if (!cards || !cta || images.length === 0 || cardTexts.length === 0) return;

      const windowHeight = window.innerHeight;
      const cardsTop = cards.getBoundingClientRect().top;
      const cardsBottom = cards.getBoundingClientRect().bottom;

      if (cardsTop <= 0 && cardsBottom >= windowHeight) {
        images.forEach((img) => img.classList.add("fixed"));
        cta.classList.add("fixed");
      } else {
        images.forEach((img) => img.classList.remove("fixed"));
        cta.classList.remove("fixed");
      }

      cardTexts.forEach((cardText, index) => {
        const top = cardText.getBoundingClientRect().top;
        if (top <= windowHeight / 2 || index === 0) {
          images[index].style.opacity = "1";
          images[index].style.display = "flex";
        } else {
          images[index].style.opacity = "0";
          images[index].style.display = "none";
        }
      });
    };

    // ----- CUSTOM CURSOR -----
    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    let cursorEl: HTMLDivElement | null = null;
    if (!isTouch) {
      cursorEl = document.createElement("div");
      cursorEl.className = "custom-cursor";
      document.body.appendChild(cursorEl);

      const onMouseMove = (e: MouseEvent) => {
        if (!cursorEl) return;
        cursorEl.style.left = `${e.clientX}px`;
        cursorEl.style.top = `${e.clientY}px`;
      };
      document.addEventListener("mousemove", onMouseMove);

      const linkElements = root.querySelectorAll<HTMLElement>(".link, .cards-cta");
      linkElements.forEach((el) => {
        el.addEventListener("mouseenter", () => cursorEl?.classList.add("scale-up"));
        el.addEventListener("mouseleave", () => cursorEl?.classList.remove("scale-up"));
      });

      // cleanup mouse
      // (we clean everything in return)
      (root as any).__onMouseMove = onMouseMove;
    }

    window.addEventListener("scroll", onScrollSitename, { passive: true });
    window.addEventListener("scroll", onScrollFadeIn, { passive: true });
    window.addEventListener("scroll", onScrollRoad, { passive: true });
    window.addEventListener("scroll", onScrollCards, { passive: true });

    // initial run
    onScrollSitename();
    onScrollFadeIn();
    onScrollRoad();
    onScrollCards();

    // ----- GSAP init -----
    async function initGsap() {
      const root = rootRef.current;
      if (!root) return;

      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      const scrollToMod = await import("gsap/ScrollToPlugin");

      const gsap = gsapMod.gsap;
      const ScrollTrigger = stMod.ScrollTrigger;
      const ScrollToPlugin = scrollToMod.ScrollToPlugin;

      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

      // GSAP HORIZONTAL SCROLL
      const container = root.querySelector<HTMLElement>(".horizontal-scroller");
      const wrapper = root.querySelector<HTMLElement>(".horizontal-wrapper");
      const pinContainer = root.querySelector<HTMLElement>(".horizontal-container");
      if (container && wrapper && pinContainer) {
        const getWidth = () => container.scrollWidth - document.documentElement.clientWidth;

        gsap.to(container, {
          x: () => -getWidth(),
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            scrub: 0.5,
            pin: pinContainer,
            end: () => `+=${getWidth()}`,
            invalidateOnRefresh: true,
            markers: false,
          },
        });
      }

      // ZOOM
      gsap.timeline({
        scrollTrigger: {
          trigger: ".zoom",
          scrub: true,
          start: "top top",
          end: "+=1000%",
          pin: true,
        },
      })
        .to(".zoom-circle", { scale: 12 }, "sameTime")
        .to(".zoom-content", { scale: 1 }, "sameTime");
    }

    return () => {
      window.clearInterval(updateLoop);
      document.body.style.overflow = "";

      window.removeEventListener("scroll", onScrollSitename);
      window.removeEventListener("scroll", onScrollFadeIn);
      window.removeEventListener("scroll", onScrollRoad);
      window.removeEventListener("scroll", onScrollCards);

      const onMouseMove = (root as any).__onMouseMove as ((e: MouseEvent) => void) | undefined;
      if (onMouseMove) document.removeEventListener("mousemove", onMouseMove);

      // remove cursor
      document.querySelectorAll(".custom-cursor").forEach((el) => el.remove());
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.scope}>
      {/* LOADING SCREEN */}
      <div id="loading-screen">
        <div id="progress-bar"></div>
        <div id="progress-counter">0%</div>
      </div>

      {/* HERO SECTION */}
      <div className="hero">
        <div className="sun">
          <div className="semicircle"></div>
          <div className="line"></div>
        </div>
        <div className="road"></div>
      </div>

      {/* HUGE TEXTS */}
      <div className="part1">
        <p className="sitename">OUR PROJECTS</p>
        <div className="spacer"></div>
        <div className="big-text">
          <p className="fadein">SAY HELLO</p>
          <p className="fadein">TO THESE</p>
          <p className="fadein">HUGE TEXTS</p>
        </div>
      </div>

      {/* HORIZONTAL SCROLL */}
      <div className="horizontal-container">
        <div className="horizontal-wrapper">
          <div className="horizontal-scroller">
            <div className="row">
              <div className="item filled">
                <p>We have some amazing content on this site. Wanna check 'em out?</p>
                <a className="link item-link">
                  <span className="link-text" data-text="Check our content">
                    Check our content
                  </span>
                </a>
              </div>

              <div className="item filled">
                <p>Fun fact: Minimalism is on the rise…</p>
              </div>

              <div className="item big">
                <p>5,667 Cups of Coffee</p>
              </div>

              <div className="item filled">
                <p>Users memorize only around 6–7 chunks…</p>
                <a className="link item-link">
                  <span className="link-text" data-text="Learn more">
                    Learn more
                  </span>
                </a>
              </div>

              <div className="item filled big">
                <p>How is your UX doing?</p>
              </div>

              <div className="item">
                <p>Fun fact 3: CSS Grid first introduced in 2011…</p>
              </div>
            </div>

            <div className="row">
              <div className="item big">
                <p>Scroll is the new click.</p>
              </div>

              <div className="item filled">
                <p>Infinite scrolling is addictive 😄</p>
                <a className="link item-link">
                  <span className="link-text" data-text="Check it out">
                    Check it out
                  </span>
                </a>
              </div>

              <div className="item filled">
                <p>Fun fact 2: These links won’t navigate here.</p>
              </div>

              <div className="item big">
                <p># I &lt;3 GSAP</p>
              </div>

              <div className="item filled">
                <p>
                  <b>Tip:</b> Search &quot;GSAP Horizontal Scroll&quot;.
                </p>
              </div>

              <div className="item filled">
                <p>See you later 👋</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FIXED CARDS */}
      <div className="cards-container">
        <div className="cards">
          <div className="cards-text-container">
            <div className="cards-text">
              <h2>PROJECT 1</h2>
              <p>Short summary.</p>
              <p>Tech stack.</p>
              <p>Key results.</p>
            </div>

            <div className="cards-text">
              <h2>PROJECT 2</h2>
              <p>Short summary.</p>
              <p>Tech stack.</p>
              <p>Key results.</p>
            </div>

            <div className="cards-text">
              <h2>PROJECT 3</h2>
              <p>Short summary.</p>
              <p>Tech stack.</p>
              <p>Key results.</p>
            </div>

            <div className="cards-cta">GET STARTED</div>
          </div>

          <div className="cards-image-container">
            <div className="cards-image">
              <img
                className="image"
                src="https://github.com/juxtopposed/codepen/blob/main/cards.png?raw=true"
                alt="cards"
              />
              <img
                className="alt"
                src="https://github.com/juxtopposed/codepen/blob/main/cards.png?raw=true"
                alt="cards alt"
              />
            </div>

            <div className="cards-image">
              <img
                className="image"
                src="https://github.com/juxtopposed/codepen/blob/main/zoom.png?raw=true"
                alt="zoom"
              />
              <img
                className="alt"
                src="https://github.com/juxtopposed/codepen/blob/main/zoom.png?raw=true"
                alt="zoom alt"
              />
            </div>

            <div className="cards-image">
              <img
                className="image"
                src="https://github.com/juxtopposed/codepen/blob/main/3dcards.png?raw=true"
                alt="3d"
              />
              <img
                className="alt"
                src="https://github.com/juxtopposed/codepen/blob/main/3dcards.png?raw=true"
                alt="3d alt"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ZOOM */}
      <div className="zoom-container">
        <div className="zoom">
          <h2 className="zoom-heading">KEEP SCROLLING TO ZOOM</h2>
          <div className="zoom-circle"></div>
          <h3 className="zoom-content">ZOOM INNN</h3>

          <div className="footer">
            <p className="footer-content">Thanks for watching!</p>
            <a className="footer-content link" href="#">
              <span className="link-text" data-text="Let's connect">
                Let's connect
              </span>
            </a>
          </div>
        </div>
      </div>

      <div style={{ height: "300vh" }} />
    </div>
  );
}