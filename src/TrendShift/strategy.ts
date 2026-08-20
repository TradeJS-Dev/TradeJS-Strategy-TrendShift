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
    }),
    createCore: createTrendShiftCore,
    manifest: trendShiftManifest,
  };
