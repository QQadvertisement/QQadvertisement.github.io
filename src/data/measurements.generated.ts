/**
 * GENERATED — do not edit by hand.
 * Written by scripts/measure-builds.mjs on 2026-08-20.
 *
 * These are the only numbers on a demo page permitted to appear in
 * monospace, because these are the only ones actually measured.
 */

export interface FileMeasurement {
  id: string;
  bytes: number;
  gzipBytes: number;
  /** bytes of separately-fetched local assets */
  assetBytes: number;
  /** document + everything it pulls — the build's real cost */
  totalBytes: number;
  requests: number;
  inlineSvgCount: number;
  rasterCount: number;
  scriptCount: number;
  styleCount: number;
  usesMraidOpen: boolean;
  hasWebviewFallback: boolean;
}

export const measuredAt = "2026-08-20";

export const measurements: Record<string, FileMeasurement> = {
  "atta": {
    "id": "atta",
    "bytes": 26122,
    "gzipBytes": 8308,
    "assetBytes": 0,
    "totalBytes": 26122,
    "requests": 1,
    "inlineSvgCount": 10,
    "rasterCount": 0,
    "scriptCount": 1,
    "styleCount": 1,
    "usesMraidOpen": true,
    "hasWebviewFallback": true
  },
  "knead": {
    "id": "knead",
    "bytes": 19692,
    "gzipBytes": 6698,
    "assetBytes": 2023811,
    "totalBytes": 2043503,
    "requests": 4,
    "inlineSvgCount": 2,
    "rasterCount": 0,
    "scriptCount": 2,
    "styleCount": 2,
    "usesMraidOpen": false,
    "hasWebviewFallback": false
  }
};
