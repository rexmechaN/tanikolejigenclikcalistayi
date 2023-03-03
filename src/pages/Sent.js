import { useMainContext } from "../contexts/MainContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import {useNavigate} from "react-router-dom";
import ApplicationForm from "../components/ApplicationForm";
import { useLayoutEffect } from "react";

const Sent = () => {

    const { durum, option, canReApply, setCanReApply } = useMainContext()
    const navigate = useNavigate()

    useLayoutEffect(() => {
        setCanReApply(false)
    }, [])

    const logOut = () => {
        signOut(auth)
            .then(() => {
                navigate("/")
            })
            .catch(e => console.log(e.message))
    }

    const reApply = () => {
        setCanReApply(true)
    }

    if(canReApply)
        return <ApplicationForm option="Delege" />

    return (
        <section className="sent-container">
            <div className="sent">
                {!durum &&
                    <>
                        <h1>{ option } başvurusu gönderildi!</h1>
                        <p>Başvurun ekibimize ulaştı. En kısa süre içerisinde değerlendirip sana dönüş yapacağız.</p>
                    </>
                }
                {durum === "kabul" &&
                    <>
                        <h1>{ option } başvurun onaylandı!</h1>
                        <p>Başvurunu onayladık. E-posta adresine gönderdiğimiz mail ile diğer ayrıntılara ulaşabilirsin.</p>
                    </>
                }
                {durum === "ret" &&
                    <>
                        <h1>{ option } başvurun reddedildi.</h1>
                        <p>Çeşitli sebeplerden dolayı başvurunu reddettik. {(option !== "Delege" && option !== "Komite Divanı") ? "Dilersen delege olarak tekrar başvurabilirsin." : "Başka konferanslarda görüşmek dileğiyle..."}</p>
                    </>
                }
                <div className="buttons">
                    <button onClick={logOut} className="button">Çıkış Yap</button>
                    {(option !== "Delege" && durum === "ret") && <button onClick={reApply} className="button">Tekrar başvur</button>}
                </div>
            </div>
        </section>
    );
};

export default Sent;
