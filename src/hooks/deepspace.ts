import useSWR from "swr"
import { getDpsListings } from './fetchers'

export function useSingleShip(shipId:number) {
  const query = `
  {
    shipFilters(where:{tokenId:${shipId}}) {
      ship {
        id
        tokenId
        mintDate
        minter
        owner
        name
        stats
        cosmetics
        shipType
        coreType
        numCores
        textureNum
        textureType
        rating
        isBridged
      }
      listing {
        id
        tokenAddress
        seller
        price
        listDate
        token {
          tokenId
          name
          owner
          shipType
          coreType
          textureNum
          textureType
          rating
          stats
          cosmetics
          isBridged
        }
      }
    }
  }
  `
  const chainId = (process.env.NEXT_PUBLIC_ENVIRONMENT === 'development') ? 97 : (process.env.NEXT_PUBLIC_ENVIRONMENT === 'production') ? 56 : 1

  let { data, error, isLoading } = useSWR(
    chainId ? ['shipListings', chainId, query, JSON.stringify(undefined)] : null,
    () => getDpsListings(chainId, query, undefined),
    undefined
  )

  return { data, isLoading }
}