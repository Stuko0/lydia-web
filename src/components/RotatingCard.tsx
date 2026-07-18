"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Zap, Globe, Shield, Sparkles, Clock } from "lucide-react";

const slides = [
  { key: "memory", Icon: Brain, suit: "♠", color: "suit-spade" },
  { key: "automation", Icon: Zap, suit: "♥", color: "suit-heart" },
  { key: "browse", Icon: Globe, suit: "♦", color: "suit-diamond" },
  { key: "sandbox", Icon: Shield, suit: "♣", color: "suit-club" },
  { key: "creative", Icon: Sparkles, suit: "♠", color: "suit-spade" },
  { key: "schedule", Icon: Clock, suit: "♥", color: "suit-heart" },
];

interface RotatingCardProps {
  slidesText: { title: string; desc: string }[];
}

export function RotatingCard({ slidesText }: RotatingCardProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4000);
    return () => clearInterval(id);
  }, []);

  const slide = slides[index];
  const Icon = slide.Icon;
  const text = slidesText[index];

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-rpm-iris/20 to-rpm-love/20 blur-2xl" />
      <div className={`card-alice card-tilt-right overflow-hidden ${slide.color}`}>
        <span className={`suit-watermark ${slide.color}`}>{slide.suit}</span>
        <span className={`suit-corner suit-corner-tl ${slide.color}`}>{slide.suit}</span>
        <span className={`suit-corner suit-corner-br ${slide.color}`}>{slide.suit}</span>

        <div className="p-8 pt-14">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-widest text-rpm-muted">Feature Preview</span>
            <div className="flex gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-rpm-iris" : "w-1.5 bg-rpm-highlight-med"}`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -30, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border-2 ${slide.color} ${slide.color.replace('suit', 'border-suit')} bg-rpm-base/60`}>
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="font-display text-2xl text-rpm-text">{text.title}</h3>
              <p className="text-sm text-rpm-subtle">{text.desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
