"use client";

import { motion } from "framer-motion";
import { WhatsAppIcon } from "@/components/social-icons";
import { SITE } from "@/lib/constants";

export function WhatsAppBubble() {
  return (
    <motion.a
      href={SITE.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-cta-gradient text-white shadow-lg shadow-brand-magenta/30 transition-transform duration-300 hover:scale-110"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.7, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <span
        className="absolute inset-0 -z-10 animate-ping rounded-full bg-brand-magenta/40"
        aria-hidden="true"
      />
      <WhatsAppIcon className="h-7 w-7" />
    </motion.a>
  );
}