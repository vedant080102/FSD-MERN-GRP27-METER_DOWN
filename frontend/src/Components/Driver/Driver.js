import './Driver.css'
import { useRef, useEffect } from 'react';
import { Parallax, Background } from 'react-parallax';
import lottie from "lottie-web/build/player/lottie_light";
import bgimg from '../../Media/MUMBAITAXI-driver-pg.jpg'

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
    var animation;
    
    const animate = () => {
        console.log("lottie animation")
        formAnimationRef.current.innerHTML = '';
        animation = lottie.loadAnimation({
            container: formAnimationRef.current,
            name: 'form-svg',
            path: 'https://assets5.lottiefiles.com/packages/lf20_c6mni0d8.json',
            renderer: 'svg',
            loop: false,
            autoplay: false,
        })
        animation.pause('form-svg')
    }
    
    useEffect(()=> animate(), [1])
    
    const scrollHandler = () => {
        if(window.pageYOffset + window.innerHeight >= formAnimationRef.current.offsetTop) {
            animation.play('form-svg')
        }
    }
    
    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, [])

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
                <button className={"accordion-button rounded-top " + (n == 1 ? "": "collapsed")} type="button" data-bs-toggle="collapse" data-bs-target={"#panelsStayOpen-collapse" + n} aria-expanded={n == 1 ? "true" : 'false'} aria-controls={"panelsStayOpen-collapse" + n}>
                    {doc.title}
                </button>
                </h2>
                <div id={"panelsStayOpen-collapse" + n} className={"accordion-collapse collapse " + (n == 1 ? "show" : '')} aria-labelledby={"panelsStayOpen-heading" + n}>
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

            <div className="container min-vh-100 my-5 rounded py-2 py-md-5 px-md-5" style={{backgroundColor: 'var(--purple)'}}>
                <h3 className="fw-bold mt-3 mb-5 text-white">Here’s what you need to drive for <span style={{fontFamily: 'var(--brandFont)'}}>METER DOWN</span></h3> 
                <div className="row bg-white rounded py-3">
                    <div className="col-12">
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

                <div className="my-3">
                    <div style={{height:'500px', backgroundColor: 'white'}}></div>
                </div>
            </div>
        </div>
    )
}

export default Driver;