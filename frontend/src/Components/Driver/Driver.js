import './Driver.css'
import { useRef, useEffect } from 'react';
import { Parallax, Background } from 'react-parallax';
import lottie from "lottie-web/build/player/lottie_light";
import bgimg from '../../Media/MUMBAITAXI-driver-pg.jpg'
import sparkle from '../../Media/purple-sprinkle.svg'
import driverImg from '../../Media/MUMBAITAXI-driver-2.jpg'
import driverImg1 from '../../Media/rickDriver1.jpg'
import driverImg2 from '../../Media/rickDriver2.jpg'
import { useState } from 'react';
import ImageComp from './ImageComp';
import { Link } from 'react-router-dom';

function Driver() {
    const requirments = [{
        title: 'Requirements',
        points: [
            `Meet the minimum age to drive in your city`,
            `Have at least one year of driving experience`,
            `Clear a background check`,
    ]},{
        title: 'Documents',
        points: [
            `Valid driver's license`,
            `Proof of residency in your city, state, or province`,
            `Insurance if you plan to drive your own car`,
    ]},{
        title: 'Signup',
        points: [
            `Submit documents and photo`,
            `Provide information for a background check`,
            `Find out if your car is eligible, or get a car`,
    ]}];

    const documents = [{
        title: 'Owner Documents',
        docs: [`PAN Card`, `Cancelled Cheque or Passbook`, `Aadhaar Card`, `Address Proof`, `Car Documents`,]
    }, {
        title: 'Vehicle RC',
        docs: [`Vehicle Permit`, `Vehicle Insurance`, `Driver Documents`]
    }, {
        title: 'Driving License',
        docs: [`Aadhaar Card`, `Address Proof`]
    }]

    var t = []
    const formAnimationRef = useRef();
    const formAnimationRef2 = useRef();
    var animation;
    var animation2;
    
    const animate = () => {
        // console.log("lottie animation")
        formAnimationRef.current.innerHTML = '';
        animation = lottie.loadAnimation({
            container: formAnimationRef.current,
            name: 'form-svg',
            path: 'https://assets5.lottiefiles.com/packages/lf20_c6mni0d8.json',
            renderer: 'svg',
            loop: true,
            autoplay: false,
        })
        // animation.pause('form-svg')
        animation.play('form-svg')

        formAnimationRef2.current.innerHTML = '';
        animation2 = lottie.loadAnimation({
            container: formAnimationRef2.current,
            name: 'form-svg2',
            path: 'https://assets2.lottiefiles.com/packages/lf20_fatyxr64.json',
            renderer: 'svg',
            loop: true,
            autoplay: false,
        })
        // animation.pause('form-svg')
        animation2.play('form-svg2')
    }
    
    useEffect(()=> animate(), [1])
    
    const printDetails = (doc) => {
        t = doc.points;
        return (
            <div>
                <h4 className="fw-bold">{doc.title}</h4>
                <ul>{t.map((x, i) => <li className="my-3" key={i}>{x}</li>)}</ul>
            </div>
        )
    }

    const docAccordion = (doc, n) => {
        var docs = doc.docs;
        return (
            <div className="accordion-item rounded">
                <h2 className="accordion-header" id={"panelsStayOpen-heading" + n}>
                <button className={"accordion-button rounded-top " + (n === 1 ? "": "collapsed")} type="button" data-bs-toggle="collapse" data-bs-target={"#panelsStayOpen-collapse" + n} aria-expanded={n === 1 ? "true" : 'false'} aria-controls={"panelsStayOpen-collapse" + n}>
                    {doc.title}
                </button>
                </h2>
                <div id={"panelsStayOpen-collapse" + n} className={"accordion-collapse collapse " + (n === 1 ? "show" : '')} aria-labelledby={"panelsStayOpen-heading" + n}>
                    <div className="accordion-body">
                        <ul>{docs.map((x,i) => <li key={i}>{x}</li>)}</ul>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div id='become-driver'  className='pb-2'>
            <Parallax strength={500} className='w-100' style={{height: '75vh'}}>
                <Background className="custom-bg">
                    <div style={{
                        height: '75vh',
                        width: '100vw',
                        backgroundImage: `linear-gradient(#2b0a2ca6, #2b0a2ca6), url(${bgimg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}/>
                </Background>
                <div className='flex w-100 text-white' style={{height: '75vh'}}>
                    <h1 className='fw-bold'>Work as a driver</h1>
                </div>
            </Parallax>
            <div className="custom-shape-divider-top-1636559095">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z" className="shape-fill"></path>
                </svg>
            </div>

            <div className="container purple-bg my-5 rounded py-3 py-sm-5 px-sm-5">
                <h3 className="fw-bold mt-3 mb-5 text-white">Here’s what you need to drive for <span style={{fontFamily: 'var(--brandFont)'}}>METER DOWN</span></h3> 
                <div className="bg-white rounded py-3 mb-3">
                    <div className="w-100">
                        <ul className="nav nav-pills flex mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-requirements-tab" data-bs-toggle="pill" data-bs-target="#pills-requirements" type="button" role="tab" aria-controls="pills-requirements" aria-selected="true">Requirements</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-documents-tab" data-bs-toggle="pill" data-bs-target="#pills-documents" type="button" role="tab" aria-controls="pills-documents" aria-selected="false">Documents</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-signup-tab" data-bs-toggle="pill" data-bs-target="#pills-signup" type="button" role="tab" aria-controls="pills-signup" aria-selected="false">Signup</button>
                            </li>
                        </ul> 
                    </div>
                    <div className="row mx-0 flex-md-row flex-column-reverse">
                        <div className="col-12 col-md-5">
                            <div className="flex">
                                <div ref={formAnimationRef}></div>
                            </div>
                        </div>
                        <div className="col-12 col-md-7">
                            <div className="container-fluid text-start py-3">
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-requirements" role="tabpanel" aria-labelledby="pills-home-tab">
                                        {printDetails(requirments[0])}
                                    </div>
                                    <div className="tab-pane fade" id="pills-documents" role="tabpanel" aria-labelledby="pills-profile-tab">
                                        <h4 className="fw-bold">{requirments[1].title}</h4>
                                        <p className="text-muted">More documents may be required based on your city</p>
                                        <div className="accordion" id="accordionPanelsStayOpenExample">
                                            {docAccordion(documents[0], 1)}
                                            {docAccordion(documents[1], 2)}
                                            {docAccordion(documents[2], 3)}
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-signup" role="tabpanel" aria-labelledby="pills-contact-tab">
                                        {printDetails(requirments[2])}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-100"><hr className='w-75'/></div>
                <div className='container yellow-bg rounded my-3 py-4 px-md-4'>
                    <h3 className='fw-bold'>Drive to fulfil your dreams</h3>
                    <div className="row mx-0 mt-5 py-2 rounded bg-white shadow">
                        <div className="col-12 col-md-4 p-4">
                            <ImageComp img={driverImg1}/>
                        </div>
                        <div className="col-12 col-md-4 p-4">
                            <ImageComp img={driverImg}/>
                        </div>
                        <div className="col-12 col-md-4 p-4">
                            <ImageComp img={driverImg2}/>
                        </div>
                        {/* <div className="col-12 flex"><hr className='w-75'/></div> */}
                    </div>
                </div>
                <div className="flex w-100"><hr className='w-75'/></div>
                <div className="mt-3 py-4 rounded bg-white col-12 flex flex-column text-start">
                    <div className="row w-100">
                        <div className="col-12 col-md-6 flex">
                            <ul className='instruction-list'>
                                <div className='h5'>Enter your details and register yourself</div>
                                <div className='h5'>Submit your documents</div>
                                <div className='h5'>Our team will contact you in the next 24 hours</div>
                                <div className='h5'>Faster document verification</div>
                                <div className='h5'>Download the app and start driving</div>
                            </ul>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="flex">
                                <div className='shadow' ref={formAnimationRef2}></div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="w-100 flex"><hr className='w-75'/></div> */}
                    <Link className='mt-3 btn purple-btn' to={'/driverInfo'}>Fill your application now!</Link>
                </div>

            </div>
            {/* <div className="vw-100 my-3 py-2 p-sm-4" style={{backgroundColor: 'var(--purple)'}}>
                <div className='container rounded my-5 py-4 px-md-4'style={{backgroundColor: 'var(--yellow)'}}>
                    <h3 className='fw-bold'>Drive to fulfil your dreams</h3>
                    <div className="row mx-0 mt-5 py-2 rounded bg-white">
                        <div className="col-12 col-md-4 p-4">
                            <ImageComp img={driverImg1}/>
                        </div>
                        <div className="col-12 col-md-4 p-4">
                            <ImageComp img={driverImg}/>
                        </div>
                        <div className="col-12 col-md-4 p-4">
                            <ImageComp img={driverImg2}/>
                        </div>
                        <div className="col-12 flex"><hr className='w-75'/></div>
                    </div>
                    <div className="mt-3 py-4 rounded bg-white col-12 flex flex-column text-start " style={{backgroundColor: 'var(--purple)'}}>
                        <ul className='instruction-list'>
                            <li>Enter your details and register yourself</li>
                            <li>Submit your documents</li>
                            <li>Our team will contact you in the next 24 hours</li>
                            <li>Faster document verification</li>
                            <li>Download the app and start driving</li>
                        </ul>
                        <div className="w-100 flex"><hr className='w-75'/></div>
                        <a className='mt-3 btn purple-btn'>Fill your application now!</a>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default Driver;