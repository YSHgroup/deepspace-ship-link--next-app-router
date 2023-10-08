'use client'
import { fetchImageData } from '@/hooks/fetchImageData'
import styled from 'styled-components'
import ShipCard from 'src/app/components/ShipCard'
import { useEffect, useState } from 'react'

const PageStyle = styled.div`
  width 100%;
  min-height: 100vh;
`
export default function Page({ params }: { params: { shipId: number } }) {
  const [ship, setShip] = useState<any>()
  const [shipType, setShipType] = useState<any>()
  const [isLoading, setLoading] = useState(true)
  const [imgURL, setImgUrl] = useState('')
  const image = fetchImageData(params.shipId)
  useEffect(() => {
    if (image) {
      setShip(image.data[0])
      setShipType(image.shipType)
      setLoading(image.isLoading)
      setImgUrl(image.imageUrl)
    }
  }, [image])

  return (
    <PageStyle className="w-full h-full">
      {isLoading ? (
        <div className="w-full h-full text-center text-white pt-80">
          <div className="loading" />
          Loading...
        </div>
      ) : (
        <ShipCard
          cardType={shipType}
          nftData={shipType === 'inventory' ? ship?.ship : ship?.listing.token}
          price={ship?.listing?.price ?? '0'}
          nftFullData={shipType === 'inventory' ? ship['ship'] : ship['listing']}
          imgURL={imgURL}
        />
      )}
      <div id="modal-root"></div>
    </PageStyle>
  )
}
