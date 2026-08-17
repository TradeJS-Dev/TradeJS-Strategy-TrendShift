import { defineStrategyPlugin } from "@tradejs/core/config";
import type { StrategyConfig, StrategyRegistryEntry } from "@tradejs/types";
import { config as trendShiftDefaultConfig } from "./TrendShift/config";
import { TrendShiftStrategyDefinition } from "./TrendShift/strategy";

export const strategyEntries: StrategyRegistryEntry[] = [
  TrendShiftStrategyDefinition,
];

const defaultConfigs: Record<string, StrategyConfig> = {
  TrendShift: trendShiftDefaultConfig,
};

export const getBuiltInStrategyDefaultConfig = (
  strategyName: string,
): StrategyConfig | undefined => defaultConfigs[strategyName];

export { TrendShiftStrategyDefinition } from "./TrendShift/strategy";
export { trendShiftDefaultConfig };
export { trendShiftManifest } from "./TrendShift/manifest";
export { trendShiftAiAdapter } from "./TrendShift/adapters/ai";

export default defineStrategyPlugin({ strategyEntries });
