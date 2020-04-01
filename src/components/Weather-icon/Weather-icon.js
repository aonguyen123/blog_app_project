import React from 'react';
import * as condition from '../../constants/weather-condition';

export default function WeatherIcon({ icon, size }) {
    const defaultSize = !size ? '1rem' : size;

    const renderIcon = () => {
        if (icon === condition.CLEAR_DAY) {
            return <i className="wi wi-day-sunny" />;
        } else if (icon === condition.CLEAR_NIGHT) {
            return <i className="wi wi-night-clear" />;
        } else if (icon === condition.RAIN) {
            return <i className="wi wi-rain" />;
        } else if (icon === condition.SNOW) {
            return <i className="wi wi-snow" />;
        } else if (icon === condition.SLEET) {
            return <i className="wi wi-sleet" />;
        } else if (icon === condition.WIND) {
            return <i className="wi wi-windy" />;
        } else if (icon === condition.FOG) {
            return <i className="wi wi-fog" />;
        } else if (icon === condition.CLOUDY) {
            return <i className="wi wi-cloudy" />;
        } else if (icon === condition.PARTLY_CLOUDY_DAY) {
            return <i className="wi wi-day-cloudy" />;
        } else if (icon === condition.PARTLY_CLOUDY_NIGHT) {
            return <i className="wi wi-night-alt-cloudy" />;
        } else {
            return null;
        }
    };

    return <span style={{ fontSize: defaultSize }}>{renderIcon()}</span>;
}
