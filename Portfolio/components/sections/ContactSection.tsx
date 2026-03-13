"use client";

import { motion } from "framer-motion";
import { Copy, Mail, Send } from "lucide-react";
import type { ReactNode } from "react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const email = "dsuvanwita@gmail.com";

const socialButtons = [
  { label: "GitHub", href: "https://github.com", icon: FaGithub },
  { label: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedin },
  { label: "Email", href: `mailto:${email}`, icon: Mail },
];

type FormState = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  name: "",
  email: "",
  message: "",
};

function validateForm(form: FormState) {
  const errors: FormErrors = {};

  if (!form.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
    errors.email = "Enter a valid email.";
  }

  if (form.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }

  return errors;
}

function MagneticButton({
  children,
  className,
  href,
  target,
  rel,
  ...props
}: {
  children: ReactNode;
  className?: string;
  href: string;
  target?: string;
  rel?: string;
}) {
  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      whileHover={{ scale: 1.06, y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 18 }}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-black text-white transition hover:border-cyan-300/60 hover:bg-cyan-300/10",
        className,
      )}
      {...props}
    >
      {children}
    </motion.a>
  );
}

export function ContactSection() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    toast.success("Message prepared! Connect via email for now.");
    setForm(initialForm);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      toast.success("Email copied to clipboard.");
    } catch {
      toast.error("Could not copy email.");
    }
  };

  return (
    <section id="contact" className="section-padding container-custom relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute left-0 top-16 h-24 w-full rounded-[50%] border-t border-cyan-300/20"
          animate={{ y: [0, 18, 0], opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-0 h-24 w-full rounded-[50%] border-t border-pink-300/20"
          animate={{ y: [0, -16, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something together."
          description="Send a frontend-only message draft, copy the email, or jump to a social profile."
        />
      </motion.div>

      <div className="relative mt-10 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <motion.form
          onSubmit={handleSubmit}
          className="glass-card neon-border rounded-2xl p-5 sm:p-6"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          noValidate
        >
          <div className="grid gap-4">
            {[
              { id: "name", label: "Name", type: "text" },
              { id: "email", label: "Email", type: "email" },
            ].map((field) => (
              <label key={field.id} className="grid gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
                  {field.label}
                </span>
                <input
                  value={form[field.id as keyof FormState]}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, [field.id]: event.target.value }))
                  }
                  type={field.type}
                  className={cn(
                    "min-h-12 rounded-lg border bg-white/[0.04] px-4 text-sm font-semibold text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70",
                    errors[field.id as keyof FormState] ? "border-pink-300/60" : "border-white/10",
                  )}
                  aria-invalid={Boolean(errors[field.id as keyof FormState])}
                />
                {errors[field.id as keyof FormState] ? (
                  <span className="text-xs font-semibold text-pink-200">
                    {errors[field.id as keyof FormState]}
                  </span>
                ) : null}
              </label>
            ))}

            <label className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">Message</span>
              <textarea
                value={form.message}
                onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                rows={6}
                className={cn(
                  "rounded-lg border bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70",
                  errors.message ? "border-pink-300/60" : "border-white/10",
                )}
                aria-invalid={Boolean(errors.message)}
              />
              {errors.message ? <span className="text-xs font-semibold text-pink-200">{errors.message}</span> : null}
            </label>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[image:var(--gradient-neon)] px-5 py-2.5 text-sm font-black text-white shadow-neon transition hover:brightness-110"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            Prepare Message
          </motion.button>
        </motion.form>

        <motion.aside
          className="glass-card relative overflow-hidden rounded-2xl p-5 sm:p-6"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="mx-auto flex h-32 w-32 items-center justify-center rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10"
            animate={{ y: [0, -10, 0], rotate: [-3, 4, -3] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Send className="h-12 w-12 text-cyan-100" aria-hidden="true" />
          </motion.div>

          <div className="mt-7 text-center">
            <p className="text-sm font-bold text-slate-300">Best way to reach me</p>
            <p className="mt-2 text-xl font-black text-white">{email}</p>
          </div>

          <motion.button
            type="button"
            onClick={copyEmail}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-black text-white transition hover:border-cyan-300/60 hover:bg-cyan-300/10"
          >
            <Copy className="h-4 w-4" aria-hidden="true" />
            Copy Email
          </motion.button>

          <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {socialButtons.map((item) => (
              <MagneticButton key={item.label} href={item.href} target={item.label === "Email" ? undefined : "_blank"} rel="noreferrer">
                <item.icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </MagneticButton>
            ))}
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
