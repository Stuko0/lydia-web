import { motion } from "framer-motion";
import { Brain, Eye, Heart, Clock, Shield, Sparkles, Terminal, Globe, MessageSquare, Music, Palette, Code } from "lucide-react";

const icons = {
  Brain, Eye, Heart, Clock, Shield, Sparkles, Terminal, Globe, MessageSquare, Music, Palette, Code,
};

const colorMap = {
  love: "border-rpm-love/40 text-rpm-love shadow-rpm-love/20",
  iris: "border-rpm-iris/40 text-rpm-iris shadow-rpm-iris/20",
  pine: "border-rpm-pine/40 text-rpm-pine shadow-rpm-pine/20",
  foam: "border-rpm-foam/40 text-rpm-foam shadow-rpm-foam/20",
  rose: "border-rpm-rose/40 text-rpm-rose shadow-rpm-rose/20",
  gold: "border-rpm-gold/40 text-rpm-gold shadow-rpm-gold/20",
};

interface FeatureCardProps {
  title: string;
  description: string;
  iconName: keyof typeof icons;
  color: keyof typeof colorMap;
  index?: number;
}

export function FeatureCard({ title, description, iconName, color, index = 0 }: FeatureCardProps) {
  const Icon = icons[iconName];
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className={`group relative overflow-hidden rounded-2xl border bg-rpm-surface/60 p-6 backdrop-blur-sm transition-shadow hover:shadow-xl ${colorMap[color]}`}
    >
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-current opacity-5 blur-3xl transition-opacity group-hover:opacity-10" />
      <div className="mb-4 inline-flex rounded-xl border border-current/20 bg-rpm-base/60 p-3 transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-display text-xl text-rpm-text">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-rpm-subtle">{description}</p>
    </motion.article>
  );
}
