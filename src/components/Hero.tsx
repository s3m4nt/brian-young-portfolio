import Image from "next/image";
import { site } from "@/data/site";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <header className={styles.hero}>
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.bg}
      />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.topbar}>
        <div className={styles.mark}>
          <Image
            src="/images/logo.png"
            alt="Brian Young logo mark"
            width={225}
            height={147}
            priority
          />
        </div>
        <nav className={styles.elsewhere} aria-label="Elsewhere">
          <a href={site.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={site.links.resume} target="_blank" rel="noopener noreferrer">Résumé</a>
        </nav>
      </div>

      <div className={styles.nameWrap}>
        <div>
          <h1 className={styles.name}>
            <span className={styles.word}>Brian</span>
            <span className={styles.word}>Young.</span>
          </h1>
          <p className={styles.role}>{site.role}</p>
          <a className={styles.scrollCue} href="#about" aria-label="Scroll to About">
            <span className={styles.line} />
            <span className={styles.head} />
          </a>
        </div>
      </div>

      <div className={styles.bottombar}>
        <nav className={styles.pagenav} aria-label="Page sections">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
