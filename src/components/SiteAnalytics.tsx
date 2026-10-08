"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";

/**
 * Vercel Web Analytics, minus our own visits.
 *
 * Brian and his wife open the site as https://brianyoung.dev/?notrack=1.
 * That URL turns tracking off for the visit, and also saves a flag in this
 * browser so later visits from the same browser are skipped too, even
 * without the parameter. ?notrack=0 removes the flag (handy for testing).
 *
 * The flag is per browser and per device, and clearing site data removes it.
 * Visitors without the flag are counted as normal.
 */
const OPT_OUT_KEY = "by-notrack";

function isOptedOut(): boolean {
  if (typeof window === "undefined") return false;

  const param = new URLSearchParams(window.location.search).get("notrack");

  try {
    if (param === "1") window.localStorage.setItem(OPT_OUT_KEY, "1");
    if (param === "0") window.localStorage.removeItem(OPT_OUT_KEY);
    if (param === "1") return true;
    return window.localStorage.getItem(OPT_OUT_KEY) === "1";
  } catch {
    // Storage blocked (private mode, strict settings): honor the URL alone.
    return param === "1";
  }
}

function beforeSend(event: BeforeSendEvent): BeforeSendEvent | null {
  return isOptedOut() ? null : event;
}

export function SiteAnalytics() {
  return <Analytics beforeSend={beforeSend} />;
}
