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
            console.log(layers);

            const mapObj = new H.Map(
                mapRef.current,
                layers.raster.satellite.map, {
                    pixelRatio: window.devicePixelRatio,
                    center: {lat: 19.07316,lng: 72.89973},
                    zoom: 17,
                },
            );

            var marker = new H.map.Marker({lat: 19.07316,lng: 72.89973});
            window.addEventListener('resize', () => {
                mapObj.getViewPort().resize();
                console.log("map resize")
            });

            marker.draggable = true;
            mapObj.addObject(marker);

            // disable the default draggability of the underlying map
            // and calculate the offset between mouse and target's position
            // when starting to drag a marker object:
            mapObj.addEventListener('dragstart', function(ev) {
                var target = ev.target,
                    pointer = ev.currentPointer;
                if (target instanceof H.map.Marker) {
                var targetPosition = mapObj.geoToScreen(target.getGeometry());
                target['offset'] = new H.math.Point(pointer.viewportX - targetPosition.x, pointer.viewportY - targetPosition.y);
                behavior.disable();
                }
            }, false);


            // re-enable the default draggability of the underlying map
            // when dragging has completed
            mapObj.addEventListener('dragend', function(ev) {
                var target = ev.target;
                if (target instanceof H.map.Marker) {
                behavior.enable();
                }
            }, false);

            // Listen to the drag event and move the position of the marker
            // as necessary
            mapObj.addEventListener('drag', function(ev) {
                var target = ev.target,
                    pointer = ev.currentPointer;
                if (target instanceof H.map.Marker) {
                target.setGeometry(mapObj.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y));
                }
            }, false);

            var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(mapObj), {
                enabled: H.mapevents.Behavior.DRAGGING | H.mapevents.Behavior.DBLTAPZOOM
            });
            // Create the default UI components
            var ui = H.ui.UI.createDefault(mapObj, layers);
            // Add the marker to the map:
            mapObj.addObject(marker);
            setMap(mapObj);
        }
    },[1]);

    return (<div id="contact-page" className="yellow-bg p-2">
        <div className="container my-5">
            <h2>Get in Touch</h2>
            <h4>Tell us what you think</h4>

            <div className="container purple-bg p-3">
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