import { getNFTImageURL } from './getImageUrl'
import { useSingleShip } from './deepspace'
export const fetchImageData = (shipId: number) => {
  const { data, isLoading } = useSingleShip(shipId)

  type shipType = 'inventory' | 'shipsoutpost' | 'my-listing' | 'in-game-asset' | 'staking' | 'unstaking' | 'ship-link'
  let shipType: shipType
  if (data && data.length) {
    const imageUrl = getNFTImageURL(data[0]['ship'].shipType, data[0]['ship'].textureType, data[0]['ship'].textureNum)

    if (data[0]['listing']) {
      shipType = 'shipsoutpost'
      return { data, isLoading, shipType, imageUrl }
    } else {
      shipType = 'inventory'
      return { data, isLoading, shipType, imageUrl }
    }
  }
}