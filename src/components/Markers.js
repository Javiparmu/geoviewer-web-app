import React, { useEffect, useState } from 'react'
import { Marker, Popup, useMap } from 'react-leaflet'
import { tramStations } from '../assets/tramStations'
import { muybicis } from '../assets/muybicis.js'
import { getCustomMarkerIcon } from '../helpers/getCustomMarkerIcon'

export default function Markers({ isSelected, markers, handleMarkerClick }) {
    const [userLocation, setUserLocation] = useState(null)
    const [placedMarkerPosition, setPlacedMarkerPosition] = useState(null)
    const [closestStation, setClosestStation] = useState(null)

    const map = useMap()

    useEffect(() => {
        map.locate().on("locationfound", function (e) {
            setUserLocation(e.latlng);
        })
        map.on('dblclick', function (e) {
            setPlacedMarkerPosition(e.latlng)
        })
    }, [map])

    useEffect(() => {
        if (placedMarkerPosition) {
            const station = getClosestStation(placedMarkerPosition)
            setClosestStation(station)
        }
    }, [placedMarkerPosition])

    const getClosestStation = (placedMarkerPosition) => {
        let shortestDistance = 9999999
        let closestStation = null
        tramStations.forEach(station => {
            const distance = placedMarkerPosition.distanceTo(station.position)
            if (distance < shortestDistance) {
                shortestDistance = distance
                closestStation = station
            }
        })
        return closestStation
    }

    return (
        <div>
            {
                userLocation &&
                <Marker position={userLocation} >
                    <Popup>
                        <span>Tu posición.</span>
                    </Popup>
                </Marker>
            }
            {
                placedMarkerPosition && closestStation &&
                <Marker position={placedMarkerPosition} eventHandlers={{
                    click: () => {
                        handleMarkerClick()
                    }
                }} >
                    <Popup>
                        Distancia a tu posición: {
                            userLocation.distanceTo(placedMarkerPosition).toFixed(2) <= 1000
                                ? userLocation.distanceTo(placedMarkerPosition).toFixed(2) + ' metros'
                                : (userLocation.distanceTo(placedMarkerPosition) / 1000).toFixed(2) + ' km'
                        }
                        <br />
                        Estación más cercana: {closestStation.name} a {
                            closestStation.position.distanceTo(placedMarkerPosition) <= 1000
                                ? closestStation.position.distanceTo(placedMarkerPosition).toFixed(2) + ' metros'
                                : (closestStation.position.distanceTo(placedMarkerPosition) / 1000).toFixed(2) + ' km'
                        }
                    </Popup>
                </Marker>
            }
            {
                tramStations.map((station, index) => {
                    return (
                        <Marker key={index} position={station.position} icon={getCustomMarkerIcon('tram-station')}>
                            <Popup>
                                <span>Estación: {station.name}</span>
                            </Popup>
                        </Marker>
                    )
                })
            }
            {
                isSelected.tram &&
                markers.tram.positions.map((position, index) => (
                    <Marker
                        key={'t' + index}
                        position={position}
                        icon={getCustomMarkerIcon('tram')}
                    >
                        <Popup key={'tp' + index} >
                            Tranvía.
                            <br />
                            Distancia a tu posición: {
                                userLocation.distanceTo(position).toFixed(2) <= 1000
                                    ? userLocation.distanceTo(position).toFixed(2) + ' metros'
                                    : (userLocation.distanceTo(position) / 1000).toFixed(2) + ' km'
                            }
                        </Popup>
                    </Marker>
                ))
            }
            {
                isSelected.crosswalk &&
                markers.crosswalk.positions.map((position, index) => (
                    <Marker
                        key={'c' + index}
                        position={position}
                        icon={getCustomMarkerIcon('crosswalk')}
                    >
                        <Popup key={'cp' + index}>
                            Paso de peatones.
                            <br />
                            Distancia a tu posición: {
                                userLocation.distanceTo(position).toFixed(2) <= 1000
                                    ? userLocation.distanceTo(position).toFixed(2) + ' metros'
                                    : (userLocation.distanceTo(position) / 1000).toFixed(2) + ' km'
                            }
                        </Popup>
                    </Marker>
                ))
            }
            {
                isSelected.bike &&
                muybicis.map((bike, index) => (
                    <Marker
                        key={'b' + index}
                        position={bike.position}
                        icon={bike.bikeAmount !== 0 ? getCustomMarkerIcon('bike') : getCustomMarkerIcon('nobikes')}
                    >
                        <Popup key={'bp' + index}>
                            <span style={{ fontSize: 16, fontWeight: 'bold' }}>{bike.name}</span>
                            <br />
                            {bike.bikeAmount === 1 ? 'Queda 1 bicicleta' : `Quedan ${bike.bikeAmount} bicicletas`}
                            <br />
                            Distancia a tu posición: {
                                userLocation.distanceTo(bike.position).toFixed(2) <= 1000
                                    ? userLocation.distanceTo(bike.position).toFixed(2) + ' metros'
                                    : (userLocation.distanceTo(bike.position) / 1000).toFixed(2) + ' km'
                            }
                        </Popup>
                    </Marker>
                ))
            }
        </div>
    )
}
