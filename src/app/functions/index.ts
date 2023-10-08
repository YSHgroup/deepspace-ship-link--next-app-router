import config from '../../config'
const TextureColors = ['#ededed', '#7fc766', '#00bdff', '#ff9a54', '#ff00d2']
export enum AssetTypes {
  Ships = 0,
}
export function getNFTImageURL(shipType: number, textureType: number, textureNum: string): string {
  return `${config.ASSETS_BASE_URI}nfts/${AssetTypes.Ships}/${shipType}/${textureType}/${textureNum}/nft.png`
}

export function getStarCount(stats: number[]): number {
  const total = stats.reduce((total, stat) => (total += stat), 0)
  if (total <= 284) return 1
  else if (total <= 352) return 2
  else if (total <= 424) return 3
  else if (total <= 465) return 4
  return 5
}
export function getTextureRarityColor(textureRarity: number): string {
  return TextureColors[textureRarity]
}
export function getStarLevel(stats: number[]): any {
  const currentLevel = Number(stats.reduce((total, stat) => (total += stat), 0))
  let maxLevel
  if (currentLevel < 284) maxLevel = 284
  else if (currentLevel < 352) maxLevel = 352
  else if (currentLevel < 424) maxLevel = 424
  else if (currentLevel < 465) maxLevel = 465
  else maxLevel = 570
  return { currentLevel, maxLevel }
}
export function assetURL(path: string): string {
  return config.ASSETS_BASE_URI + 'app/' + path
}
export function nftURL(path: string): string {
  return config.ASSETS_BASE_URI + 'nfts/' + path
}

export function detectBrowser() {
  if ((navigator.userAgent.indexOf('Opera') || navigator.userAgent.indexOf('OPR')) != -1) {
    return 'Opera'
  } else if (navigator.userAgent.indexOf('Chrome') != -1) {
    return 'Chrome'
  } else if (navigator.userAgent.indexOf('Safari') != -1) {
    return 'Safari'
  } else if (navigator.userAgent.indexOf('Firefox') != -1) {
    return 'Firefox'
  } else if (navigator.userAgent.indexOf('MSIE') != -1 || !!document.DOCUMENT_NODE == true) {
    return 'IE' 
  } else {
    return 'Unknown'
  }
}
