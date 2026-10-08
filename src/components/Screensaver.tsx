"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Screensaver.module.css";

const DEFAULT_IDLE_SECONDS = 15;
const WAKE_EVENTS = ["mousemove", "keydown", "scroll", "wheel", "touchstart", "pointerdown"];
const DISMISS_EVENTS = ["keydown", "pointerdown", "touchstart"];
const ACTIVATE_EVENT = "screensaver:activate";

/** Turn the screensaver on immediately. Safe to call from a click handler. */
export function activateScreensaver() {
  window.dispatchEvent(new Event(ACTIVATE_EVENT));
}

/**
 * Idle "screensaver": after a stretch of no input, a looping black-and-white
 * architecture film fades in full screen. Any input sends it away.
 * The video is not fetched until the screensaver first turns on.
 * For testing, `?idle=3` shortens the wait to 3 seconds.
 */
export function Screensaver() {
  const [on, setOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const param = Number(new URLSearchParams(window.location.search).get("idle"));
    const idleMs = (param > 0 ? param : DEFAULT_IDLE_SECONDS) * 1000;
    let timer: ReturnType<typeof setTimeout>;
    let active = false;

    const arm = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (document.visibilityState === "visible") {
          active = true;
          setOn(true);
        }
      }, idleMs);
    };

    const dismiss = () => {
      active = false;
      setOn(false);
      arm();
    };

    const activate = () => {
      clearTimeout(timer);
      active = true;
      setOn(true);
    };

    // While it's showing, only a deliberate click, tap or key press dismisses it,
    // so people can move the mouse and just watch.
    const onActivity = (e: Event) => {
      if (!active) return arm();
      if (DISMISS_EVENTS.includes(e.type)) dismiss();
    };

    WAKE_EVENTS.forEach((e) => window.addEventListener(e, onActivity, { passive: true }));
    window.addEventListener(ACTIVATE_EVENT, activate);
    document.addEventListener("visibilitychange", dismiss);
    arm();

    return () => {
      clearTimeout(timer);
      WAKE_EVENTS.forEach((e) => window.removeEventListener(e, onActivity));
      window.removeEventListener(ACTIVATE_EVENT, activate);
      document.removeEventListener("visibilitychange", dismiss);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (on && !reduceMotion) {
      video.play().catch(() => {
        /* autoplay refused: the poster frame stays up, which is fine */
      });
    } else {
      video.pause();
    }
  }, [on]);

  return (
    <div className={`${styles.saver} ${on ? styles.on : ""}`} aria-hidden="true">
      <video
        ref={videoRef}
        className={styles.video}
        poster="/videos/screensaver-poster.webp"
        muted
        loop
        playsInline
        preload="none"
      >
        <source src="/videos/screensaver.webm" type="video/webm" />
        <source src="/videos/screensaver.mp4" type="video/mp4" />
      </video>
      <div className={styles.top}>
        <div>
          <p className={styles.name}>Brian Young</p>
          <p className={styles.role}>Frontend Web Developer</p>
        </div>
        <p className={styles.hint}>Click to return</p>
      </div>
    </div>
  );
}
