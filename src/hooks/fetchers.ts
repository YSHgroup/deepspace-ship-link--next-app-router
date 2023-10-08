import { GRAPH_HOST } from '../config/constants'
import { ChainId } from '@deepspace-game/sdk'
import config from '../config'
import { pager } from '.'

export const dpsGraph = async (chainId: number, query: string, variables = {}) => {
  return pager(`${GRAPH_HOST[chainId]}/subgraphs/name/${config.SUBGRAPH_NFT}`, query, variables)
}

export const getDpsListings = async (chainId = ChainId.BSC, query: string, variables = undefined) => {
  const { shipFilters } = await dpsGraph(chainId, query, variables)
  return shipFilters
}