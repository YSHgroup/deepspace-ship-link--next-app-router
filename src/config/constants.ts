import { ChainId } from '@deepspace-game/sdk'


export const SHIP_TYPES = ['Fighter', 'Support', 'Tank', 'Mining']

export const SHIP_TYPE_RANGE: any = [
  // Fighter
  {
    Speed: { min: 19, max: 55 },
    Attack: { min: 29, max: 100 },
    SpecialAttack: { min: 29, max: 100 },
    Mining: { min: 4, max: 30 },
    Luck: { min: 1, max: 100 },
    Shields: { min: 1, max: 50 },
    SpecialDefense: { min: 1, max: 50 },
    Health: { min: 19, max: 85 },
  },
  // Support
  {
    Speed: { min: 49, max: 100 },
    Attack: { min: 4, max: 65 },
    SpecialAttack: { min: 4, max: 65 },
    Mining: { min: 4, max: 30 },
    Luck: { min: 1, max: 100 },
    Shields: { min: 4, max: 65 },
    SpecialDefense: { min: 4, max: 65 },
    Health: { min: 19, max: 80 },
  },
  // Tank
  {
    Speed: { min: 9, max: 40 },
    Attack: { min: 4, max: 50 },
    SpecialAttack: { min: 1, max: 50 },
    Mining: { min: 4, max: 30 },
    Luck: { min: 1, max: 100 },
    Shields: { min: 39, max: 100 },
    SpecialDefense: { min: 19, max: 100 },
    Health: { min: 39, max: 100 },
  },
  // Mining
  {
    Speed: { min: 19, max: 50 },
    Attack: { min: 1, max: 55 },
    SpecialAttack: { min: 1, max: 55 },
    Mining: { min: 59, max: 100 },
    Luck: { min: 1, max: 100 },
    Shields: { min: 1, max: 60 },
    SpecialDefense: { min: 1, max: 60 },
    Health: { min: 19, max: 90 },
  },
]

export enum STAT_TYPES {
  ATTACK = 0,
  SHIELDS = 1,
  SPEED = 2,
  MINING = 3,
  LUCK = 4,
  SPECIAL_ATTACK = 5,
  SPECIAL_DEFENSE = 6,
  MAX_HEALTH = 7,
}

export const GRAPH_HOST: Record<number, string> = {
  [ChainId.MAINNET]: 'https://bsg.deepspace.game',
  [ChainId.BSC]: 'https://bsg.deepspace.game',
  [ChainId.BSC_TESTNET]: 'https://test-bsg.deepspace.game',
}
