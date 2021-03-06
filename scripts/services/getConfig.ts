import { compat, types as T } from "../deps.ts";

export const getConfig: T.ExpectedExports.getConfig = compat.getConfig({
  "tor-address": {
    "name": "Tor Address",
    "description": "The Tor address of the network interface",
    "type": "pointer",
    "subtype": "package",
    "package-id": "lightning-terminal",
    "target": "tor-address",
    "interface": "main",
  },
  "password": {
    "type": "string",
    "name": "Lightning Terminal Password",
    "description": "Administrator password for Lightning Terminal",
    "nullable": false,
    "copyable": true,
    "masked": true,
    "default": {
      "charset": "a-z,A-Z,0-9",
      "len": 22
    }
  },
  "bitcoind": {
    "type": "union",
    "name": "Bitcoin Core",
    "description": "The Bitcoin Core node to connect to:\n  - internal: The Bitcoin Core or Proxy services installed to your Embassy\n",
    "tag": {
      "id": "type",
      "name": "Type",
      "variant-names": {
        "internal": "Bitcoin Core",
        "internal-proxy": "Bitcoin Proxy"
      },
      "description": "The Bitcoin Core node to connect to:\n  - internal: The Bitcoin Core and Proxy services installed to your Embassy\n"
    },
    "default": "internal-proxy",
    "variants": {
      "internal": {
        "user": {
          "type": "pointer",
          "name": "RPC Username",
          "description": "The username for Bitcoin Core's RPC interface",
          "subtype": "package",
          "package-id": "bitcoind",
          "target": "config",
          "multi": false,
          "selector": "$.rpc.username"
        },
        "password": {
          "type": "pointer",
          "name": "RPC Password",
          "description": "The password for Bitcoin Core's RPC interface",
          "subtype": "package",
          "package-id": "bitcoind",
          "target": "config",
          "multi": false,
          "selector": "$.rpc.password"
        }
      },
      "internal-proxy": {
        "user": {
          "type": "pointer",
          "name": "RPC Username",
          "description": "The username for the RPC user allocated to electrs",
          "subtype": "package",
          "package-id": "btc-rpc-proxy",
          "target": "config",
          "multi": false,
          "selector": "$.users[?(@.name == \"lightning-terminal\")].name"
        },
        "password": {
          "type": "pointer",
          "name": "RPC Password",
          "description": "The password for the RPC user allocated to electrs",
          "subtype": "package",
          "package-id": "btc-rpc-proxy",
          "target": "config",
          "multi": false,
          "selector": "$.users[?(@.name == \"lightning-terminal\")].password"
        },
      }
    }
  },
});
