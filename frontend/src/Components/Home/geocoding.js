import { useEffect, useRef, useState } from "react"
import axios from "axios";
import {Modal, Button} from 'react-bootstrap'
import './home.css'

function GetAddress(props) {

    const APP_CODE_HERE = 'luNgjJlD7MqWbotefxNRB2r0cWjz6AZm92SgSRa-rQg'
    const [results, setResults] = useState([])
    const [userChoice, setUserChoice] = useState({})
    const inputRef = useRef();

    useEffect(()=>{
        (props.locQuery.currLoc === undefined) ? console.log('') : inputRef.current.value = props.locQuery.currLoc.address;
        console.log("hi modal invoked!")
    }, [1])

    const getDetails = (query) => {
        axios.get('https://geocode.search.hereapi.com/v1/geocode',
        {'params': {
            // 'app_id': APP_ID_HERE,
            'apiKey': APP_CODE_HERE,
            'q': query,
            'lang': 'en',
            'in': 'countryCode:IND',
            'maxresults': 5,
            }})
            .then((data)=> {
                console.log("data:", data.data.items)
                let doc = {position: [], title: '', address: ''}
                let temp = []
                let t = data.data.items
                t.forEach(x => {
                    // doc.position = x.position;
                    // doc.title = x.title;
                    // doc.address = x.address.label;
                    
                    temp.push({
                        position: x.position,
                        title: x.title,
                        address: x.address.label,
                    })
                });
                setResults(temp)
                console.log("results:", results);
        });
    }
    
    const showLoc = (doc) => {
        setUserChoice(doc)
        inputRef.current.value = userChoice.title
    }

    const cards = (doc, i) => <div key={i} onClick={() => showLoc(doc)}>
        <h4>{doc.title}</h4>
        <p>{doc.address}</p>
        <hr/>
    </div>

    return <>
        {/* <div className="conatiner vh-100">
            <h1>HIYA</h1>
            <div className='p-2 bg-black text-white' style={{lineHeight: '1.5em'}}>
                Pickup: {userChoice != {} ? userChoice.address : ""}
            </div>
            <input type='text' placeholder='Search...' onChange={(e)=> {e ? getDetails(e.target.value) : console.log('')}}/>
            {results && results[0] ? results.map((data, i) => cards(data, i)) : "errorororororor"}
        </div>
         */}
        <Modal {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title className='text-center' id="contained-modal-title-vcenter">{props.locQuery.type}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex justify-content-center my-3">
                    {/* <div className='p-2 border' style={{lineHeight: '1.5em', width: '80%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                        Pickup: 
                        {userChoice.address != null ? userChoice.address : ""}
                    </div> */}
                    <div className="container flex flex-column">
                        <input className='location-input w-75' type='text' ref={inputRef} placeholder='Search...' onChange={(e)=> {e ? getDetails(e.target.value) : console.log('')}}/>
                        <div className="w-75 scrollable">
                            {results && results[0] ? results.map((data, i) => cards(data, i)) : <center className='my-3'>No Results Found!</center>}
                        </div>
                    </div>
                    <Button className='btn-success ms-2' onClick={()=> props.locQuery.setLoc(userChoice)}><i class="fas fa-check"></i></Button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    </>
}

export default GetAddress;