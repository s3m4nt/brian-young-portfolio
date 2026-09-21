"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { ProjectImage } from "@/data/projects";
import styles from "./Lightbox.module.css";

type Props = {
  image: ProjectImage | null;
  onClose: () => void;
};

/**
 * Native <dialog> gives us focus trapping, Escape-to-close, and returning
 * focus to the thumbnail that opened it, without any extra dependencies.
 */
export function Lightbox({ image, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (image) {
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = "hidden";
    } else {
      if (dialog.open) dialog.close();
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [image]);

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-label={image?.alt ?? "Project image"}
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
      {image && (
        <Image
          className={styles.img}
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="90vw"
          quality={90}
        />
      )}
    </dialog>
  );
}
