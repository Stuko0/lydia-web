import { motion } from "framer-motion";
import { Brain, Eye, Heart, Clock, Shield, Sparkles, Terminal, Globe, MessageSquare, Music, Palette, Code } from "lucide-react";

const icons: Record<string, any> = {
  Brain, Eye, Heart, Clock, Shield, Sparkles, Terminal, Globe, MessageSquare, Music, Palette, Code,
};

const suits = ["♠", "♥", "♦", "♣"];
const suitColors = ["suit-spade", "suit-heart", "suit-diamond", "suit-club"];
const suitBorders = ["border-suit-spade", "border-suit-heart", "border-suit-diamond", "border-suit-club"];
const suitBgs = ["bg-suit-spade", "bg-suit-heart", "bg-suit-diamond", "bg-suit-club"];

interface FeatureCardProps {
  title: string;
  description: string;
  iconName: string;
  color?: string;
  index?: number;
}

export function FeatureCard({ title, description, iconName, index = 0 }: FeatureCardProps) {
  const Icon = icons[iconName] || Brain;
  const i = index % 4;
  const suit = suits[i];
  const colorCls = suitColors[i];
  const borderCls = suitBorders[i];
  const bgCls = suitBgs[i];
  const tilt = index % 2 === 0 ? "rotate(-0.8deg)" : "rotate(0.8deg)";

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, rotate: "0deg", transition: { duration: 0.25 } }}
      className={`card-alice ${borderCls} ${bgCls}`}
      style={{ transform: tilt }}
    >
      <span className={`suit-watermark ${colorCls}`}>{suit}</span>
      <span className={`suit-corner suit-corner-tl ${colorCls}`}>{suit}</span>
      <span className={`suit-corner suit-corner-br ${colorCls}`}>{suit}</span>
      <div className="p-6 pt-12">
        <div className={`mb-4 inline-flex rounded-xl border-2 ${borderCls} bg-rpm-base/60 p-3 ${colorCls}`}>
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="font-display text-xl text-rpm-text">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-rpm-subtle">{description}</p>
      </div>
    </motion.article>
  );
}
