import { useState, useEffect } from "react";
import socket from './socket';
import './chat.css'


export default function RideChat() {
    const [name, setName] = useState(" ");
    const [acceptmsg, setAccept] = useState(" ");
    const [ride, setRide] = useState(" ");
    const [chat, setChat] = useState(" ");
    const [type, setType] = useState(" ");
    const [chatArray, setchatArray] = useState([])

    useEffect(() => {

        socket.io.on('reconnect', () => {
            socket.emit("join", {
                "user": name
            })
        })
        socket.on("msg", (data) => {
            console.log("yellow")
            console.log(data.msg)
        })
        socket.on("ride", (data) => {
            console.log("ride")
            console.log(data)
            setAccept(data)
        })
        socket.on("allotted", (data) => {
            console.log("allotted")
            console.log(data)
            setRide(data.fareid)
        })
        socket.on("chat", (message) => {
            setchatArray(prevState => [
                ...prevState,
                {
                    "message": message.chat,
                    "origin": 1,
                    "fare": message.room,
                    "sender": message.sender
                }
            ])
        })

    }, []);

    const storeChat = event => {
        setChat(event.target.value)
    }


    const handleInput = event => {
        setName(event.target.value);
    };

    const agree = () => {
        // alert("Clicked")
        console.log(name)
        socket.connect()
        socket.emit("join", {
            "user": name
        })
    }

    const sendMessage = () => {
        console.log(chat)
        setchatArray(prevState => [
            ...prevState,
            {
                "message": chat,
                "origin": 0,
                "fare": ride,
                "sender": name
            }
        ])
        socket.emit("chat", {
            chat,
            room: ride,
            sender: name
        })
    }

    const acceptRide = () => {
        console.log(acceptmsg)
        socket.emit("accept", acceptmsg)
    }

    useEffect(() => console.log("chat array", chatArray), [chatArray]);

    return (
    <div id="ride-chat-box" className="p-3 yellow-bg">
        {/* <input onChange={handleInput} placeholder="Enter name"/>
        <button onClick={agree}>Button</button>
        <button onClick={acceptRide}>Accept Ride</button>
        
        <br/> <br/>
        
        <input onChange={storeChat} placeholder="Enter chat"/>
        <button onClick={sendMessage}>Send chat</button>
        
        <br/> <br/> */}
        
        <div className='container chatscreen py-2 border border-5 rounded'>
            <div className="chat-head flex">
                <h3 className='fw-bold text-center m-0 text-uppercase'>Ride</h3>
            </div>
            {/* <hr/> */}
            <div className='chatbody'> 
                {/* {chatArray.map((item,i)=><div className={"chatDiv "+ (item.origin===0 ? "selfMessage" : "otherMessage")} key={i}>
                    <div className="messageCard"text-break>
                    {item.message}
                    </div>
                </div>)}*/}

                <div className="chatDiv my-2 d-flex selfMessage">
                    <div className="messageCard shadow rounded-pill text-break">item.message lorem20</div>
                </div>
                <div className="chatDiv my-2 d-flex otherMessage">
                    <div className="messageCard shadow rounded-pill text-break">item.message</div>
                </div>
            </div>
            {/* <hr /> */}
            <div className="chat-send flex">
                <input className='form-control sendbox mx-3' type="text"/>
                <button className="btn yellow-btn mx-3"><i className="fas fa-paper-plane fs-3"></i></button>
            </div>
        </div>
    </div>
    );
}