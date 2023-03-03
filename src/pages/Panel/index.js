import PanelNavbar from "./PanelNavbar";
import { useRef, useState} from "react";
import PanelContent from "./PanelContent";
import {useMainContext} from "../../contexts/MainContext";
import {Navigate} from "react-router-dom";

const Panel = () => {

    const [active, setActive] = useState(null);
    const { admin } = useMainContext()

    const secenekler = [
        {name: "Komite Divanı", array: useRef([])},
        {name: "Delege", array: useRef([])},
        {name: "Basın", array: useRef([])},
        {name: "Gözlemci", array: useRef([])}
    ]

    if(!admin)
        return <Navigate to="/basvuru/delege" />

    return (
        <div className="panel">
            <PanelNavbar active={active} setActive={setActive} secenekler={secenekler} />
            <PanelContent secenekler={secenekler} active={active} />
        </div>
    );
};

export default Panel;
