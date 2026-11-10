// src/app/msw-init.tsx
"use client";

import { useEffect } from "react";

let started: Promise<unknown> | null = null;

function startWorker() {
  if (!started) {
    started = import("../mocks/browser").then(({ worker }) =>
      worker.start(),
    );
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
