const ethers = require("ethers");
const { abi, address } = require("../utils/USDTContractOnMainnet");
const iface = new ethers.utils.Interface(abi);
const provider = new ethers.providers.InfuraProvider("homestead", {
    projectId: "" // ADD INFURA PROJECT ID
});

/**
 * Filter object
 */
const filter = {
    address,
    fromBlock: 14118000
}

provider.getLogs(filter).then((logs) => {
    console.log("Printing event details:");
    let events = logs.map((log) => iface.parseLog(log))
    console.log(events);
});




