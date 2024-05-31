export const test = [
  {
    inputs: [
      { internalType: 'address', name: 'LINKAddress', type: 'address' },
      { internalType: 'address', name: 'keeperRegistry', type: 'address' },
      { internalType: 'uint96', name: 'minLINKJuels', type: 'uint96' },
      {
        components: [
          { internalType: 'uint8', name: 'triggerType', type: 'uint8' },
          { internalType: 'enum AutomationRegistrar2_1.AutoApproveType', name: 'autoApproveType', type: 'uint8' },
          { internalType: 'uint32', name: 'autoApproveMaxAllowed', type: 'uint32' }
        ],
        internalType: 'struct AutomationRegistrar2_1.InitialTriggerConfig[]',
        name: 'triggerConfigs',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  { inputs: [], name: 'AmountMismatch', type: 'error' },
  { inputs: [], name: 'FunctionNotPermitted', type: 'error' },
  { inputs: [], name: 'HashMismatch', type: 'error' },
  { inputs: [], name: 'InsufficientPayment', type: 'error' },
  { inputs: [], name: 'InvalidAdminAddress', type: 'error' },
  { inputs: [], name: 'InvalidDataLength', type: 'error' },
  { inputs: [{ internalType: 'address', name: 'to', type: 'address' }], name: 'LinkTransferFailed', type: 'error' },
  { inputs: [], name: 'OnlyAdminOrOwner', type: 'error' },
  { inputs: [], name: 'OnlyLink', type: 'error' },
  { inputs: [], name: 'RegistrationRequestFailed', type: 'error' },
  { inputs: [], name: 'RequestNotFound', type: 'error' },
  { inputs: [], name: 'SenderMismatch', type: 'error' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'senderAddress', type: 'address' },
      { indexed: false, internalType: 'bool', name: 'allowed', type: 'bool' }
    ],
    name: 'AutoApproveAllowedSenderSet',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'keeperRegistry', type: 'address' },
      { indexed: false, internalType: 'uint96', name: 'minLINKJuels', type: 'uint96' }
    ],
    name: 'ConfigChanged',
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
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'hash', type: 'bytes32' },
      { indexed: false, internalType: 'string', name: 'displayName', type: 'string' },
      { indexed: true, internalType: 'uint256', name: 'upkeepId', type: 'uint256' }
    ],
    name: 'RegistrationApproved',
    type: 'event'
  },
  { anonymous: false, inputs: [{ indexed: true, internalType: 'bytes32', name: 'hash', type: 'bytes32' }], name: 'RegistrationRejected', type: 'event' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'hash', type: 'bytes32' },
      { indexed: false, internalType: 'string', name: 'name', type: 'string' },
      { indexed: false, internalType: 'bytes', name: 'encryptedEmail', type: 'bytes' },
      { indexed: true, internalType: 'address', name: 'upkeepContract', type: 'address' },
      { indexed: false, internalType: 'uint32', name: 'gasLimit', type: 'uint32' },
      { indexed: false, internalType: 'address', name: 'adminAddress', type: 'address' },
      { indexed: false, internalType: 'uint8', name: 'triggerType', type: 'uint8' },
      { indexed: false, internalType: 'bytes', name: 'triggerConfig', type: 'bytes' },
      { indexed: false, internalType: 'bytes', name: 'offchainConfig', type: 'bytes' },
      { indexed: false, internalType: 'bytes', name: 'checkData', type: 'bytes' },
      { indexed: false, internalType: 'uint96', name: 'amount', type: 'uint96' }
    ],
    name: 'RegistrationRequested',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint8', name: 'triggerType', type: 'uint8' },
      { indexed: false, internalType: 'enum AutomationRegistrar2_1.AutoApproveType', name: 'autoApproveType', type: 'uint8' },
      { indexed: false, internalType: 'uint32', name: 'autoApproveMaxAllowed', type: 'uint32' }
    ],
    name: 'TriggerConfigSet',
    type: 'event'
  },
  { inputs: [], name: 'LINK', outputs: [{ internalType: 'contract LinkTokenInterface', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
  { inputs: [], name: 'acceptOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [
      { internalType: 'string', name: 'name', type: 'string' },
      { internalType: 'address', name: 'upkeepContract', type: 'address' },
      { internalType: 'uint32', name: 'gasLimit', type: 'uint32' },
      { internalType: 'address', name: 'adminAddress', type: 'address' },
      { internalType: 'uint8', name: 'triggerType', type: 'uint8' },
      { internalType: 'bytes', name: 'checkData', type: 'bytes' },
      { internalType: 'bytes', name: 'triggerConfig', type: 'bytes' },
      { internalType: 'bytes', name: 'offchainConfig', type: 'bytes' },
      { internalType: 'bytes32', name: 'hash', type: 'bytes32' }
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  { inputs: [{ internalType: 'bytes32', name: 'hash', type: 'bytes32' }], name: 'cancel', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [{ internalType: 'address', name: 'senderAddress', type: 'address' }], name: 'getAutoApproveAllowedSender', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' },
  {
    inputs: [],
    name: 'getConfig',
    outputs: [
      { internalType: 'address', name: 'keeperRegistry', type: 'address' },
      { internalType: 'uint256', name: 'minLINKJuels', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'hash', type: 'bytes32' }],
    name: 'getPendingRequest',
    outputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'uint96', name: '', type: 'uint96' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint8', name: 'triggerType', type: 'uint8' }],
    name: 'getTriggerRegistrationDetails',
    outputs: [
      {
        components: [
          { internalType: 'enum AutomationRegistrar2_1.AutoApproveType', name: 'autoApproveType', type: 'uint8' },
          { internalType: 'uint32', name: 'autoApproveMaxAllowed', type: 'uint32' },
          { internalType: 'uint32', name: 'approvedCount', type: 'uint32' }
        ],
        internalType: 'struct AutomationRegistrar2_1.TriggerRegistrationStorage',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'sender', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'bytes', name: 'data', type: 'bytes' }
    ],
    name: 'onTokenTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  { inputs: [], name: 'owner', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' },
  {
    inputs: [
      { internalType: 'string', name: 'name', type: 'string' },
      { internalType: 'bytes', name: 'encryptedEmail', type: 'bytes' },
      { internalType: 'address', name: 'upkeepContract', type: 'address' },
      { internalType: 'uint32', name: 'gasLimit', type: 'uint32' },
      { internalType: 'address', name: 'adminAddress', type: 'address' },
      { internalType: 'uint8', name: 'triggerType', type: 'uint8' },
      { internalType: 'bytes', name: 'checkData', type: 'bytes' },
      { internalType: 'bytes', name: 'triggerConfig', type: 'bytes' },
      { internalType: 'bytes', name: 'offchainConfig', type: 'bytes' },
      { internalType: 'uint96', name: 'amount', type: 'uint96' },
      { internalType: 'address', name: 'sender', type: 'address' }
    ],
    name: 'register',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'bytes', name: 'encryptedEmail', type: 'bytes' },
          { internalType: 'address', name: 'upkeepContract', type: 'address' },
          { internalType: 'uint32', name: 'gasLimit', type: 'uint32' },
          { internalType: 'address', name: 'adminAddress', type: 'address' },
          { internalType: 'uint8', name: 'triggerType', type: 'uint8' },
          { internalType: 'bytes', name: 'checkData', type: 'bytes' },
          { internalType: 'bytes', name: 'triggerConfig', type: 'bytes' },
          { internalType: 'bytes', name: 'offchainConfig', type: 'bytes' },
          { internalType: 'uint96', name: 'amount', type: 'uint96' }
        ],
        internalType: 'struct AutomationRegistrar2_1.RegistrationParams',
        name: 'requestParams',
        type: 'tuple'
      }
    ],
    name: 'registerUpkeep',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'senderAddress', type: 'address' },
      { internalType: 'bool', name: 'allowed', type: 'bool' }
    ],
    name: 'setAutoApproveAllowedSender',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'keeperRegistry', type: 'address' },
      { internalType: 'uint96', name: 'minLINKJuels', type: 'uint96' }
    ],
    name: 'setConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint8', name: 'triggerType', type: 'uint8' },
      { internalType: 'enum AutomationRegistrar2_1.AutoApproveType', name: 'autoApproveType', type: 'uint8' },
      { internalType: 'uint32', name: 'autoApproveMaxAllowed', type: 'uint32' }
    ],
    name: 'setTriggerConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  { inputs: [{ internalType: 'address', name: 'to', type: 'address' }], name: 'transferOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [], name: 'typeAndVersion', outputs: [{ internalType: 'string', name: '', type: 'string' }], stateMutability: 'view', type: 'function' }
]
