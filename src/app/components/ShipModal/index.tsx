'use client'
import React, { Suspense, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import cn from 'classnames'
import {
  Vector3,
  HemisphericLight,
  ArcRotateCamera,
  SceneLoader,
  StandardMaterial,
  Texture,
  Color4,
  GlowLayer,
  Color3,
} from '@babylonjs/core'
import SceneComponent from './SceneComponent'
import '@babylonjs/loaders/glTF'
import config from '@/config/index'
import { AiFillPlusCircle } from 'react-icons/ai'
import { AiFillMinusCircle } from 'react-icons/ai'
import { AiFillCloseCircle } from 'react-icons/ai'
import { detectBrowser } from '../../functions/deepspace'

const StyledCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  .body {
    justify-content: center;
    width: auto;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .browser-1 {
    background-image: url(${config.ASSETS_BASE_URI}app/modals/modal-6.png);
  }
  .browser-2 {
    background-image: url(../images/modal_1.png);
  }
  .body > .relative {
    border-radius: 32px;
    overflow: hidden;
  }

  .bridge-font-title {
    font-size: 15px;
  }

  .bridge-font {
    font-size: 16px;
  }
  canvas {
    outline: none !important;
  }
  /* .list-modal-body {
    width: 700 px;
    height: 440 px;
  } */
`

let camera: any
let rotation = 0.0

const onRender = (scene: any) => {
  if (camera !== undefined) {
    let deltaTimeInMillis = scene.getEngine().getDeltaTime()

    rotation += 0.5 * (deltaTimeInMillis / 1000)

    rotation = rotation % (2 * Math.PI)

    camera.alpha = rotation
  }
}

interface ShipReviewModalProps {
  show?: boolean
  nftData?: any
  onClose: () => void
}

export default function ShipReviewModal({ show, nftData, onClose }: ShipReviewModalProps) {
  const [isBrowser, setIsBrowser] = useState(false)
  const [subScale, setSubScale] = useState(1)
  const browserType = detectBrowser()
  useEffect(() => {
    setIsBrowser(true)
  }, [])
  const onSceneReady = (scene: any) => {
    scene.clearColor = new Color4(0, 0, 0, 0)
    const canvas = scene.getEngine().getRenderingCanvas()
    camera = new ArcRotateCamera('Camera', 200, -45, 2500, Vector3.Zero(), scene)
    let shipType = nftData.shipType
    let textureType = nftData.textureType
    let textureNum = nftData.textureNum

    let textureId
    let scale = -1
    if (shipType == 0) {
      scale = 50 * subScale
    } else if (shipType == 1) {
      scale = 20 * subScale
    } else if (shipType == 2) {
      scale = 100 * subScale
    } else if (shipType == 3) {
      scale = 15 * subScale
    }

    SceneLoader.LoadAssetContainer(
      `${config.ASSETS_BASE_URI}models/0/${nftData.shipType}/`,
      '0.gltf',
      scene,
      function (container) {
        var meshes = container.meshes
        var materials = container.materials

        let shipMesh = meshes[1]
        shipMesh.scaling = new Vector3(scale, scale, scale)
        var material = new StandardMaterial('shipTexture', scene)

        material.diffuseTexture = new Texture(
          `${config.ASSETS_BASE_URI}nfts/0/${shipType}/${textureType}/${textureNum}/10.png`,
          scene,
          false,
        )

        if (shipType != 0) {
          material.emissiveTexture = new Texture(
            `${config.ASSETS_BASE_URI}nfts/0/${shipType}/${textureType}/${textureNum}/12.png`,
            scene,
            false,
          )
          material.emissiveColor = new Color3(1, 1, 0.53)

          var gl = new GlowLayer('glow', scene)
          gl.blurKernelSize = 0
          gl.intensity = 0.5
        }

        material.reflectionTexture = new Texture(
          `${config.ASSETS_BASE_URI}nfts/0/${shipType}/${textureType}/${textureNum}/14.png`,
          scene,
          false,
        )
        material.reflectionTexture.level = 0.15

        material.bumpTexture = new Texture(
          `${config.ASSETS_BASE_URI}nfts/0/${shipType}/${textureType}/${textureNum}/15.png`,
          scene,
          false,
        )

        shipMesh.material = material
        container.addAllToScene()
      },
    )

    camera.setTarget(new Vector3(180, 0, -45))
    camera.attachControl(canvas, true)

    var light = new HemisphericLight('light', new Vector3(0.5, 0.5, 0.5), scene)
    light.intensity = 0.9

    return scene
  }
  const ZoomInShip = () => {
    let d = subScale
    setSubScale(Math.max(0.5, d - 0.3))
  }
  const ZoomOutShip = () => {
    let d = subScale
    setSubScale(Math.min(4, d + 0.3))
  }
  const modalContent = show ? (
    <StyledCard className="z-50 Modal">
      <div
        className={cn('sm:flex sm:flex-row body text-black items-center mx-2 p-5', {
          'browser-1': browserType !== 'Firefox',
          'browser-2': browserType === 'Firefox',
        })}
      >
        <div className="relative">
          <div className="absolute bottom-1 left-1">
            <AiFillPlusCircle onClick={ZoomOutShip} style={{ cursor: 'pointer', color: 'white', fontSize: '28px' }} />
            <AiFillMinusCircle
              onClick={ZoomInShip}
              className="mt-1"
              style={{ cursor: 'pointer', color: 'white', fontSize: '28px' }}
            />
          </div>
          <div className="absolute top-1 right-1">
            <AiFillCloseCircle
              onClick={(e) => onClose()}
              style={{ cursor: 'pointer', color: 'white', fontSize: '28px' }}
            />
          </div>

          <Suspense fallback={<h1>Loading...</h1>}>
            <SceneComponent
              antialias
              onSceneReady={onSceneReady}
              onRender={onRender}
              id="my-canvas"
              style={{ width: '100%' }}
            />
          </Suspense>
        </div>
      </div>
    </StyledCard>
  ) : null
  if (!isBrowser) {
    return null
  } else {
    const modalRoot = document.getElementById('modal-root')
    if (modalRoot) {
      return ReactDOM.createPortal(modalContent, modalRoot)
    } else {
      return null
    }
  }
}
