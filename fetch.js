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

async function fetchLogsInBatches() {
  try {
    const latestBlock = await provider.getBlockNumber();
    const startBlock = latestBlock - 100000; // Adjust the start block as needed
    const batchSize = 2000; // Smaller batch size to avoid RPC limits

    console.log(`Fetching logs from blocks ${startBlock} to ${latestBlock} in batches...`);

    let allLogs = [];

    for (let i = startBlock; i < latestBlock; i += batchSize) {
      const fromBlock = i;
      const toBlock = Math.min(i + batchSize - 1, latestBlock);

      console.log(`Fetching logs from blocks ${fromBlock} to ${toBlock}...`);

      const logs = await provider.getLogs({
        address: DESTINATION_CONTRACT_ADDRESS,
        fromBlock: fromBlock,
        toBlock: toBlock
      });

      allLogs = allLogs.concat(logs);
    }

    if (allLogs.length === 0) {
      console.log("No events found in the specified block range.");
      return;
    }

    allLogs.forEach((log, index) => {
      const parsed = destinationContract.interface.parseLog(log);
      console.log(`\nEvent ${index + 1}:`);
      console.log({
        transactionHash: log.transactionHash,
        blockNumber: log.blockNumber,
        parsedArgs: parsed.args
      });
    });
  } catch (error) {
    console.error("Error fetching logs in batches:", error);
  }
}

// Fetch logs in smaller batches
fetchLogsInBatches();
