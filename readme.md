# Multichain Bitrock Listener

![Multichain Bitrock Listener](https://example.com/path-to-image.png)

## Introduction

The **Multichain Bitrock Listener** is a Node.js script designed to fetch and monitor blockchain events for the Bitrock destination contract and provide detailed transaction and order information. It integrates with the deBridge API to retrieve source and destination token details, chain IDs, and amounts, enhancing its utility for decentralized apps (dApps), Telegram bots, Discord bots, or web-based dashboards.

This listener enables developers to:
- Monitor cross-chain transactions efficiently.
- Retrieve and display source and destination token details, amounts, and order metadata.
- Generate links to transaction explorers and detailed deBridge order information.

---

## Features

1. **Batch Log Fetching**:
   - Fetch blockchain logs in small batches to avoid exceeding RPC limits.

2. **Transaction and Order Details**:
   - Extract transaction hashes, order IDs, source/destination chain IDs, and token amounts.
   - Retrieve detailed order metadata via the deBridge API.

3. **Event Monitoring**:
   - Continuously fetch and display incoming blockchain events.

4. **Cross-Platform Links**:
   - Generate links to the Bitrock transaction explorer and deBridge order details for further insights.

5. **Detailed Token Information**:
   - Display source and destination token addresses, amounts, and symbols.

---

## Installation

### Prerequisites

- Node.js (v18 or later)
- NPM or Yarn installed on your system

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/multichain-bitrock-listener.git
   cd multichain-bitrock-listener
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the script:
   - Update the `DESTINATION_RPC_URL`, `DESTINATION_CONTRACT_ADDRESS`, and any other relevant constants in the script to match your environment.

4. Run the listener:
   ```bash
   node listener.js
   ```

---

## How It Works

1. **Log Fetching**:
   - The script fetches logs in batches from the configured start block to the latest block.

2. **Event Parsing**:
   - Each event is parsed to extract critical information such as the transaction hash, order ID, and token details.

3. **API Integration**:
   - The deBridge API is queried using the extracted order IDs to retrieve detailed order and token information.

4. **Console Output**:
   - The script outputs transaction and order details in a structured, readable format, including links to external explorers.

---

## Use Cases

1. **dApps**:
   - Integrate the listener with your decentralized application to monitor and display cross-chain transactions.

2. **Telegram & Discord Bots**:
   - Fetch and relay transaction updates to your community.

3. **Web Dashboards**:
   - Provide a real-time dashboard for cross-chain activity by integrating the listener with a web frontend.

4. **Monitoring Tools**:
   - Track specific transactions or orders for analytics and operational monitoring.

---

## Example Output

```
🚀 Multichain Bitrock Listener
Processed Events: 3
==================================================
Transaction Hash: 0x1234abcd...
Order ID: 0xf4d1bc78cd32554ec4b9b7acf928b6efd7cbe7991d6d319a05456758848d56b2
Source Chain ID: 8453
Destination Chain ID: 100000005
Give Amount: 0.1 ETH
Take Amount: 50 USDC
Links:
- Bitrock Transaction: https://bitrockscan.io/tx/0x1234abcd...
- deBridge Order Details: https://app.debridge.finance/order?orderId=0xf4d1bc78cd32554ec4b9b7acf928b6efd7cbe7991d6d319a05456758848d56b2
==================================================
Detailed Order Information:
- Source Token: 0x12345... (ETH)
- Destination Token: 0x67890... (USDC)
- Source Amount: 0.1
- Destination Amount: 50
==================================================
```

---

## Recommended Enhancements

- Add error handling for intermittent network issues.
- Configure webhook integration to notify external systems about specific events.
- Save logs to a file or database for historical records and analytics.

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

## Contributing

Feel free to open issues or submit pull requests. Contributions are welcome! 😊
