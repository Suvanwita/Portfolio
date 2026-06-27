"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";
import { useEffect, useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

type EducationItem = {
  institute: string;
  degree: string;
  period: string;
  score: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  location: string;
  note?: string;
};

const educationItems: EducationItem[] = [
  {
    institute: "IIIT Allahabad",
    degree: "B.Tech Information Technology",
    period: "2024-Present",
    score: 8.92,
    decimals: 2,
    prefix: "CGPA ",
    location: "Prayagraj, UP",
  },
  {
    institute: "Kalyani Central Model School",
    degree: "Class 12 CBSE",
    period: "2022-2024",
    score: 95.4,
    decimals: 1,
    suffix: "%",
    location: "Kalyani, West Bengal",
  },
  {
    institute: "Julien Day School, Kalyani",
    degree: "Class 10 ICSE",
    period: "Till 2022",
    score: 98.8,
    decimals: 1,
    suffix: "%",
    location: "Kalyani, West Bengal",
    note: "State Merit Position 5th",
  },
];

function CountUpScore({ item }: { item: EducationItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 70, damping: 22 });
  const score = useTransform(
    springValue,
    (latest) => `${item.prefix ?? ""}${latest.toFixed(item.decimals ?? 0)}${item.suffix ?? ""}`,
  );

  useEffect(() => {
    if (isInView) {
      motionValue.set(item.score);
    }
  }, [isInView, item.score, motionValue]);

  return (
    <div ref={ref}>
      <motion.p className="text-3xl font-black text-white sm:text-4xl">{score}</motion.p>
    </div>
  );
}

function TimelineCard({ item, index }: { item: EducationItem; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.article
      className="glass-card group relative rounded-2xl p-5 transition-shadow hover:shadow-neon sm:p-6 lg:w-[calc(50%-2.5rem)]"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.58, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.01 }}
    >
      <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-[image:var(--gradient-neon)] opacity-70" />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">{item.degree}</p>
          <h3 className="mt-3 text-2xl font-black text-white">{item.institute}</h3>
          {item.note ? <p className="mt-2 text-sm font-bold text-pink-100">{item.note}</p> : null}
        </div>
        <CountUpScore item={item} />
      </div>

      <div className="mt-6 grid gap-3 text-sm text-slate-300">
        <p className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-cyan-200" aria-hidden="true" />
          <span>{item.period}</span>
        </p>
        <p className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-pink-200" aria-hidden="true" />
          <span>{item.location}</span>
        </p>
      </div>

      <span
        className={[
          "absolute top-8 hidden h-4 w-4 rounded-full bg-cyan-200 shadow-[0_0_26px_rgba(34,211,238,0.9)] lg:block",
          isEven ? "-right-[3rem]" : "-left-[3rem]",
        ].join(" ")}
        aria-hidden="true"
      />
    </motion.article>
  );
}

export function EducationTimeline() {
  return (
    <section id="education" className="section-padding container-custom">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionHeading
          eyebrow="Education"
          title="A bright academic path with a strong technical core."
          description="From school merit ranks to IIIT Allahabad, the timeline reflects consistent academic strength and a growing engineering foundation."
        />
      </motion.div>

      <div className="relative mt-12 grid gap-5 lg:block">
        <motion.div
          className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-cyan-300 via-violet-400 to-pink-400 lg:block"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "top" }}
          aria-hidden="true"
        />

        {educationItems.map((item, index) => (
          <div
            key={`${item.institute}-${item.degree}`}
            className={[
              "relative mb-6 flex",
              index % 2 === 0 ? "lg:justify-start lg:pr-10" : "lg:justify-end lg:pl-10",
            ].join(" ")}
          >
            <TimelineCard item={item} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
