export const test1 = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'upkeep', type: 'address' },
      { indexed: false, internalType: 'address', name: 'owner', type: 'address' }
    ],
    name: 'NewCronUpkeepCreated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' }
    ],
    name: 'OwnershipTransferRequested',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  { inputs: [], name: 'acceptOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [], name: 'cronDelegateAddress', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
  {
    inputs: [
      { internalType: 'address', name: 'target', type: 'address' },
      { internalType: 'bytes', name: 'handler', type: 'bytes' },
      { internalType: 'string', name: 'cronString', type: 'string' }
    ],
    name: 'encodeCronJob',
    outputs: [{ internalType: 'bytes', name: '', type: 'bytes' }],
    stateMutability: 'pure',
    type: 'function'
  },
  { inputs: [{ internalType: 'string', name: 'cronString', type: 'string' }], name: 'encodeCronString', outputs: [{ internalType: 'bytes', name: '', type: 'bytes' }], stateMutability: 'pure', type: 'function' },
  { inputs: [], name: 'newCronUpkeep', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [{ internalType: 'bytes', name: 'encodedJob', type: 'bytes' }], name: 'newCronUpkeepWithJob', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [], name: 'owner', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 's_maxJobs', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ internalType: 'uint256', name: 'maxJobs', type: 'uint256' }], name: 'setMaxJobs', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [{ internalType: 'address', name: 'to', type: 'address' }], name: 'transferOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' }
]
