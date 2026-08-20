import { createStrategyConfigParser } from "@tradejs/strategy-kit/config";
import type { ValidatedStrategyRegistryEntry } from "@tradejs/strategy-kit/config";
import { config as DEFAULT_CONFIG, TrendShiftConfig } from "./config";
import { createTrendShiftCore } from "./core";
import { trendShiftManifest } from "./manifest";

export const TrendShiftStrategyDefinition: ValidatedStrategyRegistryEntry<TrendShiftConfig> =
  {
    defaults: DEFAULT_CONFIG,
    parseConfig: createStrategyConfigParser({
      strategyName: "TrendShift",
      defaults: DEFAULT_CONFIG,
      optionalScalarFields: {
        TRENDSHIFT_MIN_SIGNAL_BODY_STRENGTH_LONG: "number",
        TRENDSHIFT_MIN_SIGNAL_BODY_STRENGTH_SHORT: "number",
        TRENDSHIFT_MIN_ADX_LONG: "number",
        TRENDSHIFT_MIN_ADX_SHORT: "number",
      },
    }),
    createCore: createTrendShiftCore,
    manifest: trendShiftManifest,
  };
