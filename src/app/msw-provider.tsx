"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
//we don't want to import the worker on the server, so we use dynamic import with ssr: false
const MSWInit = dynamic(() => import("./msw-init"), { ssr: false });

const isDev = process.env.NODE_ENV === "development";

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(!isDev);

  return (
    <>
      {isDev && <MSWInit onReady={() => setReady(true)} />}
      {ready ? children : null}
    </>
  );
}
