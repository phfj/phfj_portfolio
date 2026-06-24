"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(100);
        return;
      }
      setProgress(
        Math.min(100, Math.round((window.scrollY / docHeight) * 100)),
      );
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-[57px] right-0 left-0 z-40 h-[3px]">
      <div
        className="h-full bg-[var(--accent)] transition-[width] duration-100 ease-linear motion-reduce:transition-none"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
