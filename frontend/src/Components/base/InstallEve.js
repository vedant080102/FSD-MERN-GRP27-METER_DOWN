import React, {
    useEffect,
    useState
} from "react";


function InstallPWA() {
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState(null);

    useEffect(() => {
        const handler = e => {
            e.preventDefault();
            console.log("we are being triggered :D");
            setSupportsPWA(true);
            setPromptInstall(e);
        };
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
        console.log("pwa not supported!")
        return null;
    }
    return (
        <button className="btn yellow-btn" id="setup_button"
        aria-label="Install app" title="Install app"
        onClick={onClick}>
            Install App <i class="fas fa-download"></i>
        </button>
    );
};

export default InstallPWA;