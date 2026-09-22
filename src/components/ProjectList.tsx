"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project, ProjectImage } from "@/data/projects";
import { Lightbox } from "./Lightbox";
import styles from "./ProjectList.module.css";

export function ProjectList({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<ProjectImage[] | null>(null);

  return (
    <>
      <ol className={styles.list}>
        {projects.map((project, i) => (
          <li className={styles.proj} key={project.id}>
            <div className={styles.row}>
              <div className={styles.index}>{String(i + 1).padStart(2, "0")}</div>

              <div className={styles.text}>
                <p className={styles.role}>{project.role}</p>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.sub}>{project.subtitle}</p>
                {project.links && (
                  <div className={styles.links}>
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                )}
                {project.note && <p className={styles.note}>{project.note}</p>}
              </div>

              <p className={styles.tags}>{project.tags}</p>

              <button
                type="button"
                className={styles.thumb}
                onClick={() =>
                  setActive(project.lightboxImages ?? [project.image])
                }
                aria-label={`View larger image: ${project.title}`}
              >
                <Image
                  className={`${styles.thumbImg}${
                    i > 0 && i < projects.length - 1 ? ` ${styles.thumbBright}` : ""
                  }`}
                  src={project.image.src}
                  alt=""
                  width={project.image.width}
                  height={project.image.height}
                  sizes="(max-width: 760px) 100vw, (max-width: 1100px) 240px, 280px"
                  quality={80}
                />
              </button>
            </div>
          </li>
        ))}
      </ol>

      <Lightbox images={active} onClose={() => setActive(null)} />
    </>
  );
}
