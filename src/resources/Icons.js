import L from 'leaflet';

const iconSize = [30, 30]

const tramStationIcon = L.icon({
    iconUrl: '/icons/tram_station_icon.svg',
    iconRetinaUrl: '/icons/tram_station_icon.svg',
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: iconSize,
    className: 'tram-station-icon'
})

const tramIcon = new L.Icon({
    iconUrl: '/icons/tram_icon.svg',
    iconRetinaUrl: '/icons/tram_icon.svg',
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: iconSize,
    className: 'tram-icon'
})

const crosswalkIcon = new L.Icon({
    iconUrl: '/icons/walking_icon.svg',
    iconRetinaUrl: '/icons/walking_icon.svg',
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: iconSize,
    className: 'walking-icon'
})

const bikeIcon = new L.Icon({
    iconUrl: '/icons/bike_icon.svg',
    iconRetinaUrl: '/icons/bike_icon.svg',
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: iconSize,
    className: 'bike-icon'
})

const noBikesIcon = new L.Icon({
    iconUrl: '/icons/bike_icon.svg',
    iconRetinaUrl: '/icons/bike_icon.svg',
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: iconSize,
    className: 'bike-icon-nobikes'
})

export { tramStationIcon, tramIcon, crosswalkIcon, bikeIcon, noBikesIcon };