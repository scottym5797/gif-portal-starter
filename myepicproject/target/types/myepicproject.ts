export type Myepicproject = {
  "version": "0.0.0",
  "name": "myepicproject",
  "instructions": [
    {
      "name": "startStuffOff",
      "accounts": [
        {
          "name": "baseAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "addGif",
      "accounts": [
        {
          "name": "baseAccount",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "gifLink",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "baseAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalGifs",
            "type": "u64"
          },
          {
            "name": "gifList",
            "type": {
              "vec": {
                "defined": "ItemStruct"
              }
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "ItemStruct",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "gifLink",
            "type": "string"
          },
          {
            "name": "userAddress",
            "type": "publicKey"
          }
        ]
      }
    }
  ]
};

export const IDL: Myepicproject = {
  "version": "0.0.0",
  "name": "myepicproject",
  "instructions": [
    {
      "name": "startStuffOff",
      "accounts": [
        {
          "name": "baseAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "addGif",
      "accounts": [
        {
          "name": "baseAccount",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "gifLink",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "baseAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalGifs",
            "type": "u64"
          },
          {
            "name": "gifList",
            "type": {
              "vec": {
                "defined": "ItemStruct"
              }
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "ItemStruct",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "gifLink",
            "type": "string"
          },
          {
            "name": "userAddress",
            "type": "publicKey"
          }
        ]
      }
    }
  ]
};
