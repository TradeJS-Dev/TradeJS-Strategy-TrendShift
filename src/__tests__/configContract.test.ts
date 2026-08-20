import { readFileSync } from "node:fs";
import path from "node:path";
import { strategyEntries } from "../index";

describe("strategy config contract", () => {
  it.each(strategyEntries)(
    "materializes defaults and rejects unknown fields for $manifest.name",
    (entry) => {
      expect(entry.parseConfig({})).toEqual(entry.defaults);
      expect(() =>
        entry.parseConfig({ UNKNOWN_STRATEGY_CONFIG_FIELD: true }),
      ).toThrow(
        `${entry.manifest.name}.UNKNOWN_STRATEGY_CONFIG_FIELD is not allowed`,
      );
    },
  );

  it.each(strategyEntries)(
    "rejects invalid scalar types for $manifest.name",
    (entry) => {
      const numericField = Object.entries(entry.defaults).find(
        ([, value]) => typeof value === "number",
      );
      expect(numericField).toBeDefined();
      const [key] = numericField!;

      expect(() => entry.parseConfig({ [key]: "invalid" })).toThrow(
        `${entry.manifest.name}.${key} must be a finite number`,
      );
    },
  );

  it("accepts and materializes declared TrendShift directional overrides", () => {
    const [entry] = strategyEntries;
    expect(
      entry.parseConfig({
        TRENDSHIFT_MIN_ADX_SHORT: 40,
        TRENDSHIFT_MIN_SIGNAL_BODY_STRENGTH_SHORT: 0.9,
      }),
    ).toMatchObject({
      TRENDSHIFT_MIN_ADX: 25,
      TRENDSHIFT_MIN_ADX_SHORT: 40,
      TRENDSHIFT_MIN_SIGNAL_BODY_STRENGTH: 0.7,
      TRENDSHIFT_MIN_SIGNAL_BODY_STRENGTH_SHORT: 0.9,
    });
  });
});

describe("package dependency contract", () => {
  it("uses the Project host for every TradeJS runtime dependency", () => {
    const manifest = JSON.parse(
      readFileSync(path.join(process.cwd(), "package.json"), "utf8"),
    ) as {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
      peerDependencies?: Record<string, string>;
    };
    const runtimeDependencies = Object.keys(manifest.dependencies ?? {}).filter(
      (name) => name.startsWith("@tradejs/"),
    );
    const developmentRuntimePackages = Object.keys(
      manifest.devDependencies ?? {},
    ).filter((name) => name.startsWith("@tradejs/"));

    expect(runtimeDependencies).toEqual([]);
    expect(
      developmentRuntimePackages.every((name) =>
        Object.hasOwn(manifest.peerDependencies ?? {}, name),
      ),
    ).toBe(true);
  });
});
