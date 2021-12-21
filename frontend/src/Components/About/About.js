import { useRef } from 'react';
import { useEffect } from 'react';
import mapImg from '../../Media/region.png'
import { RegionMap } from './RegionMap';

function About() {

    const mapRef = useRef();
    const polygonPoints = [52, 13, 100, 48, 2, 100, 48, 16, 100, 52, 13, 100];
    //     [
    // 19.59474673734081,73.54693936040252,100,
    // 19.58957160917866,72.89599944133037,100,
    // 18.982943159694592,73.53320645071744,100,
    // // 19.003719546254896,72.819095147094100,
    // 19.59474673734081,73.54693936040252,100
    //     ];

    // { lat: 19.302092225282657, lng: 73.1926302905278 }
    
    return (<>
        <h1>About</h1>
        {/* <img src = {mapImg}/> */}
        <div ref={mapRef}></div>
        <di className="w-75">
            <RegionMap/>
        </di>
    </>);
}

export default About;