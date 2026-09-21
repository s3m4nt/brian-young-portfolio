import { site } from "@/data/site";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      &copy; {new Date().getFullYear()} {site.name}
    </footer>
  );
}
