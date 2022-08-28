import './App.css'
import React, { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import markersService from './services/markersdata.js'
import Markers from './components/Markers'
import ThemeToggle from './components/ThemeToggle'
import Controls from './components/Controls'

const mapCenter = [37.992277870495116, -1.1305234429857096]

const darkTiles = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
const lightTiles = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [tiles, setTiles] = useState(lightTiles)

  const [isSelected, setSelected] = useState({
    tram: false,
    crosswalk: false,
    bike: false
  })

  const [markers, setMarkers] = useState({
    tram: {
      positions: [],
    },
    crosswalk: {
      positions: [],
    },
    bike: {
      positions: [],
      bikeAmounts: 0
    }
  })

  const tilesRef = useRef()
  const mapRef = useRef()

  // Fetch para obtener los datos de los marcadores
  // useEffect(() => {
  //   fetch('/data/markersData.json')
  //     .then(res => res.json())
  //     .then(data => {
  //       setPositionData(data)
  //     })
  // }, [isSelected])

  useEffect(() => {
    if (tilesRef.current) {
      tilesRef.current.setUrl(tiles === lightTiles ? darkTiles : lightTiles)
    }
    if (darkMode) setTiles(darkTiles)
    else setTiles(lightTiles)
  }, [darkMode])

  useEffect(() => {
    const allMarkers = markersService.getAllData()

    setMarkers({
      tram: {
        ...markers.tram,
        positions: allMarkers.tram,
      },
      crosswalk: {
        ...markers.crosswalk,
        positions: allMarkers.crosswalk,
      },
      bike: {
        ...markers.bike,
        positions: allMarkers.bike.positions,
        bikeAmounts: allMarkers.bike.bikeAmounts
      }
    })
  }, [isSelected])

  const handleThemeChange = () => {
    const legend = document.querySelector('.legend')
    const popupBg = document.querySelector('.leaflet-popup-content-wrapper')
    const popupTxt = document.querySelector('.leaflet-popup-tip')

    if (!darkMode) {
      legend.classList.add('black-details')
      popupBg?.classList.add('dark-popup')
      popupTxt?.classList.add('dark-popup')
    }
    else {
      legend.classList.remove('black-details')
      popupBg?.classList.remove('dark-popup')
      popupTxt?.classList.remove('dark-popup')
    }
    setDarkMode(!darkMode)
  }

  const handleMarkerClick = () => {
    const popupBg = document.querySelector('.leaflet-popup-content-wrapper')
    const popupTxt = document.querySelector('.leaflet-popup-tip')
    if (darkMode) {
      popupBg?.classList.add('dark-popup')
      popupTxt?.classList.add('dark-popup')
    }
    else {
      popupBg?.classList.remove('dark-popup')
      popupTxt?.classList.remove('dark-popup')
    }
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setSelected({
      ...isSelected,
      [name]: checked
    })
  }

  return (
    <div className="main">
      <MapContainer 
        center={mapCenter} 
        zoom={17} 
        scrollWheelZoom={true}
        doubleClickZoom={false}
        ref={mapRef}>
        <TileLayer
          ref={tilesRef}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={lightTiles}
        />
        <Markers
          isSelected={isSelected}
          markers={markers}
          handleMarkerClick={handleMarkerClick}
        />
      </MapContainer>
      <ThemeToggle darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Controls isSelected={isSelected} handleCheckboxChange={handleCheckboxChange} />
    </div>
  )
}

export default App;
