import { site } from "@/data/site";
import { CopyEmail } from "./CopyEmail";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section className={styles.contact} id="contact">
      <div className={styles.inner}>
        <div className={styles.eyebrow}>Get in touch</div>
        <CopyEmail email={site.email} />
        <div className={styles.links}>
          <a href={site.links.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={site.phone.href}>{site.phone.label}</a>
        </div>
      </div>
    </section>
  );
}
