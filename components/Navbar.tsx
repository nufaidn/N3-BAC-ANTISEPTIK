"use client";

import { useEffect, useState } from "react";

const WHATSAPP_URL = `https://wa.me/6282324764733?text=${encodeURIComponent(
  "Halo! Saya ingin memesan N3 BAC Antiseptik 100 ml. Boleh dibantu info harga dan ketersediaan stoknya? Terima kasih."
)}`;

const NAV_LINKS = [
  { href: "#keunggulan", label: "Keunggulan" },
  { href: "#jenis-luka", label: "Indikasi" },
  { href: "#testimoni", label: "Testimoni" },
  { href: "#kontak", label: "Pesan Sekarang", cta: true },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el != null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <header className="navbar" id="navbar">
        <div className="navbar-inner">
          <a href="#home" className="logo">
            <img src="/img/logo.png" alt="N3 ENTRI" className="logo-img" />
          </a>
          <nav className={open ? "nav-links open" : "nav-links"} id="navLinks">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={
                  link.cta
                    ? "nav-cta"
                    : active === link.href
                      ? "active"
                      : undefined
                }
                onClick={close}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="navbar-actions">
            <a href="#kontak" className="nav-cta navbar-cta" onClick={close}>
              Pesan Sekarang
            </a>
            <button
              className={open ? "hamburger open" : "hamburger"}
              id="hamburger"
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <div
        className={open ? "nav-backdrop open" : "nav-backdrop"}
        id="navBackdrop"
        aria-hidden="true"
        onClick={close}
      />
    </>
  );
}