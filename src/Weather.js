import React from 'react'
import { useState, useEffect } from 'react'
import { Media, Spinner } from 'react-bootstrap'

const API_URL = 'http://api.openweathermap.org/data/2.5/weather?'
const ICON_URL = 'http://openweathermap.org/img/wn/'
const API_KEY = ''

export default function Weather({lat, lng}) {
    const [temp, setTemp] = useState(0)
    const [speed, setSpeed] = useState(0)
    const [direction, setDirection] = useState(0)
    const [description, setDescription] = useState('')
    const [icon, setIcon] = useState('')
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const url = API_URL +
        'lat=' + lat +
        '&lon=' + lng +
        '&units=metric' +
        '&appid=' + API_KEY;
    
        fetch(url)
        .then(res => res.json())
        .then (
            (result) => {
                if (result.main != undefined){
                    setTemp(result.main.temp);
                    setSpeed(result.wind.speed);
                    setDirection(result.wind.deg);
                    setDescription(result.weather[0].description);
                    setIcon(ICON_URL + result.weather[0].icon + '@2x.png');
                    setIsLoading(false);
                }
                else
                {
                    alert('Could not read weather information!')
                }
            }, (error) => {
                alert(error);
            }
        )
    }, [])

    if (isLoading) {
        return <p><Spinner animation="border" size="sm" /> Loading weather...</p>
    } else {
        return (
            <Media>
                <Media.Body>                    
                    <p>Temperature: {temp} &deg;C</p>
                    <p>Wind: {speed} m/s {direction} degrees</p>
                    <p>Description: {description}</p>
                </Media.Body>
                <img className="ml-3" src={icon} alt=""/>
            </Media>
        )
    }    
}
