import axios from 'axios'

function About() {

    const APP_CODE_HERE = process.env.REACT_APP_HERE_API;

    const getMapImage = () => {
        axios.get('https://image.maps.ls.hereapi.com/mia/1.6/mapview', {
            'params': {
                'bbox':'19.59474673734081,73.54693936040252,19.003719546254896,72.819095147094',
                'apiKey': APP_CODE_HERE
            }
        }).then((res)=> {
            console.log('data:', res);
        })
    }
    return (
        <h1>About</h1>
    );
}

export default About;