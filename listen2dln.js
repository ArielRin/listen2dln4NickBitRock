
const { ethers } = require("ethers");

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

destinationContract.on("FulfilledOrder", (order, orderId, sender, unlockAuthority, event) => {
  console.clear();
  console.log("🚀 Incoming Transaction Detected!");
  console.log("--------------------------------");

  const sourceChainId = order.giveChainId;
  const destinationTokenAddress = ethers.utils.toUtf8String(order.takeTokenAddress);
  const sourceSender = ethers.utils.toUtf8String(order.makerSrc);

  console.log("Order ID:", orderId);
  console.log("Source Chain ID:", sourceChainId);
  console.log("Source Sender Address:", sourceSender);
  console.log("Destination Token Address:", destinationTokenAddress);
  console.log("Give Amount (Source Chain):", ethers.formatEther(order.giveAmount));
  console.log("Take Amount (Destination Chain):", ethers.formatEther(order.takeAmount));
  console.log("Destination Receiver:", ethers.utils.toUtf8String(order.receiverDst));
  console.log("--------------------------------\n");
});

provider.on("error", (error) => {
  console.error("Error in provider:", error);
});

console.log("Listening for incoming transactions...");
