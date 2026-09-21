"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CopyEmail.module.css";

export function CopyEmail({ email }: { email: string }) {
  const [hint, setHint] = useState("click to copy");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setHint("copied!");
    } catch {
      setHint("copy failed");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setHint("click to copy"), 1800);
  }

  return (
    <button type="button" className={styles.button} onClick={copy}>
      <span className={styles.addr}>{email}</span>
      <span className={styles.hint} aria-live="polite">
        {hint}
      </span>
    </button>
  );
}
