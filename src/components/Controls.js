import React from 'react'
import TramIcon from '@mui/icons-material/Tram'
import PedalBikeIcon from '@mui/icons-material/PedalBike'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';

export default function Controls({ isSelected, handleCheckboxChange }) {
    return (
        <div className="controls">
            <ul className='legend'>
                <li>
                    <input
                        type='checkbox'
                        id='tram-input'
                        name='tram'
                        value={isSelected.tram}
                        onChange={handleCheckboxChange}
                    />
                    <TramIcon id='legend-icon' sx={{ color: '#f56a4d' }} />
                </li>
                <li>
                    <input
                        type='checkbox'
                        id='crosswalk-input'
                        name='crosswalk'
                        value={isSelected.crosswalk}
                        onChange={handleCheckboxChange} />
                    <DirectionsWalkIcon id='legend-icon' sx={{ color: '#8cbbf1' }} />
                </li>
                <li>
                    <input
                        type='checkbox'
                        id='bike-input'
                        name='bike'
                        value={isSelected.bike}
                        onChange={handleCheckboxChange} />
                    <PedalBikeIcon id='legend-icon' sx={{ color: '#f3954f' }} />
                </li>
            </ul>
        </div>
    )
}
