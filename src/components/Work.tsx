import { projects } from "@/data/projects";
import { ProjectList } from "./ProjectList";
import styles from "./Work.module.css";

export function Work() {
  return (
    <section className={styles.work} id="work">
      <div className={styles.head}>
        <h2>Selected work</h2>
      </div>
      <ProjectList projects={projects} />
    </section>
  );
}
