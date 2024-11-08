# Chain configs

1. ONUS Testnet

```typescript
export const onusTestnet: Chain = {
  id: 1945,
  name: "ONUS Chain Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "ONUS",
    symbol: "ONUS",
  },
  network: "onus",
  rpcUrls: {
    default: {
      http: ["https://rpc-test.onuschain.io/"],
    },
    public: {
      http: ["https://rpc-test.onuschain.io/"],
    },
  },
  blockExplorers: {
    default: {
      url: "https://explorer-testnet.onuschain.io/",
      name: "ONUS Chain Testnet Explorer",
    },
  },
  testnet: true,
}
```

2. ONUS Mainnet

```typescript
export const onus: Chain = {
  id: 1975,
  name: "ONUS Chain Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "ONUS",
    symbol: "ONUS",
  },
  network: "onus-testnet",
  rpcUrls: {
    default: {
      http: ["https://rpc.onuschain.io/"],
    },
    public: {
      http: ["https://rpc.onuschain.io/"],
    },
  },
  blockExplorers: {
    default: {
      url: "https://explorer.onuschain.io/",
      name: "ONUS Chain Explorer",
    },
  },
  testnet: false,
}
```

3. TomoChain Testnet

```typescript
export const tomoTestnet: Chain = {
  id: 89,
  name: "TomoChain Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "TOMO",
    symbol: "TOMO",
  },
  network: "tomo",
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.tomochain.com/"],
    },
    public: {
      http: ["https://rpc.testnet.tomochain.com/"],
    },
  },
  blockExplorers: {
    default: {
      url: "https://testnet.tomoscan.io/",
      name: "TomoScan Testnet",
    },
  },
  testnet: true,
}
```

4. TomoChain Mainnet

```typescript
export const tomoMainnet: Chain = {
  id: 88,
  name: "TomoChain Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "TOMO",
    symbol: "TOMO",
  },
  network: "tomo",
  rpcUrls: {
    default: {
      http: ["https://rpc.tomochain.com/"],
    },
    public: {
      http: ["https://tomo.blockpi.network/v1/rpc/public/"],
    },
  },
  blockExplorers: {
    default: {
      url: "https://tomoscan.io/",
      name: "TomoScan",
    },
  },
  testnet: false,
}
```
