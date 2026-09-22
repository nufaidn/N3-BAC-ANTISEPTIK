"use client";

import { useEffect } from "react";

export default function SiteEffects() {
  useEffect(() => {
    /* ---- Smooth scroll untuk anchor link ---- */
    const onAnchorClick = (e: MouseEvent) => {
      const anchor = e.currentTarget as HTMLAnchorElement;
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    anchors.forEach((a) => a.addEventListener("click", onAnchorClick));

    /* ---- Scroll-triggered animations (AOS-like) ---- */
    const aosElements = document.querySelectorAll("[data-aos]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.getAttribute("data-delay") || "0";
            setTimeout(() => {
              el.classList.add("aos-visible");
            }, parseInt(delay, 10));
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
    );
    aosElements.forEach((el) => observer.observe(el));

    /* ---- Ripple effect pada tombol ---- */
    const rippleStyle = document.createElement("style");
    rippleStyle.textContent = "@keyframes ripple { to { transform: scale(4); opacity: 0; } }";
    document.head.appendChild(rippleStyle);

    const addRipple = (btn: HTMLElement, e: MouseEvent) => {
      const ripple = document.createElement("span");
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px; height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top:  ${e.clientY - rect.top - size / 2}px;
        border-radius: 50%;
        background: rgba(255,255,255,0.4);
        transform: scale(0);
        animation: ripple .55s ease-out forwards;
        pointer-events: none;
      `;
      btn.style.position = "relative";
      btn.style.overflow = "hidden";
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 560);
    };

    const rippleBtns = document.querySelectorAll<HTMLElement>(
      ".btn-primary, .btn-large, .btn-outline, .btn-white, .nav-cta"
    );
    const onRippleClick = (e: MouseEvent) => addRipple(e.currentTarget as HTMLElement, e);
    rippleBtns.forEach((btn) => btn.addEventListener("click", onRippleClick));

    /* ---- Page load fade-in ---- */
    const fadeIn = () => {
      document.body.style.opacity = "0";
      requestAnimationFrame(() => {
        document.body.style.transition = "opacity .5s ease";
        document.body.style.opacity = "1";
      });
    };
    if (document.readyState === "complete") {
      fadeIn();
    } else {
      window.addEventListener("load", fadeIn);
    }

    return () => {
      anchors.forEach((a) => a.removeEventListener("click", onAnchorClick));
      observer.disconnect();
      rippleBtns.forEach((btn) => btn.removeEventListener("click", onRippleClick));
      rippleStyle.remove();
      window.removeEventListener("load", fadeIn);
    };
  }, []);

  return null;
}