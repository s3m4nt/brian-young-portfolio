export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
};

export type Project = {
  id: string;
  title: string;
  /** Short role line shown above the title. */
  role: string;
  subtitle: string;
  tags: string;
  /** Optional small note shown under the links. */
  note?: string;
  image: ProjectImage;
  /** If set, the lightbox shows these instead of `image` (side by side). */
  lightboxImages?: ProjectImage[];
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: "promo-system",
    title: "Promo & Merchandising System",
    role: "Frontend development · Tailored Brands",
    subtitle: "Dynamic homepage campaigns · Men's Wearhouse & Jos. A. Bank",
    tags: "React, Next.js, TypeScript, JavaScript, Node.js, SCSS",
    note: "Screenshots are from my time on the team. The live sites have since changed.",
    links: [
      { label: "menswearhouse.com", href: "https://www.menswearhouse.com" },
      { label: "josbank.com", href: "https://www.josbank.com" },
    ],
    image: {
      src: "/images/projects/promo-system.jpg",
      width: 2400,
      height: 1350,
      alt: "Men's Wearhouse and Jos. A. Bank homepages side by side, with the promo strip and hero campaign labeled",
    },
    lightboxImages: [
      {
        src: "/images/projects/promo-mw.jpg",
        width: 1497,
        height: 718,
        alt: "Men's Wearhouse homepage with a labeled hero campaign, Made for the Whole Party",
        caption: "Men's Wearhouse",
      },
      {
        src: "/images/projects/promo-jos.jpg",
        width: 1474,
        height: 718,
        alt: "Jos. A. Bank homepage with a labeled promo strip and Clearance Suits hero",
        caption: "Jos. A. Bank",
      },
    ],
  },
  {
    id: "sloan",
    title: "Sloan — official site",
    role: "Design, development & site management",
    subtitle: "Custom typography & e-commerce · Next.js rebuild",
    note: "Site since redesigned.",
    tags: "Next.js, Tailwind CSS, JavaScript, SCSS",
    image: {
      src: "/images/projects/sloan.jpg",
      width: 729,
      height: 407,
      alt: "Sloan website screenshot",
    },
  },
  {
    id: "jamc",
    title: "The Jesus and Mary Chain — official site",
    role: "Design, development & site management",
    subtitle:
      "Worldwide marketing hub & retail presence · Next.js rebuild",
    note: "Site since redesigned.",
    tags: "Next.js, Tailwind CSS, JavaScript, SCSS",
    image: {
      src: "/images/projects/jamc.jpg",
      width: 729,
      height: 407,
      alt: "The Jesus and Mary Chain website screenshot",
    },
  },
  {
    id: "ivy",
    title: "Ivy — music sync portfolio site",
    role: "Design, development & site management",
    subtitle: "Placement portfolio for supervisors & agencies",
    note: "Site since redesigned.",
    tags: "WordPress, JavaScript, CSS",
    image: {
      src: "/images/projects/ivy.jpg",
      width: 729,
      height: 407,
      alt: "Ivy website screenshot",
    },
  },
  {
    id: "fow",
    title: "Fountains of Wayne — official site",
    role: "Design, development & site management",
    subtitle: "Consolidated media, store & social into one hub",
    note: "Site since redesigned.",
    tags: "PHP, jQuery, Vanilla JavaScript, CSS",
    image: {
      src: "/images/projects/fow.jpg",
      width: 729,
      height: 407,
      alt: "Fountains of Wayne website screenshot",
    },
  },
];
