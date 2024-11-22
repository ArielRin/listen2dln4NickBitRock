const { ethers } = require("ethers");

// Replace with your actual RPC URL and contract address
const DESTINATION_RPC_URL = "https://connect.bit-rock.io";
const DESTINATION_CONTRACT_ADDRESS = "0xe7351fd770a37282b91d153ee690b63579d6dd7f";

const DESTINATION_CONTRACT_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        components: [
          { internalType: "uint64", name: "makerOrderNonce", type: "uint64" },
          { internalType: "bytes", name: "makerSrc", type: "bytes" },
          { internalType: "uint256", name: "giveChainId", type: "uint256" },
          { internalType: "bytes", name: "giveTokenAddress", type: "bytes" },
          { internalType: "uint256", name: "giveAmount", type: "uint256" },
          { internalType: "uint256", name: "takeChainId", type: "uint256" },
          { internalType: "bytes", name: "takeTokenAddress", type: "bytes" },
          { internalType: "uint256", name: "takeAmount", type: "uint256" },
          { internalType: "bytes", name: "receiverDst", type: "bytes" },
          { internalType: "bytes", name: "givePatchAuthoritySrc", type: "bytes" },
          { internalType: "bytes", name: "orderAuthorityAddressDst", type: "bytes" },
          { internalType: "bytes", name: "allowedTakerDst", type: "bytes" },
          { internalType: "bytes", name: "allowedCancelBeneficiarySrc", type: "bytes" },
          { internalType: "bytes", name: "externalCall", type: "bytes" }
        ],
        indexed: false,
        internalType: "struct DlnBase.Order",
        name: "order",
        type: "tuple"
      },
      { indexed: false, internalType: "bytes32", name: "orderId", type: "bytes32" },
      { indexed: false, internalType: "address", name: "sender", type: "address" },
      { indexed: false, internalType: "address", name: "unlockAuthority", type: "address" }
    ],
    name: "FulfilledOrder",
    type: "event"
  }
];

const provider = new ethers.JsonRpcProvider(DESTINATION_RPC_URL);
const destinationContract = new ethers.Contract(
  DESTINATION_CONTRACT_ADDRESS,
  DESTINATION_CONTRACT_ABI,
  provider
);

let transactionCount = 0;

// Function to log event details
function logEvent(eventData) {
  console.clear();
  console.log(`🚀 Multichain Bitrock Listener`);
  console.log(`Incoming Transactions: ${transactionCount}`);
  console.log("=".repeat(50));
  console.log(`Transaction Hash: ${eventData.transactionHash}`);
  console.log(`Order ID: ${eventData.orderId}`);
  console.log(`Source Chain ID: ${eventData.sourceChainId}`);
  console.log(`Give Amount: ${eventData.giveAmount}`);
  console.log(`Take Amount: ${eventData.takeAmount}`);
  console.log(`Receiver Address: ${eventData.receiverDst}`);
  console.log("=".repeat(50));
}

// Listen for live events
destinationContract.on("FulfilledOrder", (order, orderId, sender, unlockAuthority, event) => {
  transactionCount += 1;

  const safeHexToUtf8 = (bytesValue) => {
    if (!bytesValue || bytesValue === "0x") return "N/A";
    try {
      return ethers.utils.toUtf8String(bytesValue);
    } catch {
      return `Invalid UTF-8: ${bytesValue}`;
    }
  };

  const eventData = {
    transactionHash: event.transactionHash,
    orderId: orderId,
    sourceChainId: order.giveChainId.toString(),
    giveAmount: ethers.formatEther(order.giveAmount),
    takeAmount: ethers.formatEther(order.takeAmount),
    receiverDst: safeHexToUtf8(order.receiverDst)
  };

  logEvent(eventData);
});

console.log("Listening for live events...");
