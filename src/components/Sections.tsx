import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  PROFILE, STATS, EXPERIENCE, MARQUEE_SKILLS, SKILL_GROUPS,
  EDUCATION, CERTIFICATIONS, ROLES, PROJECTS,
  AI_DEV_INTRO, AI_WORKFLOW, AI_PROJECTS
} from "../data";
import TechOrbit from "./TechOrbit";

/* ---------- shared reveal helper (works with horizontal scroll) --- */
function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  style
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y, x: 34 }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function PanelHead({ kicker, title, sub }: { kicker: string; title: React.ReactNode; sub?: string }) {
  return (
    <Reveal className="panel-head">
      <div className="panel-kicker">{kicker}</div>
      <h2 className="panel-title">{title}</h2>
      {sub && <p className="panel-sub">{sub}</p>}
    </Reveal>
  );
}

/* ================================================================ */
/* 1 — HOME                                                          */
/* ================================================================ */
export function HomePanel({ goTo }: { goTo: (id: string) => void }) {
  const stageRef = useRef<HTMLDivElement>(null);

  return (
    <section className="panel panel-home" data-section="home">
      <div className="home-grid">
        <div className="hero-copy">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="hero-hi">Hi, I'm</span>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.12 }}
          >
            <span className="grad">{PROFILE.name}</span>
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.22 }}>
            <span className="hero-role">{PROFILE.role}</span>
          </motion.div>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
          >
            Engineering quality through intelligent automation. I design scalable
            test frameworks, automate complex business workflows, and deliver
            reliable web, mobile, and API testing solutions using <b>Playwright</b>,
            <b> Selenium</b>, <b>Appium</b>, <b>JavaScript</b>, and <b>TypeScript</b> —
            helping teams release faster with confidence.
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
          >
            <button className="btn btn-primary" onClick={() => goTo("contact")}>Contact Me</button>
            <button className="btn btn-ghost" onClick={() => goTo("experience")}>View Experience →</button>
          </motion.div>

          <motion.div
            className="hero-quick"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            <a className="chip" href={PROFILE.phoneHref}>📞 {PROFILE.phone}</a>
            <a className="chip" href={PROFILE.linkedin} target="_blank" rel="noreferrer">💼 LinkedIn</a>
            <a className="chip" href={PROFILE.github} target="_blank" rel="noreferrer">🐙 GitHub</a>
          </motion.div>

          <div className="hero-stats">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                className="stat glass"
                initial={{ opacity: 0, y: 22, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.62 + i * 0.1, type: "spring", bounce: 0.4 }}
              >
                <div className="v">{s.value}</div>
                <div className="l">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* right half: transparent stage — cube shows through from the fixed
            background; the tech-card orbit anchors to this area */}
        <div className="hero-stage" ref={stageRef}>
          <TechOrbit stageRef={stageRef} />
        </div>
      </div>

      <div className="scroll-hint">
        Scroll to explore <span className="arrow">⟶</span>
      </div>
    </section>
  );
}

