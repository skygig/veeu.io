"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "@/styles/navbar.module.scss";

import stars from "@/assets/svgs/stars.svg";
import github from "@/assets/svgs/github.svg";
import tutorial from "@/assets/svgs/tutorial.svg";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 38) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.main}>
        <h1>veeu</h1>

        {/* Desktop Navigation */}
        <div className={styles.options}>
          <div>
            <span>Features</span>
            <Image src={stars} alt="stars" width={18} />
          </div>
          <div>
            <span>GitHub</span>
            <Image src={github} alt="github" width={18} />
          </div>
          <div>
            <span>Tutorial</span>
            <Image src={tutorial} alt="tutorial" width={18} />
          </div>
        </div>

        {/* Desktop Action Buttons */}
        <div className={styles.action}>
          <Link
            className={styles.login}
            href="https://app.veeu.io/auth?mode=sign-ip"
          >
            <button>Log in</button>
          </Link>

          <Link href="https://app.veeu.io/auth?mode=sign-up">
            <button>Sign up</button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileOptions}>
            <div onClick={closeMobileMenu}>
              <span>Features</span>
              <Image src={stars} alt="stars" width={18} />
            </div>
            <div onClick={closeMobileMenu}>
              <span>GitHub</span>
              <Image src={github} alt="github" width={18} />
            </div>
            <div onClick={closeMobileMenu}>
              <span>Tutorial</span>
              <Image src={tutorial} alt="tutorial" width={18} />
            </div>
          </div>

          <div className={styles.mobileAction}>
            <Link
              className={styles.login}
              href="https://app.veeu.io/auth?mode=sign-ip"
              onClick={closeMobileMenu}
            >
              <button>Log in</button>
            </Link>

            <Link
              href="https://app.veeu.io/auth?mode=sign-up"
              onClick={closeMobileMenu}
            >
              <button>Sign up</button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
