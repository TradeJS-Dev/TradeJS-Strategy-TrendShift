# @tradejs/strategy-trend-shift

TradeJS strategy plugin providing `TrendShift`.

## Strategy overview

`TrendShift` builds a volatility-adaptive trend band from smoothed slope and
long-horizon ATR, then trades confirmed flips of that band. Signal-body and ADX
filters qualify the change, while band and ATR geometry define invalidation,
targets, and optional opposite-flip exits.

## Logic at a glance

![TrendShift strategy logic](https://raw.githubusercontent.com/TradeJS-Dev/TradeJS-Strategy-TrendShift/main/docs/strategy-logic.svg)

## Install

```bash
yarn add @tradejs/strategy-trend-shift
```

Register the package in `tradejs.config.ts`:

```ts
import { defineConfig } from "@tradejs/core/config";

export default defineConfig({
  strategies: ["@tradejs/strategy-trend-shift"],
});
```

The package exports `strategyEntries` for the TradeJS plugin loader together
with its strategy definitions, manifests, default configs, and public AI/ML
adapters. Strategy implementation changes are released from this repository,
independently of the TradeJS engine.

## Development

```bash
yarn install --immutable
yarn checks
```

Publishing is triggered by a GitHub release and delegated to the pinned
`TradeJS-Workflows@v1` reusable workflow.

Keywords: ai, claude, codex.
