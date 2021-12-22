import { useRef, useState, useEffect } from "react";

function ImageComp(props) {
    const driverImgRef = useRef();
    const [blockDimension, setblockDimension] = useState({height: 0, width: 0})

    const sizeHandler = () => {
        if (driverImgRef) {
            setblockDimension({
                height: driverImgRef.current.clientHeight,
                width: driverImgRef.current.clientWidth
            })
            // console.log("if")
            // console.log("height:", driverImgRef.current.clientHeight, driverImgRef.current.clientWidth)
        }
        // console.log("every")
    }

    useEffect(()=> sizeHandler(),[1])

    useEffect(()=> {
        window.addEventListener('resize', sizeHandler);
        return () => window.removeEventListener('resize', sizeHandler);
    },[])

    useEffect(()=> {
        window.addEventListener('load', sizeHandler);
        return () => window.removeEventListener('load', sizeHandler);
    },[])

    // useEffect(()=> {console.log("dimensions changed", blockDimension)},[driverImgRef.current])

    return (
        <div className="position-relative pe-3 pb-3">
            <img className='driver-illustr img-fluid shadow img-no-drag' ref={driverImgRef} src={props.img} alt='Driver-img' draggable="false" dragstart="false;"/>
            <div className="position-absolute shadow" style={{
                height:`${blockDimension.height}px`,
                width:`${blockDimension.width}px`,
            }}></div>
        </div>
    )
}

export default ImageComp;