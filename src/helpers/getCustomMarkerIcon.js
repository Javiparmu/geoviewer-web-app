import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from "leaflet";

import TramIcon from '@mui/icons-material/Tram';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';

const iconSize = '50px'

export const getCustomMarkerIcon = ( iconName ) => {

    const iconMarkup = renderToStaticMarkup(
        iconName === 'tram' 
            ? <TramIcon className="tram-icon" /> 
            : iconName === 'bike' 
                ? <PedalBikeIcon className="bike-icon" /> 
                : iconName === 'crosswalk'
                    ? <DirectionsWalkIcon className="crosswalk-icon" />
                    : iconName === 'tram-station'
                        ? <TramIcon className="tram-station-icon" />
                        : <PedalBikeIcon className="bike-icon-nobikes" />
    )

    const customMarkerIcon = divIcon({
        html: iconMarkup,
    })

    return customMarkerIcon
}

