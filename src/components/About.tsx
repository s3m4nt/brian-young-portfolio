import styles from "./About.module.css";

const stack = [
  {
    label: "Frontend & Development",
    value:
      "React, Next.js, TypeScript/TSX, JavaScript, Node.js, HTML5, CSS3, SCSS",
  },
  {
    label: "AI Development Workflows",
    value:
      "Cursor, agentic workflows, MCP integrations, AI-assisted implementation, design-to-code workflows",
  },
  {
    label: "Design",
    value: "Visual identity, logo work, video editing",
  },
  {
    label: "Platforms & Tools",
    value:
      "HCL Commerce, Contentstack CMS, Google Cloud Platform (GCP), Git, Postman, Jira, Figma, Searchlight",
  },
  {
    label: "Engineering Practices",
    value:
      "Frontend Architecture, Component Design, Full-stack Development, REST APIs, Accessibility (ADA/WCAG), SEO Best Practices, Agile/Scrum, Code Reviews, Technical Mentorship",
  },
  {
    label: "Additional",
    value: "SQL",
  },
];

export function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.inner}>
        <div>
          <div className={styles.eyebrow}>About</div>
          <h2>
            Before frontend, I was mixing tracks and building sites for touring
            bands.
          </h2>
          <p>
            Same instinct for timing and detail, aimed at a different medium.
            That crossover led to Seattle startups, then six years inside
            enterprise e-commerce — most recently leading frontend engineering
            on a national retail platform.
          </p>
          <p>
            These days that means React and Next.js by day, and an increasingly
            AI-augmented workflow — Cursor, agentic tooling, MCP integrations —
            built to move fast without cutting corners on accessibility,
            performance, or the version of a UI that actually ships.
          </p>
          <p>
            That design instinct shows up beyond the code, too — logo and visual
            identity work, video editing, and translating Figma files into
            production myself rather than handing that off. It also means
            sitting across the table from product, marketing, and QA, not just
            engineering, so what ships actually matches what was intended.
          </p>
        </div>
        <dl className={styles.stack}>
          {stack.map((item) => (
            <div className={styles.row} key={item.label}>
              <dt className={styles.k}>{item.label}</dt>
              <dd className={styles.v}>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
