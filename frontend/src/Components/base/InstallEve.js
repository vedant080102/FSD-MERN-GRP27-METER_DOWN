import React, { useEffect, useState } from "react";
import MyModal from "./MyModal";

function InstallPWA() {
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState(null);
    const [statusMsg, setstatusMsg] = useState();
	const [modalShow, setModalShow] = useState(false);
    
    const handler = e => {
        e.preventDefault();
        console.log("we are being triggered :D");
        setSupportsPWA(true);
        setPromptInstall(e);
    };
    useEffect(() => {
        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("transitionend", handler);
    }, []);

    const onClick = evt => {
        evt.preventDefault();
        if (!promptInstall) {
            return;
        }
        promptInstall.prompt();
        promptInstall.userChoice
        .then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                setstatusMsg(<><h3>🎉 Thank You for installing our app 🎉</h3></>)
                setModalShow(true)
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            setPromptInstall(null);
            setSupportsPWA(false)
        });
    };

    useEffect(()=> {
        if ('getInstalledRelatedApps' in window.navigator) {
            const relatedApps = navigator.getInstalledRelatedApps();
            console.log("hi", relatedApps)
            // relatedApps.forEach((app) => {
            //   //if your PWA exists in the array it is installed
            //   console.log(app.platform, app.url);
            // });
        }
        else console.log("fuck's sake")
    },[])

    if (!supportsPWA) {
        

        console.log("pwa not supported!")
        return (<span className="text-danger">App is already installed or cannot be installed on your device</span>)
    }
    return (
        <>
            <button className="btn yellow-btn" id="setup_button"
            aria-label="Install app" title="Install app"
            onClick={onClick}>
                Install App <i className="fas fa-download"></i>
            </button>
            <MyModal
				show={modalShow}
				onHide={() => setModalShow(false)}
				msg={statusMsg}
			/>
        </>
    );
};

export default InstallPWA;