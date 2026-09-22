"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { ProjectImage } from "@/data/projects";
import styles from "./Lightbox.module.css";

type Props = {
  images: ProjectImage[] | null;
  onClose: () => void;
};

/**
 * Native <dialog> gives us focus trapping, Escape-to-close, and returning
 * focus to the thumbnail that opened it, without any extra dependencies.
 */
export function Lightbox({ images, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const pair = (images?.length ?? 0) > 1;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (images) {
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = "hidden";
      dialog.scrollTop = 0;
    } else {
      if (dialog.open) dialog.close();
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [images]);

  const label =
    images?.map((image) => image.caption ?? image.alt).join(" and ") ??
    "Project image";

  return (
    <dialog
      ref={ref}
      className={`${styles.dialog} ${pair ? styles.paired : ""}`}
      aria-label={label}
      onClose={onClose}
      onClick={onClose}
    >
      <button
        type="button"
        className={styles.close}
        aria-label="Close"
        onClick={onClose}
      >
        &times;
      </button>
      {images && (
        <div
          className={pair ? styles.pair : styles.single}
          onClick={(event) => pair && event.stopPropagation()}
        >
          {images.map((image) => (
            <figure key={image.src} className={styles.figure}>
              {image.caption && (
                <figcaption className={styles.caption}>{image.caption}</figcaption>
              )}
              <Image
                className={styles.img}
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes={pair ? "(max-width: 760px) 92vw, 46vw" : "90vw"}
                quality={90}
              />
            </figure>
          ))}
        </div>
      )}
    </dialog>
  );
}
