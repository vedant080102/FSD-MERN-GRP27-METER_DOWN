import HPlatform, { HMap, HMapPolygon } from "react-here-map";
import mapImg from '../../Media/region.png'

function About() {

    const polygonPoints = [52, 13, 100, 48, 2, 100, 48, 16, 100, 52, 13, 100];
//     [
// 19.59474673734081,73.54693936040252,100,
// 19.58957160917866,72.89599944133037,100,
// 18.982943159694592,73.53320645071744,100,
// // 19.003719546254896,72.819095147094100,
// 19.59474673734081,73.54693936040252,100
//     ];
    
    const polygonOptions = {
    style: {
        fillColor: "transparent",
        strokeColor: "#829",
        lineWidth: 3,
    },
    };

    return (
        <>
            <h1>About</h1>
            <HPlatform
                app_id={process.env.REACT_APP_HERE_APPID}
                // app_code="YOUR_APP_CODE"
                apikey={process.env.REACT_APP_HERE_API}
                useCIT
                useHTTPS
                includeUI
                includePlaces
            >
            <HMap
                style={{
                height: "400px",
                width: "800px",
                }}
                mapOptions={{ center: { lat: 52.5321472, lng: 13.3935785 } 
                    // { lat: 19.302092225282657, lng: 73.1926302905278 }
                 }}
            >
                <HMapPolygon
                points={polygonPoints}
                options={polygonOptions}
                setViewBounds="true"
                />
            </HMap>
            </HPlatform>;
            <img src={mapImg}/>
        </>
    );
}

export default About;