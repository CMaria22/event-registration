"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
//we don't want to import the worker on the server, so we use dynamic import with ssr: false
const MSWInit = dynamic(() => import("./msw-init"), { ssr: false });

const mockingEnabled =
  process.env.NODE_ENV === "development" &&
  process.env.NEXT_PUBLIC_API_MOCKING !== "disabled";
export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(!mockingEnabled);

  return (
    <>
      {mockingEnabled && <MSWInit onReady={() => setReady(true)} />}
      {ready ? children : null}
    </>
  );
}
