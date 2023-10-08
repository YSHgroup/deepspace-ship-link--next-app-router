import config from "../config"

export enum AssetTypes {
  Ships = 0,
}

export function getNFTImageURL(shipType: number, textureType: number, textureNum: string): string {
  return `${config.ASSETS_BASE_URI}nfts/${AssetTypes.Ships}/${shipType}/${textureType}/${textureNum}/nft.png`
}