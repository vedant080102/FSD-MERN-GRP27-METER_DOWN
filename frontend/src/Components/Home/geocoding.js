import { useEffect, useRef, useState } from "react"
import axios from "axios";
import {Modal, Button} from 'react-bootstrap'
import './home.css'

function GetAddress(props) {

    const APP_CODE_HERE = process.env.REACT_APP_HERE_API;
    const [results, setResults] = useState([])
    const [userChoice, setUserChoice] = useState({})
    const inputRef = useRef();

    useEffect(()=>{
        (props.locQuery.currLoc === undefined || props.locQuery.currLoc.title === undefined) ? console.log() : inputRef.current.value = props.locQuery.currLoc.title;
        console.log("hi modal invoked!")
        setResults([])
    }, [props.show])

    const getDetails = (query) => {
        axios.get('https://geocode.search.hereapi.com/v1/geocode',
        {'params': {
            'apiKey': APP_CODE_HERE,
            'q': query,
            'lang': 'en',
            'in': 'countryCode:IND',
            'maxresults': 5,
            }})
            .then((data)=> {
                // console.log("data:", data.data.items)
                let temp = []
                let t = data.data.items
                t.forEach(x => {
                    temp.push({
                        position: x.position,
                        title: x.title,
                        address: x.address.label,
                    })
                });
                setResults(temp)
                // console.log("results:", results);
        });
    }
    
    const showLoc = (doc) => {
        setUserChoice(doc)
        
        // props.locQuery.setLoc(userChoice)
        // props.onHide()
    }
    useEffect(()=> {
        if (inputRef.current && userChoice) {
            inputRef.current.value = userChoice.title
        }
    }, [userChoice])

    const cards = (doc, i) => <div className='row m-0 pt-2 border-bottom location-results' role="button" key={i} onClick={() => showLoc(doc)}>
        <div className="col-1 mt-2 d-flex justify-content-center"><i className="fas fa-map-marker-alt"></i></div>
        <div className="col">
            <span style={{fontWeight: '700', fontSize: '1em'}}>{doc.title}</span>
            <p style={{fontSize: '0.8rem'}}>{doc.address}</p>
        </div>
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
                <Modal.Title id="contained-modal-title-vcenter">{props.locQuery.type}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex justify-content-center my-3">
                    <div className="container flex flex-column">
                        <div className="location-input input-group mb-3 w-75">
                            <span className="input-group-text border-end-0" id="basic-addon1"><i className="fas fa-search-location"></i></span>
                            <input type="text" className="form-control border-start-0" ref={inputRef} placeholder='Enter address...' onChange={(e)=> {e ? getDetails(e.target.value) : console.log('')}} aria-label="Location" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="w-75 scrollable border">
                            {results && results[0] ? results.map((data, i) => cards(data, i)) : <center className='my-3'>No Results Found!</center>}
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className='flex'>
                <Button className='btn-success ms-2' onClick={()=> {
                    props.locQuery.setLoc(userChoice)
                    props.onHide()
                }}>Confirm{" "}<i className="fas fa-check"></i></Button>
            </Modal.Footer>
        </Modal>
    </>
}

export default GetAddress;