// src/app/msw-init.tsx
"use client";

import { useEffect } from "react";

let started: Promise<unknown> | null = null;

function startWorker() {
  if (!started) {
    started = Promise.all([
      import("../mocks/browser"),
      import("../mocks/scenarios"),
    ]).then(([{ worker }, { scenarios }]) => {
      const name = (process.env.NEXT_PUBLIC_MOCK_SCENARIO ??
        "default") as keyof typeof scenarios;
      worker.use(...(scenarios[name] ?? []));
      return worker.start();
    });
  }
  return started;
}
export default function MSWInit({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    startWorker().then(onReady);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