/* ================================================================ */
/* 2 — EXPERIENCE                                                    */
/* ================================================================ */
export function ExperiencePanel() {
  return (
    <section className="panel panel-exp" data-section="experience">
      <PanelHead
        kicker="Career"
        title={<>Professional <span className="grad">Experience</span></>}
        sub="Building expertise in quality assurance across diverse domains"
      />
      <div className="exp-row">
        {EXPERIENCE.map((job, i) => (
          <React.Fragment key={job.company}>
            <Reveal delay={i * 0.15} className="job-card glass" style={{ display: "flex" }}>
              <div className="job-top">
                <div>
                  <div className="job-title">{job.title}</div>
                  <div className="job-company">{job.company}</div>
                </div>
                <div className="job-meta">
                  <span className="job-period">{job.period}</span>
                  <div className="job-loc">📍 {job.location}</div>
                </div>
              </div>
              <ul className="job-points">
                {job.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </Reveal>
            {i < EXPERIENCE.length - 1 && <div className="exp-timeline">⟵</div>}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

/* ================================================================ */
/* 3 — SKILLS                                                        */
/* ================================================================ */
export function SkillsPanel() {
  return (
    <section className="panel panel-skills" data-section="skills">
      <PanelHead
        kicker="Comprehensive Toolkit"
        title={<>Key Skills <span className="grad">&amp; Tools</span></>}
        sub="End-to-end quality assurance expertise with modern tools and frameworks"
      />

      <div className="marquee">
        <div className="marquee-track">
          {[...MARQUEE_SKILLS, ...MARQUEE_SKILLS].map((s, i) => (
            <span key={i} className="marquee-pill">{s}</span>
          ))}
        </div>
      </div>

      <div className="skills-row">
        {SKILL_GROUPS.map((g, i) => (
          <Reveal
            key={g.title}
            delay={i * 0.08}
            className="skill-card glass"
            style={{ "--accent": g.color } as React.CSSProperties}
          >
            <div className="skill-head">
              <span className="ic">{g.icon}</span>
              {g.title}
            </div>
            <div className="skill-tags">
              {g.items.map((it) => <span key={it} className="skill-tag">{it}</span>)}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================================================================ */
/* 4 — EDUCATION & CERTIFICATIONS                                    */
/* ================================================================ */
export function EducationPanel() {
  return (
    <section className="panel panel-edu" data-section="education">
      <PanelHead
        kicker="Foundation"
        title={<>Education <span className="grad">&amp; Certifications</span></>}
        sub="Academic foundation and professional certifications"
      />
      <div className="edu-row">
        <Reveal className="edu-card glass">
          <div className="cap">🎓</div>
          <div className="edu-degree">{EDUCATION.degree}</div>
          <div className="edu-univ">{EDUCATION.university}</div>
          <div className="edu-college">{EDUCATION.college}</div>
          <span className="edu-year">{EDUCATION.year}</span>
        </Reveal>

        <div className="cert-grid">
          {CERTIFICATIONS.map((c, i) => (
            <Reveal
              key={c.title}
              delay={0.12 + i * 0.09}
              className="cert-card glass"
              style={{ "--accent": c.color } as React.CSSProperties}
            >
              <div className="cert-title">{c.title}</div>
              <div className="cert-issuer">{c.issuer}</div>
              {c.note && <div className="cert-note">{c.note}</div>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================ */
/* 5 — ROLES & RESPONSIBILITIES                                      */
/* ================================================================ */
export function RolesPanel() {
  return (
    <section className="panel panel-roles" data-section="roles">
      <PanelHead
        kicker="What I Do"
        title={<>Roles <span className="grad">&amp; Responsibilities</span></>}
        sub="Core testing responsibilities and expertise areas"
      />
      <div className="roles-row">
        {ROLES.map((r, i) => (
          <Reveal
            key={r.title}
            delay={i * 0.08}
            className="role-card glass"
            style={{ "--accent": r.color } as React.CSSProperties}
          >
            <div className="role-head">
              <span className="ic">{r.icon}</span>
              {r.title}
            </div>
            <ul className="role-points">
              {r.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================================================================ */
/* 6 — PROJECTS                                                      */
/* ================================================================ */
export function ProjectsPanel() {
  return (
    <section className="panel panel-projects" data-section="projects">
      <PanelHead
        kicker="Portfolio"
        title={<>Featured <span className="grad">Projects</span></>}
        sub="Key projects showcasing testing expertise across diverse domains"
      />
      <div className="projects-row">
        {PROJECTS.map((p, i) => (
          <Reveal
            key={p.title}
            delay={i * 0.14}
            className="project-card glass"
            style={{ "--accent": p.accent } as React.CSSProperties}
          >
            <div className="proj-domain">{p.domain}</div>
            <div className="proj-title">{p.title}</div>
            <div className="proj-platforms">
              {p.platforms.map((pl) => <span key={pl} className="platform-pill">{pl}</span>)}
            </div>
            <p className="proj-desc">{p.description}</p>

            <div className="proj-section-title">{p.highlightsTitle}</div>
            {p.highlights.length > 0 && (
              <ul className="proj-highlights">
                {p.highlights.map((h) => <li key={h}>{h}</li>)}
              </ul>
            )}
            {p.modules && (
              <div className="modules-grid">
                {p.modules.map((m) => (
                  <div key={m.name} className="module-cell">
                    <div className="mn">{m.name}</div>
                    <div className="md">{m.desc}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="proj-section-title">Technologies Used</div>
            <div className="proj-tech">
              {p.tech.map((t) => <span key={t} className="tech-pill">{t}</span>)}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================================================================ */
/* 7 — AI-POWERED DEVELOPMENT                                        */
/* ================================================================ */
export function AIDevPanel() {
  return (
    <section className="panel panel-aidev" data-section="aidev">
      <PanelHead
        kicker={AI_DEV_INTRO.kicker}
        title={<><span className="ai-spark">✦</span> AI-Powered <span className="grad">Development</span></>}
        sub={AI_DEV_INTRO.sub}
      />

      <div className="aidev-row">
        {/* intro + workflow column */}
        <Reveal className="aidev-intro glass">
          <div className="aidev-pitch">{AI_DEV_INTRO.pitch}</div>
          <div className="aidev-flow">
            {AI_WORKFLOW.map((w) => (
              <div key={w.step} className="flow-step">
                <div className="fs-top">
                  <span className="fs-num">{w.step}</span>
                  <span className="fs-ic">{w.icon}</span>
                  <span className="fs-title">{w.title}</span>
                </div>
                <div className="fs-desc">{w.desc}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* AI project cards */}
        {AI_PROJECTS.map((p, i) => (
          <Reveal
            key={p.title}
            delay={0.1 + i * 0.09}
            className={`aidev-card glass${p.status === "Concept" ? " concept" : ""}`}
            style={{ "--accent": p.accent } as React.CSSProperties}
          >
            <div className="ac-top">
              <span className="ac-icon">{p.icon}</span>
              <span className={`ac-status s-${p.status.replace(" ", "").toLowerCase()}`}>
                {p.status === "Live" && <span className="live-dot" />}
                {p.status}
              </span>
            </div>
            <div className="ac-title">{p.title}</div>
            <div className="ac-tagline">{p.tagline}</div>
            <p className="ac-desc">{p.description}</p>

            <div className="ac-label">Built with AI</div>
            <div className="ac-pills">
              {p.aiTools.map((t) => <span key={t} className="ai-pill">🤖 {t}</span>)}
            </div>

            <div className="ac-label">Tech Stack</div>
            <div className="ac-pills">
              {p.stack.map((t) => <span key={t} className="stack-pill">{t}</span>)}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================================================================ */
/* 8 — CONTACT + footer                                              */
/* ================================================================ */
export function ContactPanel() {
  const items = [
    { icon: "📞", label: "Phone", value: PROFILE.phone, href: PROFILE.phoneHref, color: "#10b981" },
    { icon: "✉️", label: "Email", value: PROFILE.email, href: PROFILE.emailHref, color: "#22d3ee" },
    { icon: "💼", label: "LinkedIn", value: PROFILE.linkedinLabel, href: PROFILE.linkedin, color: "#2684FF" },
    { icon: "🐙", label: "GitHub", value: PROFILE.githubLabel, href: PROFILE.github, color: "#a855f7" }
  ];

  return (
    <section className="panel panel-contact" data-section="contact">
      <PanelHead
        kicker="Let's Connect"
        title={<>Get In <span className="grad">Touch</span></>}
        sub="Let's connect and discuss how I can contribute to your team"
      />
      <div className="contact-grid">
        <Reveal className="contact-copy">
          <div className="big">Looking for a dedicated <span className="grad">QA professional?</span></div>
          <p>
            I'm currently open to new opportunities and would love to hear from you.
            Whether you have a question or just want to say hi, feel free to reach out!
          </p>
          <div className="contact-loc">📍 {PROFILE.location}</div>
          <div className="contact-cta glass" style={{ marginTop: 22 }}>
            <div className="q">Ready when you are —</div>
            <a className="btn btn-primary" href={PROFILE.emailHref}>Let's Work Together 🚀</a>
          </div>
        </Reveal>

        <div className="contact-list">
          {items.map((it, i) => (
            <Reveal key={it.label} delay={0.1 + i * 0.09}>
              <a
                className="contact-item glass"
                href={it.href}
                target={it.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                style={{ "--accent": it.color } as React.CSSProperties}
              >
                <span className="ic">{it.icon}</span>
                <span>
                  <div className="lbl">{it.label}</div>
                  <div className="val">{it.value}</div>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="footer-inline">
        <div className="footer-brand">
          <span className="mini">{PROFILE.initials}</span>
          {PROFILE.name} · {PROFILE.role}
        </div>
        <div>© 2024 All rights reserved. Built with 💚</div>
      </div>
    </section>
  );
}
