import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";
import {useMainContext} from "../contexts/MainContext";
import Loading from "../components/Loading";
import Sent from "./Sent";
import {useNavigate} from "react-router-dom";
import { Popup } from "reactjs-popup";

const Application = () => {

    const { authLoading, isApplied, secenekler } = useMainContext()
    const navigate = useNavigate()

    const scroll = (direction) => {
        const ele = document.querySelector(".basvuru-secenekler")
        const secenek = document.querySelector(".basvuru-secenek")
        const width = secenek.offsetWidth
        if(direction==="left") {
            ele.scrollLeft -= width + 100;
        }
        else if(direction==="right") {
            ele.scrollLeft += width + 100;
        }
    }

    if(authLoading)
        return (
            <Loading height={"80vh"} />
        )

    if(isApplied)
        return (
            <Sent />
        )


    return (
        <section className="basvuru">
            <h1>Başvuru Seçenekleri</h1>
            <div className="basvuru-container">
                <AiOutlineArrowLeft onClick={() => scroll("left")} size={40} className="left-arrow arrow" />
                <div className="basvuru-secenekler">
                    {secenekler.map(secenek => (
                        <div className={`basvuru-secenek basvuru-secenek-${secenek.disabled ? "disabled" : ""}`} key={secenek.name}>
                            <div className="img" style={{background: `url(${require(`../images/${secenek.oName}.webp`)}) center center/cover`}}></div>
                            <div className="basvuru-secenek-content">
                                <h2 className="basvuru-secenek-name">{secenek.name}</h2>
                                <p className="basvuru-secenek-desc">{secenek.description}</p>
                                <Popup
                                    trigger={<button className="basvuru-secenek-popup">Görevi nedir?</button>}
                                    modal
                                    closeOnDocumentClick={true}
                                >
                                    <div className="modal">
                                        {secenek.description}
                                    </div>
                                </Popup>
                                <button disabled={secenek.disabled} onClick={() => navigate(`/basvuru/${secenek.oName}`)} className="button">{secenek.disabled ? "Yakında" : "Devam et"}</button>
                            </div>
                        </div>
                    ))}
                </div>
                <AiOutlineArrowRight onClick={() => scroll("right")} className="right-arrow arrow" size={40} />
            </div>
        </section>
    );
};

export default Application;
