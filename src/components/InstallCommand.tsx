import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Check, Copy, Terminal, ExternalLink, Clock } from "lucide-react";

const WIN_EXE_URL = "https://github.com/Stuko0/lydia-agent/releases/download/v0.17.0/Lydia-0.17.0-Setup.exe";

export function InstallCommand() {
  const [tab, setTab] = useState<"windows" | "macos" | "linux">("windows");
  const [copied, setCopied] = useState(false);

  const commands: Record<string, string> = {
    macos: "curl -fsSL https://lydia-agent.stuko.dev/install.sh | bash",
    linux: "curl -fsSL https://lydia-agent.stuko.dev/install.sh | bash",
    windows: "",
  };

  const copy = async () => {
    if (!commands[tab]) return;
    await navigator.clipboard.writeText(commands[tab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-rpm-highlight-med/40 bg-rpm-surface/80 shadow-2xl">
      <div className="flex items-center justify-between border-b border-rpm-highlight-low/60 px-4 py-3">
        <div className="flex items-center gap-2 text-rpm-subtle">
          <Terminal className="h-4 w-4" />
          <span className="text-xs font-medium uppercase tracking-wider">Download</span>
        </div>
        <div className="flex gap-1.5">
          {(["windows", "macos", "linux"] as const).map((tName) => {
            const isSoon = tName !== "windows";
            return (
              <button
                key={tName}
                onClick={() => setTab(tName)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition ${tab === tName ? "bg-rpm-iris/20 text-rpm-iris" : "text-rpm-muted hover:text-rpm-text"}`}
              >
                {tName === "windows" ? "Windows" : tName === "macos" ? "macOS" : "Linux"}
                {isSoon && <span className="ml-1 opacity-50">⌛</span>}
              </button>
            );
          })}
        </div>
      </div>
      <div className="relative flex min-h-[6rem] items-center justify-between gap-4 px-5 py-4 font-mono text-sm text-rpm-text">
        <AnimatePresence mode="wait">
          {tab === "windows" ? (
            <motion.div
              key="windows"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
              className="flex w-full flex-col gap-3"
            >
              <p className="text-xs text-rpm-subtle font-sans">Download the Windows installer:</p>
              <a
                href={WIN_EXE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-fit items-center gap-2 rounded-xl border border-rpm-iris/40 bg-rpm-iris/10 px-5 py-3 text-sm font-medium text-rpm-iris transition hover:bg-rpm-iris/20 hover:shadow-lg"
              >
                <Download className="h-4 w-4 transition group-hover:-translate-y-0.5" />
                Lydia-0.17.0-Setup.exe
                <ExternalLink className="h-3.5 w-3.5 opacity-60" />
              </a>
            </motion.div>
          ) : (
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
              className="flex w-full items-center gap-4"
            >
              <div className="flex items-center gap-3 text-rpm-muted">
                <Clock className="h-5 w-5" />
                <span className="font-sans text-sm">
                  <span className="text-rpm-subtle">Coming soon</span>
                  <span className="mx-2 opacity-30">—</span>
                  <span className="text-xs italic text-rpm-muted">
                    The installer for {tab === "macos" ? "macOS" : "Linux"} will be available soon
                  </span>
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
