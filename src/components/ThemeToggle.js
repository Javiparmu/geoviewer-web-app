import React from 'react'

export default function ThemeToggle({ darkMode, handleThemeChange }) {
    return (
        <div className="theme-toggle">
            <input type="checkbox" className="checkbox" id="checkbox" value={darkMode} onChange={handleThemeChange} />
            <label htmlFor="checkbox" className="label">
                <i className="fas fa-moon"></i>
                <i className='fas fa-sun'></i>
                <div className='ball' />
            </label>
        </div>
    )
}
