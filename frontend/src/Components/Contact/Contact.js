import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import './contact.css'

function Contact() {

    const H = window.H;
    const [map, setMap] = useState(null);
    const mapRef = useRef();

    useEffect(() => {
        if (!map) {
            const platform = new H.service.Platform({
                apikey: process.env.REACT_APP_HERE_API
            });
            const layers = platform.createDefaultLayers();
            // console.log(layers);

            const mapObj = new H.Map(
                mapRef.current,
                layers.raster.satellite.map, {
                    pixelRatio: window.devicePixelRatio,
                    center: {lat: 19.07316,lng: 72.89973},
                    zoom: 17,
                },
            );

            var marker = new H.map.Marker({lat: 19.07316,lng: 72.89973});
            window.addEventListener('resize', () => mapObj.getViewPort().resize());

            marker.draggable = false;
            mapObj.addObject(marker);

            var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(mapObj), {
                enabled: H.mapevents.Behavior.DRAGGING | H.mapevents.Behavior.DBLTAPZOOM
            });
            // Create the default UI components
            var ui = H.ui.UI.createDefault(mapObj, layers);
            // Add the marker to the map:
            mapObj.addObject(marker);
            setMap(mapObj);
        }
        return () => map ? map.dispose() : null;
    },[]);

    return (<div id="contact-page" className="yellow-bg p-2">
        <div className="container my-5">
            <h2>Get in Touch</h2>
            <h4>Tell us what you think</h4>

            <div className="container purple-bg p-4 rounded">
                <div className="row">
                    <div className="col-12 col-md-8">
                        <div id="contact-map" ref={mapRef}/>
                    </div>
                    <div className="col-12 col-md-4 flex">KJ Somaiya College of Enginerring, <br/>Vidyanagar, Vidya Vihar East, <br/>Ghatkopar East, Mumbai, <br/>Maharashtra 400077</div>
                </div>
            </div>
        </div>
    </div>)

}

export default Contact;