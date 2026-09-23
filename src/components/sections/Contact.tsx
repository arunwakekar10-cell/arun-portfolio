"use client";

import { profile } from "@/lib/portfolio-data";
import SectionHeading from "@/components/sections/SectionHeading";
import {
  Phone,
  Mail,
  Linkedin,
  Github,
  MapPin,
  Rocket,
} from "lucide-react";

const contactItems = [
  { icon: Phone, label: "PHONE", value: profile.phone, href: profile.phoneHref },
  { icon: Mail, label: "EMAIL", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Linkedin, label: "LINKEDIN", value: "Arun Wakekar", href: profile.linkedin },
  { icon: Github, label: "GITHUB", value: "Ajay1Arun", href: profile.github },
];

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[#070b09] py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-emerald-500/8 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          micro="LET'S CONNECT"
          title="Get In Touch"
          subtitle="Let's connect and discuss how I can contribute to your team"
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* left: pitch */}
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-bold text-[#e8f0ec] sm:text-2xl">
              Looking for a dedicated QA professional?
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[#a7bfb4] sm:text-[15px]">
              I&apos;m currently open to new opportunities and would love to hear
              from you. Whether you have a question or just want to say hi, feel
              free to reach out!
            </p>
            <p className="mt-5 flex items-center gap-2 text-sm text-[#8ba39a]">
              <MapPin className="h-4 w-4 text-emerald-400" />
              {profile.location}
            </p>

            <a
              href={`mailto:${profile.email}`}
              className="mt-8 inline-flex w-fit items-center gap-2.5 rounded-xl bg-emerald-400 px-7 py-3.5 text-sm font-bold text-[#06251a] shadow-lg shadow-emerald-400/25 transition hover:-translate-y-0.5 hover:bg-emerald-300"
            >
              <Rocket className="h-4 w-4" />
              Ready when you are — Let&apos;s Work Together 🚀
            </a>
          </div>

          {/* right: contact cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {contactItems.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl border border-[#1c2b24] bg-[#0d1411]/80 p-5 transition hover:-translate-y-1 hover:border-emerald-400/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-400/8 transition group-hover:scale-110">
                  <c.icon className="h-5 w-5 text-emerald-400" />
                </span>
                <span className="mt-4 text-[10px] font-bold tracking-[0.25em] text-[#8ba39a]">
                  {c.label}
                </span>
                <span className="mt-1 break-words text-sm font-semibold text-[#e8f0ec] group-hover:text-emerald-300">
                  {c.value}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
