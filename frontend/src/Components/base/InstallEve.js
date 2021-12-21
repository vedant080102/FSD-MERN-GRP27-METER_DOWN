import React, {
    useEffect,
    useState
} from "react";


function InstallPWA() {
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState(null);

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
    };
    if (!supportsPWA) {
        navigator.getInstalledRelatedApps()
        console.log("pwa not supported!")
        return (
            <button className="btn btn-outline-danger">
                <i className="fas fa-exclamation-triangle"></i> Cannot Install App
            </button>
        )
    }
    return (
        <button className="btn yellow-btn" id="setup_button"
        aria-label="Install app" title="Install app"
        onClick={onClick}>
            Install App <i className="fas fa-download"></i>
        </button>
    );
};

export default InstallPWA;