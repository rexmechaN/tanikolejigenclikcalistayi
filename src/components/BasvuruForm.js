import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Navigate, useNavigate} from "react-router-dom";
import { useState } from "react";
import { setApplication } from "../firebase"
import { serverTimestamp } from "firebase/firestore";
import {useMainContext} from "../contexts/MainContext";
const BasvuruForm = ({ option }) => {

    const { user, setDurum, setIsApplied, setOption, setCanReApply, isApplied } = useMainContext()
    const navigate = useNavigate()
    const [komiteList, setKomiteList] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    let formQuestions;

    if(option === "Delege")
        formQuestions = "delege"
    else if(option === "Gözlemci")
        formQuestions = "gözlemci"
    else if(option === "Basın")
        formQuestions = "basin"
    else if(option === "Komite Başkan Vekili")
        formQuestions = "komitebaskanvekili"

    const questions = {
        delege: [
            {label: "İsim Soyisim", name: "name", type:"text"},
            {label: "Okul", name: "school", type:"text"},
            {label: "Sınıf", name: "grade", type:"text"},
            {label: "Telefon Numarası", name: "phone", type:"text"},
            {label: "3 adet komite seçiniz", name: "komiteler"},
            {label: "Tecrübeleriniz", name: "tecrube", type: "textarea"}
        ],
        gozlemci: [

        ],
        basin: [

        ],
        komitebaskanvekili: [

        ]
    }

    const komiteler = [
        "Sağlık",
        "Eğitim",
        "İnsan Hakları",
        "Ekonomi",
        "Çevre",
        "Göç"
    ]

    const logOut = () => {
        signOut(auth).then(() => {
            navigate("/")
        })
    }

    const handleFocus = (e) => {
        e.target.previousSibling.style.marginLeft = "25px"
        e.target.previousSibling.style.transform = "scale(1.1)";
    }
    const handleBlur = (e) => {
        e.target.previousSibling.style.marginLeft = "15px"
        e.target.previousSibling.style.transform = "scale(1)";
    }

    const handleKomite = (e, komiteName) => {
        if(e.target.checked) {
            if(komiteList.length===3) {
                e.target.checked = false
                return
            }
            setKomiteList(prev => [...prev, komiteName])
        }
        else {
            setKomiteList(prev => prev.filter(name => name!== komiteName))
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        const formData = new FormData(e.target)
        const data = {}
        for(let [key, value] of formData.entries()) {
            if(value.trim()==="") {
                setLoading(false)
                return setError("Lütfen form bilgilerini doldurun.")
            }
            if(!komiteler.includes(key))
                data[key] = value
        }
        if(option === "Delege" && komiteList.length!==3) {
            setLoading(false)
            return setError("3 adet komite seçmelisiniz.")
        }
        setApplication(user, {...data, durum: null , komiteler: komiteList, date: serverTimestamp(), option: option, isApplied: true})
            .then(() => {
                setDurum(null)
                setLoading(false)
                setIsApplied(true)
                setCanReApply(false)
                setOption(option)
                navigate("/basvuru")
            })
            .catch((e) => {
                setError("Başvurunuz gönderilirken bir hata oluştu !")
                console.log(e)
                setLoading(false)
            })
    }

    if(isApplied) {
        return <Navigate to="/basvuru/" />
    }

    return (
        <div className="basvuru-form-container">
            <form onSubmit={handleSubmit} className="basvuru-form">
                <h1>{option} başvuru formu</h1>
                <div className="button-container">
                    <button onClick={logOut} className="log-out button">Çıkış Yap</button>
                </div>
                <div className="questions">
                    {questions[formQuestions].map(question => {
                        if(question.name === "komiteler")
                            return (
                                <div className="question" key={question.name}>
                                    <label htmlFor={question.name}>{question.label}</label>
                                    <div className="komite-secenekler">
                                        {komiteler.map(komite => (
                                            <div key={komite} className="komite-secenek">
                                                <input onClick={(e) => handleKomite(e, komite)} type="checkbox" id={komite} />
                                                <label htmlFor={komite}>{komite}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        else
                            return (
                                <div className="question" key={question.name}>
                                    <label htmlFor={question.name}>{question.label}</label>
                                    {question.type === "text" &&
                                        <input onBlur={handleBlur} onFocus={handleFocus} type="text" name={question.name} id={question.name} />
                                    }
                                    {question.type === "textarea" &&
                                        <textarea onBlur={handleBlur} onFocus={handleFocus} name={question.name} id={question.name}></textarea>
                                    }
                                </div>
                            )
                    })}
                </div>
                {error && <p className="alert alert-danger">{error}</p>}
                <div className="button-container submit">
                    <button disabled={loading} className="submit-button button">Gönder</button>
                </div>
            </form>
        </div>
    );
};

export default BasvuruForm;
