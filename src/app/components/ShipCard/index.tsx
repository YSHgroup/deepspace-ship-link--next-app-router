'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import styled from 'styled-components'
import cn from 'classnames'
import ShipAttribute from '../../components/ShipAttribute'
import { SHIP_TYPES, SHIP_TYPE_RANGE, STAT_TYPES } from '@/config/constants'
import { assetURL, getStarCount, getStarLevel, getTextureRarityColor, nftURL } from '../../functions'
import ShipReviewModal from '../../components/ShipModal'
import { ShipCardProps } from '../../../interfaces'

const StyledCard = styled.div`
  font-family: 'Lato', sans-serif;
  margin-bottom: 15px;
  min-width: 260px;
  min-height: 350px;
  max-height: 500px;
  background-image: url('https://assets.deepspace.game/app/ShipCardBack.svg');
  display: flex;
  justify-content: center;
  align-content: center;
  border-radius: 5px;
  background-size: 100% 100%;
  box-sizing: border-box;
  color: white !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .disabled-card {
    opacity: 0.4;
    cursor: not-allowed !important;
    pointer-events: none !important;
  }
  & > .card-container {
    box-sizing: border-box;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    padding: 8px 2px;
    padding-right: 16px;
    border-radius: 1rem;
  }
  .numcores {
    font-size: 14px;
    padding-top: 10px;
  }
  .card-split-container {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: auto;
    postion: relative;
  }
  .nft-card-container {
    margin: 0;
    margin: 0;
    padding-top: 8px;
    padding-left: 6px;
    padding-right: 6px;
    padding-bottom: 3px;
    background-size: 100% 100%;
    border: 2px solid cyan;
    border-radius: 24px;
    overflow: hidden;
    margin: 0px 6px;
    background-color: rgba(0, 0, 0, 0.35);
  }
  .nft-card-image-container {
    position: relative;
    height: 170px;
    //height: 180px;
    width: 100%;
  }
  .nft-card-image {
    height: 220px;
    width: 100%;
  }
  .nft-card-info-container {
    padding: 0 2px;
    margin-bottom: 6px;
  }
  .level-text {
    font-size: 14px;
    font-weight: bold;
    line-height: 17px;
    letter-spacing: 0em;
  }
  .star {
    font-size: 32px;
    line-height: 21px;
    letter-spacing: 0em;
    color: rgba(255, 255, 255, 0.2);
    transition: 0.3s all ease-in-out;
    &.active,
    &:hover {
      color: rgba(226, 183, 72, 1);
    }
  }
  .ship-info {
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
  }
  .ship-attributes {
    border-radius: 8px;
    border-bottom-left-radius: 18px;
    border-bottom-right-radius: 18px;
    border: 1px solid #d200ad;
  }
  .info-container {
    height: 465px;
    width: 95%;
  }
  .mobile-image {
    width: 100%;
    height: 100%;
  }
  .inside-container {
    max-width: 82%;
    left: -5%;
    right: 0;
    margin-left: auto;
    margin-right: auto;
  }
  .inv-btn {
    border: 1px solid #4bffff;
    color: white;
  }
  .btn-bg {
    background: radial-gradient(50% 50% at 50% 50%, rgba(0, 82, 170, 0.6) 0%, rgba(117, 0, 170, 0.6) 100%);
    border-color: #00ffff;
  }
  .modal-border {
    border: 2px solid #00ffff;
    max-width: 85% !important;
    color: white;
    background-color: rgb(0, 0, 0, 0.5);
  }
  .shipsoutpost-card,
  .inventory-card {
    grid-template-rows: auto auto;
    color: white !important;
  }
  .inventory-card .ship-image {
    min-height: 15px;
  }
  .shipsoutpost-card .ship-image {
    min-height: 159px;
  }
  .shipsoutpost-card .ship-image {
    min-height: 137px;
  }
  inventory-card .rarity-star {
    font-size: 21px;
  }
  .shipsoutpost-card rarity-star {
    font-size: 14px;
  }
  .animation-btn {
    background-image: linear-gradient(to right, #650aae, #650aae, #0052aa, #650aae, #650aae);
    position: relative;
    overflow: hidden;
    transition: all 3s !important;
  }
  .animation-btn:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 200px;
    transition: all 3s !important;
    background: hsla(0, 0%, 100%, 0.3);
    -webkit-transform: translate(-110px, -50px) rotate(45deg);
    transform: translate(-110px, -50px) rotate(45deg);
    -webkit-animation-name: buttonShine;
    animation-name: buttonShine;
    -webkit-animation-duration: 5s;
    animation-duration: 5s;
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    -webkit-animation-delay: 2s;
    animation-delay: 2s;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
  }
  @keyframes buttonShine {
    0% {
      transform: translate(-110px, -50px) rotate(45deg);
    }
    10% {
      transform: translate(200px, -50px) rotate(45deg);
    }
    100% {
      transform: translate(200px, -50px) rotate(45deg);
    }
  }
  .mobile-logo {
    width: 30px;
    height: 30px;
  }
  .logo-star {
    margin-top: -6px;
  }
  .modal-section {
    height: unset !important;
    margin-bottom: 0px !important;
    margin: auto;
  }
  @media (max-width: 1024px) {
    inventory .inside-container {
      padding-top: 2.35rem;
    }
    .inventory-card .ship-image {
      min-height: 127px;
    }
    .shipsoutpost-card .ship-image {
      min-height: 117px;
    }
    .shipsoutpost-card .rarity-star {
      font-size: 14px;
    }
    .shipsoutpost-card .mobile-logo {
      width: 18px !important;
      height: 18px !important;
    }

    .rarity-star {
      font-size: 14px;
    }
    .mobile-logo {
      width: 18px !important;
      height: 18px !important;
    }
    .logo-star {
      font-size: 24px !important;
      line-height: 1px;
      margin-top: -3.5px;
    }
    .inv-btn {
      font-size: 12px !important;
    }
  }
  @media (max-width: 992px) {
  }
`
const ShipCard: React.FC<ShipCardProps> = ({
  cardType,
  nftData,
  modaltype,
  imgURL,
}) => {
  const shipClass = SHIP_TYPES[nftData.shipType]
  const stars = getStarCount(nftData.stats)
  const borderColor = getTextureRarityColor(nftData.textureType)
  const { currentLevel, maxLevel } = getStarLevel(nftData.stats)
  const [open, setOpen] = useState(false)
  return (
    <>
      <StyledCard>
        <div className={cn('card-container', {})} style={modaltype && { padding: '8px 2px' }}>
          <div
            className={cn(
              'card-split-container',
              {
                'inventory-card modal-section':
                  modaltype === 'unlist-ship' ||
                  modaltype === 'bridge-ship-in' ||
                  modaltype === 'bridge-ship-out' ||
                  modaltype === 'list-ship' ||
                  modaltype === 'buy-ship',
              },
              {
                'shipsoutpost-card': cardType === 'shipsoutpost',
                'inventory-card': cardType === 'inventory' || cardType === 'my-listing',
              },
            )}
          >
            <div
              className="nft-card-container"
              style={{
                backgroundColor: modaltype ? 'rgba(59,16,105,0.95)' : '',
                boxShadow: `inset 0px 0px ${(nftData.textureType + 1) * 5}px ${
                  nftData.textureType + 1
                }px ${borderColor}`,
                borderColor: borderColor,
              }}
            >
              <div className="m-auto nft-card-image-container" onClick={() => setOpen(true)}>
                <Image
                  unoptimized={true}
                  className="cursor-pointer nft-card-image"
                  layout="fill"
                  src={`${imgURL}`}
                  loading="eager"
                  alt="Ship"
                  style={{ objectFit: 'contain' }}
                  placeholder="blur"
                  blurDataURL={assetURL('blurship.png')}
                />
                <div
                  className={cn('flex justify-between text-center', {
                    '': cardType === 'shipsoutpost',
                  })}
                >
                  <div className="flex items-start items">
                    <div className="ml-2">
                      {[...Array(stars)].map((v, i) => (
                        <span className="rarity-star" key={i}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>

                  <h5 className="mt-1" style={{ fontSize: '12px' }}>
                    ID: {nftData.tokenId}
                  </h5>
                  <div className="relative flex items-center mr-1">
                    <span className="mobile-logo">
                      <Image
                        unoptimized={true}
                        src={nftURL(`1/${nftData.coreType}/0.svg`)}
                        height="28"
                        width="28"
                        alt="upanddownlogo"
                        className="mobile-logo"
                      />
                    </span>
                    {nftData.numCores !== 0 && <span className="numcores">{nftData.numCores}</span>}
                  </div>
                </div>
              </div>
              <div className="nft-card-info-container">
                <div className="flex items-center justify-around ship-info">
                  <div className="flex flex-col justify-center text-center">
                    <h5>{shipClass}</h5>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div style={{ fontSize: '12px', marginTop: '3px' }}>
                      <div>
                        Level:&nbsp;&nbsp;{currentLevel} / {maxLevel}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex px-1 py-2 mt-1 goldman-font ship-attributes" style={{ borderColor: borderColor }}>
                  <div className="w-1/2 pl-1 pr-2.5">
                    <ShipAttribute
                      title="Speed"
                      value={nftData.stats[STAT_TYPES.SPEED]}
                      range={SHIP_TYPE_RANGE[nftData.shipType].Speed}
                    />
                    <ShipAttribute
                      title="Attack"
                      value={nftData.stats[STAT_TYPES.ATTACK]}
                      range={SHIP_TYPE_RANGE[nftData.shipType].Attack}
                    />
                    <ShipAttribute
                      title="Sp. Attack"
                      value={nftData.stats[STAT_TYPES.SPECIAL_ATTACK]}
                      range={SHIP_TYPE_RANGE[nftData.shipType].SpecialAttack}
                    />
                    <ShipAttribute
                      title="Mining"
                      value={nftData.stats[STAT_TYPES.MINING]}
                      range={SHIP_TYPE_RANGE[nftData.shipType].Mining}
                    />
                  </div>
                  <div className="w-1/2 pr-1 pl-2.5">
                    <ShipAttribute
                      title="Luck"
                      value={nftData.stats[STAT_TYPES.LUCK]}
                      range={SHIP_TYPE_RANGE[nftData.shipType].Luck}
                    />
                    <ShipAttribute
                      title="Shields"
                      value={nftData.stats[STAT_TYPES.SHIELDS]}
                      range={SHIP_TYPE_RANGE[nftData.shipType].Shields}
                    />
                    <ShipAttribute
                      title="Sp. Defense"
                      value={nftData.stats[STAT_TYPES.SPECIAL_DEFENSE]}
                      range={SHIP_TYPE_RANGE[nftData.shipType].SpecialDefense}
                    />
                    <ShipAttribute
                      title="Max Health"
                      value={nftData.stats[STAT_TYPES.MAX_HEALTH]}
                      range={SHIP_TYPE_RANGE[nftData.shipType].Health}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </StyledCard>
      <ShipReviewModal
        show={open}
        nftData={nftData}
        onClose={() => {
          setOpen(false)
        }}
      />
    </>
  )
}

export default ShipCard
