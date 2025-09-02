export type AnalyticsParams = Record<string, string | number | boolean | null>;

export function logEvent(event: string, params?: AnalyticsParams) {
  // Integrate with preferred analytics SDK here
  // For now, just log to console
  // eslint-disable-next-line no-console
  console.log(`[analytics] ${event}`, params ?? {});
}

