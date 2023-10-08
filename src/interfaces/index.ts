export interface NFTData {
  stakingPoolId?: number
  tokenId: number
  name: string
  owner: string
  shipType: number
  coreType: number
  numCores?: number
  textureNum: string
  textureType: number
  isBridged: boolean
  stats: number[]
  cosmetics: number[]
  rarity?: any
  checked?: boolean
}

export interface ShipCardProps {
  cardType?: 'inventory' | 'shipsoutpost' | 'my-listing' | 'in-game-asset' | 'staking' | 'unstaking' | 'ship-link'
  nftData: NFTData
  price?: string
  modal?: any
  modaltype?:
  | 'buy-ship'
  | 'unlist-ship'
  | 'list-ship'
  | 'bridge-ship-in'
  | 'bridge-ship-out'
  | 'mint-ship'
  | 'staking-ship'
  | 'unstaking-ship'
  | 'update-ship'
  | 'transfer-ship'
  nftFullData: any
  handleStatus?: any
  PoolId?: number
  canAction?: boolean
  selectPool?: any
  imgURL?: string
}