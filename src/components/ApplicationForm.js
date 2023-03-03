import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Navigate, useNavigate} from "react-router-dom";
import {useMemo, useState} from "react";
import { setApplication } from "../firebase"
import { serverTimestamp } from "firebase/firestore";
import {useMainContext} from "../contexts/MainContext";

const ApplicationForm = ({ option }) => {

    const { user, setDurum, setIsApplied, setOption, setCanReApply, isApplied, komiteler, formSorulari } = useMainContext()
    const navigate = useNavigate()
    const [komiteList, setKomiteList] = useState([])
    const [grade, setGrade] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const questionType = useMemo(() => {
        if(option === "Delege")
            return "delege"
        else if(option === "Gözlemci")
            return "gözlemci"
        else if(option === "Basın")
            return "basin"
        else if(option === "Komite Divanı")
            return "komitedivani"
    }, [option]);

    const logOut = () => {
        signOut(auth).then(() => {
            navigate("/")
        })
    }

    const handleFocus = (e) => {

        if(e.target.type !== "textarea"){
            e.target.previousSibling.style.marginLeft = "25px"
            e.target.previousSibling.style.transform = "scale(1.1)"
        }

    }
    const handleBlur = (e) => {
        e.target.previousSibling.style.marginLeft = "5px"
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
        console.log(grade)
        if(grade === "") {
            setLoading(false)
            return setError("Lütfen form bilgilerini doldurun.")
        }
        if(option === "Delege" && komiteList.length!==3) {
            setLoading(false)
            return setError("3 adet komite seçmelisiniz.")
        }
        setApplication(user, {...data, durum: null, odeme: false , komiteler: komiteList, date: serverTimestamp(), option: option, isApplied: true})
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
        <section className="basvuru-form-container">
            <form onSubmit={handleSubmit} className="basvuru-form">
                <h1>{option} başvuru formu</h1>
                <div className="button-container">
                    <button onClick={logOut} className="log-out button">Çıkış Yap</button>
                </div>
                <div className="questions">
                    {formSorulari[questionType].map(question => {
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
                        else if(question.name === "grade")
                            return (
                                <div className="question" key={question.name}>
                                    <label htmlFor={question.name}>{question.label}</label>
                                    <div onChange={(e) => setGrade(e.target.value)} className="checkboxes">
                                        <div className="checkbox-container">
                                            <div className="checkbox">
                                                <input type="radio" value="9" id="9" name="grade" />
                                                <label htmlFor="9">9</label>
                                            </div>
                                            <div className="checkbox">
                                                <input type="radio" value="10" id="10" name="grade" />
                                                <label htmlFor="10">10</label>
                                            </div>
                                        </div>
                                        <div className="checkbox-container">
                                            <div className="checkbox">
                                                <input type="radio" value="11" id="11" name="grade" />
                                                <label htmlFor="11">11</label>
                                            </div>
                                            <div className="checkbox">
                                                <input type="radio" value="12" id="12" name="grade" />
                                                <label htmlFor="12">12</label>
                                            </div>
                                        </div>
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
        </section>
    );
};

export default ApplicationForm;
