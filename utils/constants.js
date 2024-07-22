const ONEINCHEXCHANGE_ABI = [{
  inputs: [{ internalType: 'contract IOneSplitMulti', name: 'impl', type: 'address' }], payable: false, stateMutability: 'nonpayable', type: 'constructor',
}, {
  anonymous: false,
  inputs: [{
    indexed: true, internalType: 'address', name: 'newImpl', type: 'address',
  }],
  name: 'ImplementationUpdated',
  type: 'event',
}, {
  anonymous: false,
  inputs: [{
    indexed: true, internalType: 'address', name: 'previousOwner', type: 'address',
  }, {
    indexed: true, internalType: 'address', name: 'newOwner', type: 'address',
  }],
  name: 'OwnershipTransferred',
  type: 'event',
}, {
  anonymous: false,
  inputs: [{
    indexed: true, internalType: 'contract IERC20', name: 'fromToken', type: 'address',
  }, {
    indexed: true, internalType: 'contract IERC20', name: 'destToken', type: 'address',
  }, {
    indexed: false, internalType: 'uint256', name: 'fromTokenAmount', type: 'uint256',
  }, {
    indexed: false, internalType: 'uint256', name: 'destTokenAmount', type: 'uint256',
  }, {
    indexed: false, internalType: 'uint256', name: 'minReturn', type: 'uint256',
  }, {
    indexed: false, internalType: 'uint256[]', name: 'distribution', type: 'uint256[]',
  }, {
    indexed: false, internalType: 'uint256[]', name: 'flags', type: 'uint256[]',
  }, {
    indexed: false, internalType: 'address', name: 'referral', type: 'address',
  }, {
    indexed: false, internalType: 'uint256', name: 'feePercent', type: 'uint256',
  }],
  name: 'Swapped',
  type: 'event',
}, { payable: true, stateMutability: 'payable', type: 'fallback' }, {
  constant: true, inputs: [], name: 'chi', outputs: [{ internalType: 'contract IFreeFromUpTo', name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: false, inputs: [{ internalType: 'contract IERC20', name: 'asset', type: 'address' }, { internalType: 'uint256', name: 'amount', type: 'uint256' }], name: 'claimAsset', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: true, inputs: [{ internalType: 'contract IERC20', name: 'fromToken', type: 'address' }, { internalType: 'contract IERC20', name: 'destToken', type: 'address' }, { internalType: 'uint256', name: 'amount', type: 'uint256' }, { internalType: 'uint256', name: 'parts', type: 'uint256' }, { internalType: 'uint256', name: 'flags', type: 'uint256' }], name: 'getExpectedReturn', outputs: [{ internalType: 'uint256', name: 'returnAmount', type: 'uint256' }, { internalType: 'uint256[]', name: 'distribution', type: 'uint256[]' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: true, inputs: [{ internalType: 'contract IERC20', name: 'fromToken', type: 'address' }, { internalType: 'contract IERC20', name: 'destToken', type: 'address' }, { internalType: 'uint256', name: 'amount', type: 'uint256' }, { internalType: 'uint256', name: 'parts', type: 'uint256' }, { internalType: 'uint256', name: 'flags', type: 'uint256' }, { internalType: 'uint256', name: 'destTokenEthPriceTimesGasPrice', type: 'uint256' }], name: 'getExpectedReturnWithGas', outputs: [{ internalType: 'uint256', name: 'returnAmount', type: 'uint256' }, { internalType: 'uint256', name: 'estimateGasAmount', type: 'uint256' }, { internalType: 'uint256[]', name: 'distribution', type: 'uint256[]' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: true, inputs: [{ internalType: 'contract IERC20[]', name: 'tokens', type: 'address[]' }, { internalType: 'uint256', name: 'amount', type: 'uint256' }, { internalType: 'uint256[]', name: 'parts', type: 'uint256[]' }, { internalType: 'uint256[]', name: 'flags', type: 'uint256[]' }, { internalType: 'uint256[]', name: 'destTokenEthPriceTimesGasPrices', type: 'uint256[]' }], name: 'getExpectedReturnWithGasMulti', outputs: [{ internalType: 'uint256[]', name: 'returnAmounts', type: 'uint256[]' }, { internalType: 'uint256', name: 'estimateGasAmount', type: 'uint256' }, { internalType: 'uint256[]', name: 'distribution', type: 'uint256[]' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: true, inputs: [], name: 'isOwner', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: true, inputs: [], name: 'oneSplitImpl', outputs: [{ internalType: 'contract IOneSplitMulti', name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: true, inputs: [], name: 'owner', outputs: [{ internalType: 'address', name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: false, inputs: [], name: 'renounceOwnership', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: false, inputs: [{ internalType: 'contract IOneSplitMulti', name: 'impl', type: 'address' }], name: 'setNewImpl', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: false, inputs: [{ internalType: 'contract IERC20', name: 'fromToken', type: 'address' }, { internalType: 'contract IERC20', name: 'destToken', type: 'address' }, { internalType: 'uint256', name: 'amount', type: 'uint256' }, { internalType: 'uint256', name: 'minReturn', type: 'uint256' }, { internalType: 'uint256[]', name: 'distribution', type: 'uint256[]' }, { internalType: 'uint256', name: 'flags', type: 'uint256' }], name: 'swap', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: true, stateMutability: 'payable', type: 'function',
}, {
  constant: false, inputs: [{ internalType: 'contract IERC20[]', name: 'tokens', type: 'address[]' }, { internalType: 'uint256', name: 'amount', type: 'uint256' }, { internalType: 'uint256', name: 'minReturn', type: 'uint256' }, { internalType: 'uint256[]', name: 'distribution', type: 'uint256[]' }, { internalType: 'uint256[]', name: 'flags', type: 'uint256[]' }], name: 'swapMulti', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: true, stateMutability: 'payable', type: 'function',
}, {
  constant: false, inputs: [{ internalType: 'contract IERC20', name: 'fromToken', type: 'address' }, { internalType: 'contract IERC20', name: 'destToken', type: 'address' }, { internalType: 'uint256', name: 'amount', type: 'uint256' }, { internalType: 'uint256', name: 'minReturn', type: 'uint256' }, { internalType: 'uint256[]', name: 'distribution', type: 'uint256[]' }, { internalType: 'uint256', name: 'flags', type: 'uint256' }, { internalType: 'address', name: 'referral', type: 'address' }, { internalType: 'uint256', name: 'feePercent', type: 'uint256' }], name: 'swapWithReferral', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: true, stateMutability: 'payable', type: 'function',
}, {
  constant: false, inputs: [{ internalType: 'contract IERC20[]', name: 'tokens', type: 'address[]' }, { internalType: 'uint256', name: 'amount', type: 'uint256' }, { internalType: 'uint256', name: 'minReturn', type: 'uint256' }, { internalType: 'uint256[]', name: 'distribution', type: 'uint256[]' }, { internalType: 'uint256[]', name: 'flags', type: 'uint256[]' }, { internalType: 'address', name: 'referral', type: 'address' }, { internalType: 'uint256', name: 'feePercent', type: 'uint256' }], name: 'swapWithReferralMulti', outputs: [{ internalType: 'uint256', name: 'returnAmount', type: 'uint256' }], payable: true, stateMutability: 'payable', type: 'function',
}, {
  constant: false, inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }], name: 'transferOwnership', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}];
const ONEINCHEXCHANGE_ADDRESS = '0x50FDA034C0Ce7a8f7EFDAebDA7Aa7cA21CC1267e';
const DAI_ABI = [{
  inputs: [{ internalType: 'uint256', name: 'chainId_', type: 'uint256' }], payable: false, stateMutability: 'nonpayable', type: 'constructor',
}, {
  anonymous: false,
  inputs: [{
    indexed: true, internalType: 'address', name: 'src', type: 'address',
  }, {
    indexed: true, internalType: 'address', name: 'guy', type: 'address',
  }, {
    indexed: false, internalType: 'uint256', name: 'wad', type: 'uint256',
  }],
  name: 'Approval',
  type: 'event',
}, {
  anonymous: true,
  inputs: [{
    indexed: true, internalType: 'bytes4', name: 'sig', type: 'bytes4',
  }, {
    indexed: true, internalType: 'address', name: 'usr', type: 'address',
  }, {
    indexed: true, internalType: 'bytes32', name: 'arg1', type: 'bytes32',
  }, {
    indexed: true, internalType: 'bytes32', name: 'arg2', type: 'bytes32',
  }, {
    indexed: false, internalType: 'bytes', name: 'data', type: 'bytes',
  }],
  name: 'LogNote',
  type: 'event',
}, {
  anonymous: false,
  inputs: [{
    indexed: true, internalType: 'address', name: 'src', type: 'address',
  }, {
    indexed: true, internalType: 'address', name: 'dst', type: 'address',
  }, {
    indexed: false, internalType: 'uint256', name: 'wad', type: 'uint256',
  }],
  name: 'Transfer',
  type: 'event',
}, {
  constant: true, inputs: [], name: 'DOMAIN_SEPARATOR', outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: true, inputs: [], name: 'PERMIT_TYPEHASH', outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: true, inputs: [{ internalType: 'address', name: '', type: 'address' }, { internalType: 'address', name: '', type: 'address' }], name: 'allowance', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: false, inputs: [{ internalType: 'address', name: 'usr', type: 'address' }, { internalType: 'uint256', name: 'wad', type: 'uint256' }], name: 'approve', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: true, inputs: [{ internalType: 'address', name: '', type: 'address' }], name: 'balanceOf', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: false, inputs: [{ internalType: 'address', name: 'usr', type: 'address' }, { internalType: 'uint256', name: 'wad', type: 'uint256' }], name: 'burn', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: true, inputs: [], name: 'decimals', outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: false, inputs: [{ internalType: 'address', name: 'guy', type: 'address' }], name: 'deny', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: false, inputs: [{ internalType: 'address', name: 'usr', type: 'address' }, { internalType: 'uint256', name: 'wad', type: 'uint256' }], name: 'mint', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: false, inputs: [{ internalType: 'address', name: 'src', type: 'address' }, { internalType: 'address', name: 'dst', type: 'address' }, { internalType: 'uint256', name: 'wad', type: 'uint256' }], name: 'move', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: true, inputs: [], name: 'name', outputs: [{ internalType: 'string', name: '', type: 'string' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: true, inputs: [{ internalType: 'address', name: '', type: 'address' }], name: 'nonces', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: false, inputs: [{ internalType: 'address', name: 'holder', type: 'address' }, { internalType: 'address', name: 'spender', type: 'address' }, { internalType: 'uint256', name: 'nonce', type: 'uint256' }, { internalType: 'uint256', name: 'expiry', type: 'uint256' }, { internalType: 'bool', name: 'allowed', type: 'bool' }, { internalType: 'uint8', name: 'v', type: 'uint8' }, { internalType: 'bytes32', name: 'r', type: 'bytes32' }, { internalType: 'bytes32', name: 's', type: 'bytes32' }], name: 'permit', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: false, inputs: [{ internalType: 'address', name: 'usr', type: 'address' }, { internalType: 'uint256', name: 'wad', type: 'uint256' }], name: 'pull', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: false, inputs: [{ internalType: 'address', name: 'usr', type: 'address' }, { internalType: 'uint256', name: 'wad', type: 'uint256' }], name: 'push', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: false, inputs: [{ internalType: 'address', name: 'guy', type: 'address' }], name: 'rely', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: true, inputs: [], name: 'symbol', outputs: [{ internalType: 'string', name: '', type: 'string' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: true, inputs: [], name: 'totalSupply', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: false, inputs: [{ internalType: 'address', name: 'dst', type: 'address' }, { internalType: 'uint256', name: 'wad', type: 'uint256' }], name: 'transfer', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: false, inputs: [{ internalType: 'address', name: 'src', type: 'address' }, { internalType: 'address', name: 'dst', type: 'address' }, { internalType: 'uint256', name: 'wad', type: 'uint256' }], name: 'transferFrom', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: true, inputs: [], name: 'version', outputs: [{ internalType: 'string', name: '', type: 'string' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: true, inputs: [{ internalType: 'address', name: '', type: 'address' }], name: 'wards', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function',
}];
const DAI_ADDRESS = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
const SAI_ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"stop","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"name_","type":"bytes32"}],"name":"setName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"src","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"stopped","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"authority_","type":"address"}],"name":"setAuthority","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"push","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"move","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"start","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"authority","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"src","type":"address"},{"name":"guy","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"wad","type":"uint256"}],"name":"pull","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"symbol_","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"authority","type":"address"}],"name":"LogSetAuthority","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"LogSetOwner","type":"event"},{"anonymous":true,"inputs":[{"indexed":true,"name":"sig","type":"bytes4"},{"indexed":true,"name":"guy","type":"address"},{"indexed":true,"name":"foo","type":"bytes32"},{"indexed":true,"name":"bar","type":"bytes32"},{"indexed":false,"name":"wad","type":"uint256"},{"indexed":false,"name":"fax","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"}]
const SAI_ADDRESS = '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359';
const USDT_ABI = [{
  constant: true, inputs: [], name: 'name', outputs: [{ name: '', type: 'string' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: false, inputs: [{ name: '_upgradedAddress', type: 'address' }], name: 'deprecate', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: false, inputs: [{ name: '_spender', type: 'address' }, { name: '_value', type: 'uint256' }], name: 'approve', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: true, inputs: [], name: 'deprecated', outputs: [{ name: '', type: 'bool' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: false, inputs: [{ name: '_evilUser', type: 'address' }], name: 'addBlackList', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: true, inputs: [], name: 'totalSupply', outputs: [{ name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: false, inputs: [{ name: '_from', type: 'address' }, { name: '_to', type: 'address' }, { name: '_value', type: 'uint256' }], name: 'transferFrom', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: true, inputs: [], name: 'upgradedAddress', outputs: [{ name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: true, inputs: [{ name: '', type: 'address' }], name: 'balances', outputs: [{ name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: true, inputs: [], name: 'decimals', outputs: [{ name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: true, inputs: [], name: 'maximumFee', outputs: [{ name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: true, inputs: [], name: '_totalSupply', outputs: [{ name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: false, inputs: [], name: 'unpause', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: true, inputs: [{ name: '_maker', type: 'address' }], name: 'getBlackListStatus', outputs: [{ name: '', type: 'bool' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: true, inputs: [{ name: '', type: 'address' }, { name: '', type: 'address' }], name: 'allowed', outputs: [{ name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: true, inputs: [], name: 'paused', outputs: [{ name: '', type: 'bool' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: true, inputs: [{ name: 'who', type: 'address' }], name: 'balanceOf', outputs: [{ name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: false, inputs: [], name: 'pause', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: true, inputs: [], name: 'getOwner', outputs: [{ name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: true, inputs: [], name: 'owner', outputs: [{ name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: true, inputs: [], name: 'symbol', outputs: [{ name: '', type: 'string' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: false, inputs: [{ name: '_to', type: 'address' }, { name: '_value', type: 'uint256' }], name: 'transfer', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: false, inputs: [{ name: 'newBasisPoints', type: 'uint256' }, { name: 'newMaxFee', type: 'uint256' }], name: 'setParams', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: false, inputs: [{ name: 'amount', type: 'uint256' }], name: 'issue', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: false, inputs: [{ name: 'amount', type: 'uint256' }], name: 'redeem', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: true, inputs: [{ name: '_owner', type: 'address' }, { name: '_spender', type: 'address' }], name: 'allowance', outputs: [{ name: 'remaining', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: true, inputs: [], name: 'basisPointsRate', outputs: [{ name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: true, inputs: [{ name: '', type: 'address' }], name: 'isBlackListed', outputs: [{ name: '', type: 'bool' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: false, inputs: [{ name: '_clearedUser', type: 'address' }], name: 'removeBlackList', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: true, inputs: [], name: 'MAX_UINT', outputs: [{ name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: false, inputs: [{ name: 'newOwner', type: 'address' }], name: 'transferOwnership', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: false, inputs: [{ name: '_blackListedUser', type: 'address' }], name: 'destroyBlackFunds', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  inputs: [{ name: '_initialSupply', type: 'uint256' }, { name: '_name', type: 'string' }, { name: '_symbol', type: 'string' }, { name: '_decimals', type: 'uint256' }], payable: false, stateMutability: 'nonpayable', type: 'constructor',
}, {
  anonymous: false, inputs: [{ indexed: false, name: 'amount', type: 'uint256' }], name: 'Issue', type: 'event',
}, {
  anonymous: false, inputs: [{ indexed: false, name: 'amount', type: 'uint256' }], name: 'Redeem', type: 'event',
}, {
  anonymous: false, inputs: [{ indexed: false, name: 'newAddress', type: 'address' }], name: 'Deprecate', type: 'event',
}, {
  anonymous: false, inputs: [{ indexed: false, name: 'feeBasisPoints', type: 'uint256' }, { indexed: false, name: 'maxFee', type: 'uint256' }], name: 'Params', type: 'event',
}, {
  anonymous: false, inputs: [{ indexed: false, name: '_blackListedUser', type: 'address' }, { indexed: false, name: '_balance', type: 'uint256' }], name: 'DestroyedBlackFunds', type: 'event',
}, {
  anonymous: false, inputs: [{ indexed: false, name: '_user', type: 'address' }], name: 'AddedBlackList', type: 'event',
}, {
  anonymous: false, inputs: [{ indexed: false, name: '_user', type: 'address' }], name: 'RemovedBlackList', type: 'event',
}, {
  anonymous: false, inputs: [{ indexed: true, name: 'owner', type: 'address' }, { indexed: true, name: 'spender', type: 'address' }, { indexed: false, name: 'value', type: 'uint256' }], name: 'Approval', type: 'event',
}, {
  anonymous: false, inputs: [{ indexed: true, name: 'from', type: 'address' }, { indexed: true, name: 'to', type: 'address' }, { indexed: false, name: 'value', type: 'uint256' }], name: 'Transfer', type: 'event',
}, {
  anonymous: false, inputs: [], name: 'Pause', type: 'event',
}, {
  anonymous: false, inputs: [], name: 'Unpause', type: 'event',
}];
const USDT_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7';

const ATOKEN_ABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "investor",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "depositedAt",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "uTokenDepositPrice",
          "type": "uint256[]"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "uTokenBalance",
          "type": "uint256[]"
        }
      ],
      "name": "Deposit",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "uTokensProportion",
          "type": "uint256[]"
        }
      ],
      "name": "UnderlyingTokenProportionSet",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "contract IERC20[]",
          "name": "uTokens",
          "type": "address[]"
        }
      ],
      "name": "UnderlyingTokenSet",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "investor",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "withdrawnAt",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "uTokenWithdrawnPrice",
          "type": "uint256[]"
        }
      ],
      "name": "Withdraw",
      "type": "event"
    },
    {
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "inputs": [],
      "name": "FEE_PERCENT",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "ONEINCH_EXCHANGE",
      "outputs": [
        {
          "internalType": "contract IOneSplit",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "PLATFORM_WALLET",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "PRICE_PER_TOKEN",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "aarnaFinanceContract",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "depositETHForATokens",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getInvestorsLength",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getUnderlyingTokenProportions",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "underlyingTokenProportions",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getUnderlyingTokens",
      "outputs": [
        {
          "internalType": "contract IERC20[]",
          "name": "underlyingTokens",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract IERC20",
          "name": "_aarnaFinanceContract",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_symbol",
          "type": "string"
        },
        {
          "internalType": "contract IERC20[]",
          "name": "_underlyingTokens",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "_underlyingTokensProportion",
          "type": "uint256[]"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "investorInfo",
      "outputs": [
        {
          "internalType": "bool",
          "name": "isPresent",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "ethDeposits",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "depositedAt",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "ethWithdrawn",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "withdrawnAt",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "tokensIssued",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "investors",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalEthInvested",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "uTokenProportions",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "uTokens",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdrawAll",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "contract IERC20",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "withdrawERC20Tokens",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ]


const UNI_ABI = [{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"minter_","type":"address"},{"internalType":"uint256","name":"mintingAllowedAfter_","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegator","type":"address"},{"indexed":true,"internalType":"address","name":"fromDelegate","type":"address"},{"indexed":true,"internalType":"address","name":"toDelegate","type":"address"}],"name":"DelegateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegate","type":"address"},{"indexed":false,"internalType":"uint256","name":"previousBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newBalance","type":"uint256"}],"name":"DelegateVotesChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"minter","type":"address"},{"indexed":false,"internalType":"address","name":"newMinter","type":"address"}],"name":"MinterChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DELEGATION_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"DOMAIN_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"rawAmount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint32","name":"","type":"uint32"}],"name":"checkpoints","outputs":[{"internalType":"uint32","name":"fromBlock","type":"uint32"},{"internalType":"uint96","name":"votes","type":"uint96"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"delegatee","type":"address"}],"name":"delegate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"delegatee","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"delegateBySig","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"delegates","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getCurrentVotes","outputs":[{"internalType":"uint96","name":"","type":"uint96"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"getPriorVotes","outputs":[{"internalType":"uint96","name":"","type":"uint96"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minimumTimeBetweenMints","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"rawAmount","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"mintCap","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minter","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"mintingAllowedAfter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"numCheckpoints","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"rawAmount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"minter_","type":"address"}],"name":"setMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"rawAmount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"rawAmount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]

const UNI_ADDRESS = '0x514910771AF9Ca656af840dff83E8264EcF986CA';
const DAI_PRICEPROVIDER = "0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9";
const UNI_PRICEPROVIDER = "0x2c1d072e956AFFC0D435Cb7AC38EF18d24d9127c";
const USDT_PRICEPROVIDER = "0x3E7d1eAB13ad0104d2750B8863b489D65364e32D";

module.exports = {
  ONEINCHEXCHANGE_ABI,
  ONEINCHEXCHANGE_ADDRESS,
  SAI_ABI,
  SAI_ADDRESS,
  DAI_ABI,
  DAI_ADDRESS,
  USDT_ABI,
  USDT_ADDRESS,
  UNI_ABI,
  UNI_ADDRESS,
  ATOKEN_ABI,
  DAI_PRICEPROVIDER,
  UNI_PRICEPROVIDER,
  USDT_PRICEPROVIDER
};
