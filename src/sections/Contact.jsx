import { useState } from "react";
import { supabase } from "../lib/supabase";
import Reveal from "../components/Reveal";
import MicroLabel from "../components/MicroLabel";

const MAX_MESSAGE = 2000;
const MAX_SUBJECT = 100;
const MAX_NAME = 50;
const MIN_NAME = 2;
const MIN_SUBJECT = 5;
const MIN_MESSAGE = 10;

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Contact({ active }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [formError, setFormError] = useState("");

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required.";
        if (value.trim().length < MIN_NAME) return `Name must be at least ${MIN_NAME} characters.`;
        if (value.trim().length > MAX_NAME) return `Name must be under ${MAX_NAME} characters.`;
        return "";
      case "email":
        if (!value.trim()) return "Email is required.";
        if (!validateEmail(value.trim())) return "Please enter a valid email address.";
        return "";
      case "subject":
        if (!value.trim()) return "Subject is required.";
        if (value.trim().length < MIN_SUBJECT) return `Subject must be at least ${MIN_SUBJECT} characters.`;
        if (value.trim().length > MAX_SUBJECT) return `Subject must be under ${MAX_SUBJECT} characters.`;
        return "";
      case "message":
        if (!value.trim()) return "Message is required.";
        if (value.trim().length < MIN_MESSAGE) return `Message must be at least ${MIN_MESSAGE} characters.`;
        if (value.trim().length > MAX_MESSAGE) return `Message must be under ${MAX_MESSAGE} characters.`;
        return "";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    setTouched({ name: true, email: true, subject: true, message: true });
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!validateForm()) return;

    setStatus("sending");
    setErrors({});

    const trimmed = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    };

    try {
      const { error: dbError } = await supabase
        .from("contact_messages")
        .insert([trimmed]);

      if (dbError) {
        console.error("[Contact] Failed to save message", dbError);
        setFormError("Could not save message. Please try again.");
        setStatus("error");
        return;
      }

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, "");
      const res = await fetch(`${supabaseUrl}/functions/v1/send-contact-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(trimmed),
      });

      const result = await res.json();

      if (!res.ok || result.error) {
        console.error("[Contact] Edge Function error", result);
        setFormError(result.error || "Failed to send email notification.");
        setStatus("error");
        return;
      }

      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTouched({});
      setFormError("");
    } catch (err) {
      console.error("[Contact] Unexpected error", err);
      setFormError("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  const inputClass = (field) =>
    `w-full bg-transparent border-b-2 py-4 focus:border-secondary hover:border-secondary outline-none transition-colors text-xl font-display text-primary placeholder:text-on-surface-variant/80 ${
      touched[field] && errors[field] ? "border-error" : "border-outline-variant"
    }`;

  const labelClass = "text-[10px] font-bold tracking-widest text-on-surface-variant/80 uppercase";

  return (
    <section
      id="contact"
      aria-label="Contact"
      className={`section-spread snap-center-force bg-surface-dim ${
        active ? "active" : ""
      }`}
    >
      <Reveal className="max-w-4xl w-full px-6 md:px-16 lg:px-24">
        <MicroLabel className="mb-6 block">04 / INITIATE CONNECTION</MicroLabel>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-10 leading-none text-primary">
          Let's define the future.
        </h2>

        {status === "sent" ? (
          <p role="status" aria-live="polite" className="text-xl font-display text-secondary">
            Thank you — your proposal is on its way. We will be in touch shortly.
          </p>
        ) : status === "error" ? (
          <p role="alert" className="text-error text-sm mb-6">
            {formError || "Something went wrong. Please try again."}
          </p>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label htmlFor="name" className={labelClass}>
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={touched.name && Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={inputClass("name")}
                  placeholder="Alexander Morgan"
                  type="text"
                  autoComplete="name"
                  maxLength={MAX_NAME + 10}
                />
                {touched.name && errors.name && (
                  <p id="name-error" className="text-error text-xs mt-1" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="relative">
                <label htmlFor="email" className={labelClass}>
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={touched.email && Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={inputClass("email")}
                  placeholder="alex@studio.com"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                />
                {touched.email && errors.email && (
                  <p id="email-error" className="text-error text-xs mt-1" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>
            <div className="relative">
              <label htmlFor="subject" className={labelClass}>
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={touched.subject && Boolean(errors.subject)}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                className={inputClass("subject")}
                  placeholder="Project collaboration"
                  type="text"
                  autoComplete="subject"
                  maxLength={MAX_SUBJECT + 10}
              />
              {touched.subject && errors.subject && (
                <p id="subject-error" className="text-error text-xs mt-1" role="alert">
                  {errors.subject}
                </p>
              )}
            </div>
            <div className="relative">
              <label htmlFor="message" className={labelClass}>
                Your Inquiry
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={touched.message && Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : `message-count${status === "sending" ? "" : ""}`}
                className={inputClass("message")}
                  placeholder="How can we collaborate?"
                  rows={3}
                  autoComplete="off"
                  maxLength={MAX_MESSAGE + 10}
              />
              <div className="flex justify-between items-center mt-1">
                {touched.message && errors.message ? (
                  <p id="message-error" className="text-error text-xs" role="alert">
                    {errors.message}
                  </p>
                ) : (
                  <span />
                )}
                <span id="message-count" className="text-[10px] text-on-surface-variant tabular-nums">
                  {form.message.length}/{MAX_MESSAGE}
                </span>
              </div>
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="group flex items-center gap-4 text-xl font-display font-bold text-primary hover:text-secondary transition-colors disabled:opacity-50"
            >
              {status === "sending" ? (
                <>
                  <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  SENDING…
                </>
              ) : (
                <>
                  SEND PROPOSAL
                  <span className="material-symbols-outlined text-2xl group-hover:translate-x-4 transition-transform">
                    arrow_forward
                  </span>
                </>
              )}
            </button>
          </form>
        )}

        <footer className="mt-12 pt-6 border-t border-outline-variant flex flex-col md:flex-row justify-between text-[10px] font-bold tracking-widest text-on-surface-variant/80">
          <p>© 2024 NESHAN NIROULA</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a className="hover:text-secondary transition-colors" href="#">
              LINKEDIN
            </a>
            <a className="hover:text-secondary transition-colors" href="#">
              DRIBBBLE
            </a>
            <a className="hover:text-secondary transition-colors" href="#">
              INSTAGRAM
            </a>
          </div>
        </footer>
      </Reveal>
    </section>
  );
}
