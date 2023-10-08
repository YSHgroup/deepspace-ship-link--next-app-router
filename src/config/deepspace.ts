// import {ENV_TYPES} from './constant'

export enum ENV_TYPES {
  DEVELOPMENT = '0',
  PRODUCTION = '1',
  TEST = '2', 
}

export const ENV_ASSETS_BASE_URI = {
  [ENV_TYPES.DEVELOPMENT]: 'https://assets.deepspace.game/',
  [ENV_TYPES.TEST]: 'https://test-assets.deepspace.game/',
  [ENV_TYPES.PRODUCTION]: 'https://assets.deepspace.game/',
}

export const ENV_SUBGRAPH_NFT = {
  [ENV_TYPES.DEVELOPMENT]: 'nft-dev',
  [ENV_TYPES.TEST]: 'nft-test',
  [ENV_TYPES.PRODUCTION]: 'nft',
}

export const ENV_DEFAULT_CHAIN = {
  [ENV_TYPES.DEVELOPMENT]: 97,
  [ENV_TYPES.TEST]: 97,
  [ENV_TYPES.PRODUCTION]: 56,
}