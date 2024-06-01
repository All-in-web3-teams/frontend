export const Raffle = [
  {
    type: 'constructor',
    inputs: [
      { name: 'meme', type: 'address', internalType: 'address' },
      { name: 'memeBounty', type: 'uint256', internalType: 'uint256' },
      { name: 'winnerBounty', type: 'uint256', internalType: 'uint256' },
      { name: 'entrancefee', type: 'uint256', internalType: 'uint256' },
      { name: 'interval', type: 'uint256', internalType: 'uint256' },
      { name: 'vrfCoordinator', type: 'address', internalType: 'address' },
      { name: 'gasLane', type: 'bytes32', internalType: 'bytes32' },
      { name: 'subscriptionId', type: 'uint64', internalType: 'uint64' },
      { name: 'callbackGasLimit', type: 'uint32', internalType: 'uint32' }
    ],
    stateMutability: 'nonpayable'
  },
  { type: 'function', name: 'addMeme', inputs: [{ name: 'amount', type: 'uint256', internalType: 'uint256' }], outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    name: 'checkUpkeep',
    inputs: [{ name: '', type: 'bytes', internalType: 'bytes' }],
    outputs: [
      { name: 'upkeepNeeded', type: 'bool', internalType: 'bool' },
      { name: '', type: 'bytes', internalType: 'bytes' }
    ],
    stateMutability: 'view'
  },
  { type: 'function', name: 'enterRaffle', inputs: [], outputs: [], stateMutability: 'payable' },
  { type: 'function', name: 'getEntranceFee', inputs: [], outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'getLastTimeStamp', inputs: [], outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }], stateMutability: 'view' },
  { type: 'function', name: 'getPlayers', inputs: [], outputs: [{ name: '', type: 'address[]', internalType: 'address payable[]' }], stateMutability: 'view' },
  { type: 'function', name: 'getRaffleState', inputs: [], outputs: [{ name: '', type: 'uint8', internalType: 'enum Raffle.RaffleState' }], stateMutability: 'view' },
  { type: 'function', name: 'getRecentWinner', inputs: [], outputs: [{ name: '', type: 'address', internalType: 'address' }], stateMutability: 'view' },
  { type: 'function', name: 'performUpkeep', inputs: [{ name: '', type: 'bytes', internalType: 'bytes' }], outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    name: 'rawFulfillRandomWords',
    inputs: [
      { name: 'requestId', type: 'uint256', internalType: 'uint256' },
      { name: 'randomWords', type: 'uint256[]', internalType: 'uint256[]' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  { type: 'event', name: 'EnteredRaffle', inputs: [{ name: 'player', type: 'address', indexed: true, internalType: 'address' }], anonymous: false },
  { type: 'event', name: 'RequestWinner', inputs: [{ name: 'requestId', type: 'uint256', indexed: false, internalType: 'uint256' }], anonymous: false },
  { type: 'event', name: 'WinnerPicked', inputs: [{ name: 'winner', type: 'address', indexed: true, internalType: 'address' }], anonymous: false },
  {
    type: 'error',
    name: 'OnlyCoordinatorCanFulfill',
    inputs: [
      { name: 'have', type: 'address', internalType: 'address' },
      { name: 'want', type: 'address', internalType: 'address' }
    ]
  },
  { type: 'error', name: 'Raffle__NotEnoughethSend', inputs: [] },
  { type: 'error', name: 'Raffle__NotOpen', inputs: [] },
  { type: 'error', name: 'Raffle__TransferFailed', inputs: [] },
  { type: 'error', name: 'Raffle__TransferFromFailed', inputs: [] },
  {
    type: 'error',
    name: 'Raffle__UpKeepNotneed',
    inputs: [
      { name: 'timePast', type: 'uint256', internalType: 'uint256' },
      { name: 'state', type: 'uint8', internalType: 'enum Raffle.RaffleState' },
      { name: 'balance', type: 'uint256', internalType: 'uint256' }
    ]
  }
]
