"use client";
import { motion } from "framer-motion";
import {
  Facebook,
  Globe,
  Instagram,
  Mail,
  Phone
} from "lucide-react";
import Link from "next/link";

const nav = [
  { label: "Home", href: "/" },
  { label: "Tours", href: "/tours" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="mt-12 border-t bg-gray-200 backdrop-blur-sm"
      aria-labelledby="footer-heading"
    >
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand + short */}
          <div className="flex-1 min-w-0">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-gradient-to-r from-light-blue-100 to-light-blue-200 flex items-center justify-center text-purple-700 font-bold">
                DT
              </div>
              <span className="text-lg font-semibold">Devnagri Tourism</span>
            </Link>

            <p className="mt-3 text-sm text-gray-600 max-w-md">
              Curated journeys across Uttarakhand — spiritual, adventurous and
              nature-led experiences crafted by local experts.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <motion.a
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.98 }}
                href="mailto:devnagritourandtravel@gmail.com"
                aria-label="Email Devnagri Tourism"
                className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm bg-white hover:shadow-sm"
              >
                <Mail className="w-4 h-4" />
                <span className="text-xs">devnagritourandtravel@gmail.com</span>
              </motion.a>
            </div>
          </div>

          {/* Navigation */}
          <nav
            aria-label="Footer navigation"
            className="flex-1 min-w-0 md:max-w-xs"
          >
            <h3 id="footer-heading" className="sr-only">
              Footer
            </h3>

            <ul className="flex flex-wrap gap-2">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="inline-flex items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social & CTA */}
          <div className="flex-1 min-w-0 md:flex md:items-end md:justify-end">
            <div className="flex flex-col items-start gap-4 md:items-end">
              <div className="flex items-center gap-3">
                <motion.a
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.97 }}
                  href="https://www.instagram.com/devnagaritours"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-2 rounded-md hover:bg-gray-50"
                >
                  <Instagram className="w-5 h-5 text-gray-700" />
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.97 }}
                  href="https://m.facebook.com/devnagari.tour.travels/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="p-2 rounded-md hover:bg-gray-50"
                >
                  <Facebook className="w-5 h-5 text-gray-700" />
                </motion.a>

                {/* calling */}
                <motion.a
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.97 }}
                  href="tel:9456193464"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="p-2 rounded-md hover:bg-gray-50"
                >
                  <Phone className="w-5 h-5 text-gray-700" />
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.97 }}
                  href="/"
                  aria-label="Website"
                  className="p-2 rounded-md hover:bg-gray-50"
                >
                  <Globe className="w-5 h-5 text-gray-700" />
                </motion.a>
              </div>

              <div className="text-xs text-gray-500">
                <span className="block">
                  <strong>Support:</strong>{" "}
                  <a
                    href="/contact"
                    className="text-gray-700 underline underline-offset-2"
                  >
                    Contact Us
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 border-t pt-6">
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
            <p className="text-xs text-gray-500">
              © {year} Devnagri Tourism. All rights reserved.
            </p>

            <div className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
