const { ethers } = require("ethers");
const axios = require("axios");

// Configurations
const DESTINATION_RPC_URL = "https://connect.bit-rock.io";
const DESTINATION_CONTRACT_ADDRESS = "0xe7351fd770a37282b91d153ee690b63579d6dd7f";
const DLN_API_BASE_URL = "https://dln.debridge.finance/v1.0";

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

// Function to fetch order details from DLN API
async function fetchOrderDetails(orderId) {
  try {
    const response = await axios.get(`${DLN_API_BASE_URL}/dln/order/${orderId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for Order ID ${orderId}:`, error.response?.data || error.message);
    return null;
  }
}

// Event listener
let transactionCount = 0;

destinationContract.on("FulfilledOrder", async (order, orderId, sender, unlockAuthority, event) => {
  transactionCount++;

  const transactionHash = event.transactionHash || "N/A";

  // Fetch additional order details from DLN API
  const orderDetails = await fetchOrderDetails(orderId);

  console.clear();
  console.log(`🚀 Multichain Bitrock Listener`);
  console.log(`Incoming Transactions: ${transactionCount}`);
  console.log("=".repeat(50));
  console.log(`Transaction Hash: ${transactionHash}`);
  console.log(`Order ID: ${orderId}`);
  console.log(`Source Chain ID: ${order.giveChainId.toString()}`);
  console.log(`Destination Chain ID: ${order.takeChainId.toString()}`);
  console.log(`Give Amount: ${ethers.formatEther(order.giveAmount)}`);
  console.log(`Take Amount: ${ethers.formatEther(order.takeAmount)}`);
  console.log(`Receiver Address: ${ethers.utils.toUtf8String(order.receiverDst)}`);
  console.log("Links:");
  console.log(`- Bitrock Transaction: https://bitrockscan.io/tx/${transactionHash}`);
  console.log(`- deBridge Order Details: https://app.debridge.finance/order?orderId=${orderId}`);
  console.log("=".repeat(50));

  if (orderDetails) {
    console.log("Detailed Order Information:");
    console.log(`- Source Token: ${orderDetails.orderStruct.giveOffer.tokenAddress}`);
    console.log(`- Destination Token: ${orderDetails.orderStruct.takeOffer.tokenAddress}`);
    console.log(`- Source Amount: ${ethers.formatUnits(orderDetails.orderStruct.giveOffer.amount, 18)}`);
    console.log(`- Destination Amount: ${ethers.formatUnits(orderDetails.orderStruct.takeOffer.amount, 18)}`);
    console.log("=".repeat(50));
  }
});

console.log("Listening for live events...");
