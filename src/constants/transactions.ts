export const DEFAULT_SLIPPAGE = 5
export const DEFAULT_TX_DEADLINE = 24 //24mins

export const ESTIMATE_GAS_FEE = 0.01 // Estimate gas native token fee
export const LIQUIDITY_PROVIDER_FEE_INIT = 0.0025
export const DEFAULT_DIV = 1000000

export const VALUE_PERCENTAGES = [
  {
    label: "25%",
    value: 25,
  },
  {
    label: "50%",
    value: 50,
  },
  {
    label: "75%",
    value: 75,
  },
  {
    label: "MAX",
    value: 100,
  },
] as const
