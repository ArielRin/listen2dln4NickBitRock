
# Multichain Bitrock Listener

A powerful and straightforward blockchain event listener for monitoring transactions on the Bitrock Multichain dApp and DLN Network. This script listens for live events from a specific smart contract, logs the details to the command line, and counts incoming transactions. It can be easily integrated into Telegram bots, Discord bots, DApps, or webpages to track and display transaction activity in real-time.

---

## **How It Works**

1. **Event Monitoring**:
   - Continuously listens for the `FulfilledOrder` event emitted by the specified smart contract on the Bitrock network.

2. **Real-Time Logging**:
   - Logs essential details of each event, including:
     - **Transaction Hash**
     - **Order ID**
     - **Source Chain ID**
     - **Give Amount**
     - **Take Amount**
     - **Receiver Address**

3. **Transaction Counter**:
   - Maintains a running count of all incoming transactions to provide a quick summary.

4. **Applications**:
   - **Command Line Interface**: Monitor and display events in your terminal.
   - **Telegram Bots**: Send live event notifications to Telegram channels.
   - **Discord Bots**: Post transaction updates to Discord servers.
   - **Webpages/DApps**: Display transaction activity for users in real-time.

---

## **Installation**

Follow these steps to set up and run the project:

### **1. Clone the Repository**

```bash
git clone https://github.com/ArielRin/listen2dln4NickBitRock.git
cd multichain-bitrock-listener
```

### **2. Install Dependencies**

Ensure you have Node.js installed (v16 or above). Then, run:

```bash
npm install
```

### **3. Configure the Listener**

Update the `DESTINATION_RPC_URL`, `DESTINATION_CONTRACT_ADDRESS`, and `DESTINATION_CONTRACT_ABI` variables in the script (`listener.js`) with the appropriate RPC endpoint, contract address, and ABI for your use case.

### **4. Run the Script**

Start the listener:

```bash
node listen2dln.js
```


### **5. Run the Script**

Run the Fetch script to see last few incoming Bridge Transactions:

```bash
node fetch.js
```

---

## **Features**

- **Simple and Efficient**: Lightweight event listener using `ethers.js`.
- **Real-Time Transaction Monitoring**: See live updates of contract events.
- **Flexible Integration**:
  - **Telegram Bots**: Use the data to send notifications.
  - **Discord Bots**: Post updates to your server.
  - **Web Applications/DApps**: Display activity for your users.
- **Transaction Summary**: Count and display the total number of processed transactions.

---

## **Use Cases**

1. **Telegram Bots**:
   - Integrate with Telegram's bot API to send live notifications for each detected transaction.

2. **Discord Bots**:
   - Leverage Discord webhooks to post event details directly to a channel.

3. **DApps**:
   - Provide a live transaction feed on a decentralized application for enhanced user experience.

4. **Webpages**:
   - Display real-time contract activity for visitors, offering insights into blockchain transactions.

---

## **Code Overview**

### Key Components:
- **`ethers.js`**:
  - Used for connecting to the blockchain and interacting with the contract.
- **Event Listener**:
  - Listens for the `FulfilledOrder` event and logs transaction details.

---

## **Contributing**

Contributions are welcome! If you have ideas for improvements or new features, feel free to submit a pull request.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

### **Recommended Enhancements**

- **Log Historical Data**: Add functionality to log past transactions before starting the live listener.
- **Data Export**: Save transaction data to a database or a file for further analysis.
- **Custom Alerts**: Trigger notifications based on specific conditions (e.g., large transactions, specific tokens).

---

This project is a powerful tool for blockchain enthusiasts, developers, and businesses looking to monitor and act on live transaction data. Enjoy using it, and let us know how it helped your project!

---
