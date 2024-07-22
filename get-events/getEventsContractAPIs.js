const ethers = require("ethers");
const { abi, address } = require("../utils/USDTContractOnMainnet");
const provider = new ethers.providers.InfuraProvider("homestead", {
    projectId: "" // ADD INFURA PROJECT ID
});
const contract = new ethers.Contract(address, abi, provider);
const myAddress = "0xE78388b4CE79068e89Bf8aA7f218eF6b9AB0e9d0"
const otherAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7"

// List all token transfers *from* myAddress
console.log(
    "Token transfer *from* myAddress:",
    contract.filters.Transfer(myAddress),
    "\n**********************************"
)

// List all token transfers *to* myAddress:
const toMyAddressLogs = contract.filters.Transfer(null, myAddress);
console.log(
    "Token transfers *to* myAddress:",
    toMyAddressLogs,
    "\n**********************************"
)

// List all token transfers *from* myAddress *to* otherAddress:
const fromMyAddressLogs = contract.filters.Transfer(myAddress, otherAddress);
console.log(
    "Token transfers *from* myAddress *to* otherAddress:",
    fromMyAddressLogs,
    "\n**********************************")

// List all token transfers *to* myAddress OR otherAddress:
const toMyAddressOROtherAddressLogs = contract.filters.Transfer(null, [myAddress, otherAddress]);
console.log(
    "Token transfers *from* myAddress *to* otherAddress:",
    toMyAddressOROtherAddressLogs,
    "\n**********************************"
);




