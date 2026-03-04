"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { FaDocker, FaPython, FaReact } from "react-icons/fa";
import {
  SiApachekafka,
  SiCplusplus,
  SiMongodb,
  SiNextdotjs,
  SiRedis,
  SiTypescript,
} from "react-icons/si";
import { cn } from "@/lib/utils";

export type TechOrbitItem = {
  name: string;
  icon: IconType;
  colorClass: string;
};

type TechOrbitProps = {
  items?: TechOrbitItem[];
  children: ReactNode;
  className?: string;
};

export const defaultTechOrbitItems: TechOrbitItem[] = [
  { name: "React", icon: FaReact, colorClass: "text-cyan-200" },
  { name: "Next.js", icon: SiNextdotjs, colorClass: "text-white" },
  { name: "TypeScript", icon: SiTypescript, colorClass: "text-blue-300" },
  { name: "Python", icon: FaPython, colorClass: "text-yellow-200" },
  { name: "C++", icon: SiCplusplus, colorClass: "text-violet-200" },
  { name: "Docker", icon: FaDocker, colorClass: "text-sky-200" },
  { name: "Redis", icon: SiRedis, colorClass: "text-rose-200" },
  { name: "Kafka", icon: SiApachekafka, colorClass: "text-slate-100" },
  { name: "MongoDB", icon: SiMongodb, colorClass: "text-emerald-300" },
];

const mobilePositions = [
  "left-[6%] top-[8%]",
  "left-[28%] top-[0%]",
  "right-[24%] top-[6%]",
  "right-[4%] top-[22%]",
  "left-[3%] top-[42%]",
  "right-[2%] top-[52%]",
  "left-[16%] bottom-[5%]",
  "left-[48%] bottom-[0%]",
  "right-[14%] bottom-[9%]",
];

function OrbitIcon({ item, className }: { item: TechOrbitItem; className?: string }) {
  return (
    <motion.div
      className={cn(
        "group flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-slate-950/80 shadow-[0_0_22px_rgba(34,211,238,0.12)] backdrop-blur transition hover:z-20",
        className,
      )}
      whileHover={{ scale: 1.14 }}
      title={item.name}
      aria-label={item.name}
    >
      <item.icon
        className={cn("h-6 w-6 transition group-hover:drop-shadow-[0_0_10px_currentColor]", item.colorClass)}
        aria-hidden="true"
      />
    </motion.div>
  );
}

function OrbitRing({
  items,
  radius,
  duration,
  reverse,
}: {
  items: TechOrbitItem[];
  radius: number;
  duration: number;
  reverse?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="absolute inset-0 hidden sm:block"
      animate={shouldReduceMotion ? undefined : { rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute inset-1/2 h-0 w-0">
        {items.map((item, index) => {
          const angle = (index / items.length) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <div
              key={item.name}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              <motion.div
                animate={shouldReduceMotion ? undefined : { rotate: reverse ? 360 : -360 }}
                transition={{ duration, repeat: Infinity, ease: "linear" }}
              >
                <OrbitIcon item={item} />
              </motion.div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export function TechOrbit({ items = defaultTechOrbitItems, children, className }: TechOrbitProps) {
  const shouldReduceMotion = useReducedMotion();
  const outerItems = items.filter((_, index) => index % 2 === 0);
  const innerItems = items.filter((_, index) => index % 2 === 1);

  return (
    <div className={cn("relative mx-auto aspect-square w-full max-w-[28rem]", className)}>
      <div className="absolute inset-[3%] hidden rounded-full border border-cyan-300/15 sm:block" />
      <div className="absolute inset-[17%] hidden rounded-full border border-fuchsia-300/15 sm:block" />

      <OrbitRing items={outerItems} radius={202} duration={34} />
      <OrbitRing items={innerItems} radius={148} duration={24} reverse />

      <div className="absolute inset-0 sm:hidden">
        {items.map((item, index) => (
          <motion.div
            key={item.name}
            className={cn("absolute", mobilePositions[index % mobilePositions.length])}
            animate={shouldReduceMotion ? undefined : { y: [0, -7, 0], rotate: [-3, 3, -3] }}
            transition={{ duration: 2.2 + index * 0.14, repeat: Infinity, ease: "easeInOut" }}
          >
            <OrbitIcon item={item} className="h-10 w-10 rounded-lg" />
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-[16%] sm:inset-[18%]">{children}</div>
    </div>
  );
}
