window.abi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'side',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'hasWon',
        type: 'bool',
      },
    ],
    name: 'Flpped',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'side',
        type: 'uint256',
      },
    ],
    name: 'Flip',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
    payable: true,
  },
]
