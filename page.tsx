'use client';

import { useRef, useEffect, useState } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useMotionValueEvent,
} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  GraduationCap,
} from 'lucide-react';

const socialLinks = [
  { href: '#', label: 'Instagram', Icon: Instagram },
  { href: '#', label: 'LinkedIn', Icon: Linkedin },
  { href: '#', label: 'Twitter', Icon: Twitter },
  { href: '#', label: 'YouTube', Icon: Youtube },
];

const stats = [
  { label: 'Subjects Taught', value: 120 },
  { label: 'Professors Allotted', value: 85 },
  { label: 'Total Professors', value: 200 },
  { label: 'Research Papers', value: 450 },
  { label: 'Publications', value: 310 },
  { label: 'Active Projects', value: 45 },
];

function CountUpStat({ label, value }: { label: string; value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(0);

  useMotionValueEvent(rounded, 'change', (v) => setDisplayValue(v));

  useEffect(() => {
    if (isInView) {
      animate(count, value, { duration: 2, ease: 'easeOut' });
    }
  }, [isInView, value, count]);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center text-center"
    >
      <span className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
        {displayValue}
      </span>
      <span className="text-gray-300 mt-1">{label}</span>
    </motion.div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* ——— Navbar (Sticky & Dark Glassmorphic) ——— */}
      <header
        className="fixed top-0 left-0 right-0 z-50 sticky"
        role="banner"
        aria-label="Main navigation"
      >
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="backdrop-blur-md bg-black/30 border-b border-white/10"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 sm:h-20 items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-3 cursor-pointer"
                aria-label="BVCOE Home"
              >
                <img
                  src="/images/logo.png"
                  alt="BVCOE Logo"
                  className="h-10 w-auto object-contain"
                  width={40}
                  height={40}
                />
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  BVCOE
                </span>
              </Link>
              <div className="text-right">
                <span className="text-sm sm:text-base font-medium text-gray-300">
                  Research Management System
                </span>
              </div>
            </div>
          </div>
        </motion.nav>
      </header>

      {/* ——— Hero Section (Full Screen) ——— */}
      <main className="relative min-h-screen" role="main">
        <section
          className="relative h-screen w-full overflow-hidden"
          aria-label="Hero section with search"
        >
          <div className="absolute inset-0">
            <Image
              src="/bvcoe1.jpeg"
              alt="BVCOE Campus"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div
              className="absolute inset-0 bg-black/70"
              aria-hidden
            />
          </div>

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="w-full max-w-2xl"
            >
              <label htmlFor="hero-search" className="sr-only">
                Search professors, publications, research projects
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
                  <Search
                    className="h-5 w-5 text-slate-400"
                    aria-hidden
                  />
                </div>
                <input
                  id="hero-search"
                  type="search"
                  placeholder="Search professors, publications, research projects..."
                  className="block w-full rounded-full border border-white/10 bg-zinc-800 py-4 pl-12 pr-6 text-white placeholder:text-slate-400 shadow-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-transparent focus:outline-none"
                  aria-label="Search professors, publications, research projects"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ——— Statistics Section (Scroll Triggered Count-Up) ——— */}
        <section
          className="relative z-10 border-t border-white/10 bg-zinc-900/95 backdrop-blur-sm py-16 px-4"
          aria-label="Research statistics"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-10">
              {stats.map(({ label, value }) => (
                <CountUpStat key={label} label={label} value={value} />
              ))}
            </div>
          </div>
        </section>

        {/* ——— Footer ——— */}
        <footer
          className="relative z-10 bg-black border-t border-white/10 py-12 px-4"
          role="contentinfo"
          aria-label="Site footer"
        >
          <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 cursor-pointer"
              aria-label="BVCOE Home"
            >
              <GraduationCap className="h-6 w-6 text-blue-400" aria-hidden />
              <span className="font-semibold text-white">BVCOE</span>
            </Link>
            <p className="text-slate-400 text-sm text-center sm:text-left">
              Bharati Vidyapeeth College of Engineering · Research Management System
            </p>
          </div>
          <p className="mx-auto max-w-7xl mt-6 pt-6 border-t border-white/10 text-slate-500 text-xs text-center">
            © {new Date().getFullYear()} BVCOE. All rights reserved.
          </p>
        </footer>
      </main>

      {/* ——— Social Sidebar (Floating, Dark) ——— */}
      <aside
        className="fixed right-4 top-1/2 z-40 -translate-y-1/2 hidden sm:flex flex-col gap-4"
        aria-label="Social links"
      >
        {socialLinks.map(({ href, label, Icon }, i) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.4 + i * 0.08,
              ease: 'easeOut',
            }}
            whileHover={{
              scale: 1.12,
              boxShadow: '0 0 20px rgba(96, 165, 250, 0.4)',
            }}
            whileTap={{ scale: 0.95 }}
            className="flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md bg-black/30 border border-white/10 text-white shadow-md hover:bg-white/10 hover:text-blue-400 hover:border-blue-400/30 transition-colors"
          >
            <Icon className="h-5 w-5" aria-hidden />
          </motion.a>
        ))}
      </aside>
    </div>
  );
}
