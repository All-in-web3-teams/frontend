export const Raffle = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'meme',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'memeBounty',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'winnerBounty',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'entrancefee',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'interval',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'vrfCoordinator',
        type: 'address'
      },
      {
        internalType: 'bytes32',
        name: 'gasLane',
        type: 'bytes32'
      },
      {
        internalType: 'uint64',
        name: 'subscriptionId',
        type: 'uint64'
      },
      {
        internalType: 'uint32',
        name: 'callbackGasLimit',
        type: 'uint32'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'have',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'want',
        type: 'address'
      }
    ],
    name: 'OnlyCoordinatorCanFulfill',
    type: 'error'
  },
  {
    inputs: [],
    name: 'Raffle__NotEnoughethSend',
    type: 'error'
  },
  {
    inputs: [],
    name: 'Raffle__NotOpen',
    type: 'error'
  },
  {
    inputs: [],
    name: 'Raffle__TransferFailed',
    type: 'error'
  },
  {
    inputs: [],
    name: 'Raffle__TransferFromFailed',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'timePast',
        type: 'uint256'
      },
      {
        internalType: 'enum Raffle.RaffleState',
        name: 'state',
        type: 'uint8'
      },
      {
        internalType: 'uint256',
        name: 'balance',
        type: 'uint256'
      }
    ],
    name: 'Raffle__UpKeepNotneed',
    type: 'error'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'player',
        type: 'address'
      }
    ],
    name: 'EnteredRaffle',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256'
      }
    ],
    name: 'RequestWinner',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'winner',
        type: 'address'
      }
    ],
    name: 'WinnerPicked',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'addMeme',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes'
      }
    ],
    name: 'checkUpkeep',
    outputs: [
      {
        internalType: 'bool',
        name: 'upkeepNeeded',
        type: 'bool'
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'enterRaffle',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getEntranceFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getLastTimeStamp',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getPlayers',
    outputs: [
      {
        internalType: 'address payable[]',
        name: '',
        type: 'address[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getRaffleState',
    outputs: [
      {
        internalType: 'enum Raffle.RaffleState',
        name: '',
        type: 'uint8'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getRecentWinner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes'
      }
    ],
    name: 'performUpkeep',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256'
      },
      {
        internalType: 'uint256[]',
        name: 'randomWords',
        type: 'uint256[]'
      }
    ],
    name: 'rawFulfillRandomWords',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]
