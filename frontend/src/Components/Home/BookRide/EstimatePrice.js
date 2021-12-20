import { useEffect } from "react";
import axios from "axios";

export default function EstimatePrice() {

    const APP_CODE_HERE = process.env.REACT_APP_HERE_API;

    const getEstimate = async () => {
        await axios.get('https://router.hereapi.com/v8/routes', {
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer ' + APP_CODE_HERE,
                    'withCredentials': true,
                    // 'mode': 'no-cors',
                },
                'params': {
                    'apiKey': APP_CODE_HERE,
                    'origin': '19.188169982132184,72.94374226308034',
                    'destination': '19.187228824224597,72.94566732213572',
                    'transportMode': 'car',
                    'return': 'summary',
                }
            })
            .then((data) => {
                console.log("data:", data)
                // let temp = []
                // let t = data.data.items
                // t.forEach(x => {
                //     temp.push({
                //         position: x.position,
                //         title: x.title,
                //         address: x.address.label,
                //     })
                // });
                // setResults(temp)
                // console.log("results:", results);
            });
    }

    useEffect(() => getEstimate(), [1])

    return <>
        <h3>Estimation</h3>
        <div className="estimations flex flex-column flex-md-row">
            <div className="p-2 my-2 my-md-0 mx-md-1">Arriving In:<br/><b>9:00</b></div>
            <div className="p-2 my-2 my-md-0 mx-md-1">Journey Duration:<br/><b>9:00</b></div>
            <div className="p-2 my-2 my-md-0 mx-md-1">Total Distance:<br/><b>9m</b></div>
        </div>
    </>
}